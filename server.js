require('dotenv').config();
const express = require('express');
      bodyParser = require('body-parser');
       app = express();
      cors = require('cors');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var router = express.Router();

var jwt = require('jsonwebtoken');
var fs = require('file-system');

const nodemailer = require('nodemailer');
var inlineBase64 = require('nodemailer-plugin-inline-base64');

var Datastore = require('nedb');
var db = {};
var catalog = new Datastore({ filename: 'catalog.db', autoload: true });
db.users = new Datastore({ filename: 'users.db', autoload: true });

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', router);

router.use('/photos', express.static(__dirname + '/photos'));

const users = [
  {

    username: 'eleader',
    password: 'admin'

  }
];

router.get('/users', (req, res) => {
db.users.find({}).exec(function(err, users) {
    if (err) res.send(err);

res.status(200).json(users);
});
});

router.post('/login', (req, res) => {

    var message;

    var username = req.body.username;
    var password = req.body.password;

    var user = users.filter((user)=> user.username==username)[0];

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


router.get('/beads', (req, res) => {
catalog.find({}).exec(function(err, beads) {
    if (err) res.send(err);

res.status(200).json(beads);
});
});


router.post('/beads', (req, res) => {
 
 let name = req.body.stone;
 let number = Date.now() + Math.random().toString().slice(18);

let _id = number;

let bead = {

	_id: _id,
	stone: req.body.stone,
	size: req.body.size,
	cut: req.body.cut,
	color: req.body.color,
	price: req.body.price,
	shape: req.body.shape,
	image: req.body.image

}

catalog.insert(bead, function(err, bead) {
	res.json(bead);
});
});


router.get('/beads/:id', (req, res) => {

var beadId = req.params.id;

catalog.findOne({ _id: beadId }, function(err, beadItem) {
	res.json(beadItem);
})
})

router.put('/beads/:id', (req, res) => {

	var beadId = req.params.id;

	let bead = {
		image: req.body.image,
		_id: beadId,
		stone: req.body.stone,
		size: req.body.size,
		cut: req.body.cut,
		color: req.body.color,
		price: req.body.price,
		shape: req.body.shape
	}

	catalog.update({ _id: beadId }, bead, function(err, numReplaced) {
		if(err) res.send(err);

	res.status(200).json(bead);
	});
});

router.delete('/beads/:id', (req, res) => {

	var beadId = req.params.id;

	catalog.remove({ _id: beadId }, {}, function(err, numRemoved) {
		if(err) res.send(err);
		res.sendStatus(200);
	});
});


var stripe = require('stripe')('sk_test_hq3Adgmggr8oKt0wvuqZJL2b');

router.post('/charge', (req, res) => {

    var newCharge = {
        amount: req.body.stripeAmt,
        currency: 'usd',
        description: 'example',
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
        user: 'susannahirene@gmail.com',
        pass: 'nosepass43!!'
      }

  });

    transport.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));


  let mailOptions = {
    from: req.body.email,
    to: 'Susie Ward <susannahirene@gmail.com>',
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



app.listen(port, function(){
  console.log('Server listening on port ' + port)
});