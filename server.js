require('dotenv').config();
const express = require('express');
      bodyParser = require('body-parser');
       app = express();
      cors = require('cors');

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var BEADS_COLLECTION = 'beads';

var env = process.env.NODE_ENV;
var port = process.env.PORT || 3000;
var router = express.Router();

var jwt = require('jsonwebtoken');
var fs = require('file-system');

const nodemailer = require('nodemailer');
var inlineBase64 = require('nodemailer-plugin-inline-base64');


app.use(cors());
app.use(bodyParser.json({limit: '50mb'})); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

app.use('/', router);

router.use('/photos', express.static(__dirname + '/photos'));


var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://heroku_v1zt1043:sff1m77dj0jp12bin9pqaghmqc@ds263493.mlab.com:63493/heroku_v1zt1043', 
	{ useNewUrlParser: true }, function (err, client) {
  if (err) { 
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

app.listen(port, function(){
  console.log('Server listening on port ' + port)


});

});


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

const users = [
  {

    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD

  }

];




router.post('/login', (req, res) => {

    var message;

    var username = req.body.username;
    var password = req.body.password;

    var user = users.filter((user) => user.username == username)[0];

      if(!user){
     message = "Incorrect username or nonexistent user."

    } else if(user.password !== req.body.password){
      message = "Incorrect password."
     
    } else {
      var token = jwt.sign({ username: user.username, _id: user._id}, 'TESTSECRET');
      message = "Login successful."
     }

     if(token){
      res.status(200).json({ message, token})
     } else {

      res.status(401).json({ message });
     }

    });


router.get('/beads', function(req, res) {
  db.collection(BEADS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get beads.");
    } else {
      res.status(200).json(docs);
    }
  });
});


router.post('/beads', function(req, res) {
   let name = req.body.stone;
 let number = Date.now() + Math.random().toString().slice(18);

let id = 'b' + number;

let beadSize = Number(req.body.size);
let beadPrice = Number(req.body.price);


let bead = {

	_id: id,
	stone: req.body.stone,
	size: beadSize,
	cut: req.body.cut,
	color: req.body.color,
	price: beadPrice,
	shape: req.body.shape,
  image: req.body.image

}


    db.collection(BEADS_COLLECTION).insertOne(bead, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new bead.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  });




router.get('/beads/:id', function(req, res) {
  db.collection(BEADS_COLLECTION).findOne({ _id: req.params.id }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get bead");
    } else {
      res.status(200).json(doc);
    }
  });
});


router.put('/beads/:id', function(req, res) {

		var beadId = req.params.id;

  let beadSize = Number(req.body.size);
let beadPrice = Number(req.body.price);

	let bead = {
		$set: {
		image: req.body.image,
		_id: beadId,
		stone: req.body.stone,
		size: beadSize,
		cut: req.body.cut,
		color: req.body.color,
		price: beadPrice,
		shape: req.body.shape
	}
	}

  var updateDoc = req.body;

  db.collection(BEADS_COLLECTION).updateOne({_id: req.params.id }, bead, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update bead");
    } else {
      res.status(200).json(bead);
    }
  });
});



router.delete('/beads/:id', function(req, res) {
  db.collection(BEADS_COLLECTION).deleteOne({_id: req.params.id }, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete bead");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});


var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/charge', (req, res) => {

    var newCharge = {
        amount: req.body.stripeAmt,
        currency: 'usd',
        source: req.body.stripeToken,
         shipping: {
     		name: req.body.name.first + ' ' + req.body.name.last,
     		phone:  req.body.phone,
     		address: {
     			country: req.body.address.country,
       			line1: req.body.address.street,
       			line2: req.body.address.apt,
       			city: req.body.address.city,
       			state: req.body.address.state,
      			postal_code: req.body.address.zip
     
 			}
		},

		metadata: {
		    customer_email: req.body.stripeEmail,
				type: req.body.type,
                  length: req.body.length + ' ' + 'cm',
                  size: req.body.size,
                  material: req.body.material,
                  color: req.body.color,
                  clasp: req.body.clasp,
                  notes: req.body.notes,
                  beads: req.body.beads,
                  designImage: req.body.designImage

		}

       };
    
    stripe.charges.create(newCharge, function(err, charge) {

        if (err){
            console.error(err);
            res.json({ error: err, charge: false });
        } else {

            res.json({ error: false, charge: charge });
        }
    });
});

router.post('/send', (req, res) => {

    var amount = req.body.stripeAmt;
    var formattedAmt = amount.toFixed(2);

    var transport = nodemailer.createTransport({
      service: 'gmail',
       auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }

  });

    transport.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));


  let mailOptions = {
    from: req.body.email,
    to: 'Emily Leader <sanodesigns@gmail.com>',
    subject: 'New custom order (via Stripe)',
     html: `<p><strong>Customer name:</strong> ${req.body.name.first} ${req.body.name.last}<br>
     <strong>Email:</strong> ${req.body.email}<br>
     <strong>Address:</strong> ${req.body.address.street}<br>
     ${req.body.address.city} ${req.body.address.state} ${req.body.address.zip}<br>
     ${req.body.address.country}<br>
     <strong>Amount:</strong> $${formattedAmt}

     </p>

     <p><strong>Type:</strong> ${req.body.type}<br>
     <strong>Length:</strong> ${req.body.length} cm<br>
     <strong>Size, if bracelet:</strong> ${req.body.size}<br>
     <strong>Clasp:</strong> ${req.body.clasp}<br>
     <strong>Material:</strong> ${req.body.material}<br>
    <strong>Color:</strong> ${req.body.color}<br>
     <strong>Notes, if any:</strong> ${req.body.notes}</p>

     <p><strong>Beads:</strong> ${req.body.beads}</p>
      <p><strong>Design image:</strong> attached
      </p>'`,

      attachments: [
        {
          path: req.body.designImage
        }

      ]
      };



  transport.sendMail(mailOptions, function(error, info){

    if(error) {
      return console.log(error);
 }

      console.log('Message sent', info.messageId, info.response);
      res.json(info);

    
  });

});


