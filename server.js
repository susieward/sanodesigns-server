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
mongodb.MongoClient.connect(process.env.MONGODB_URI, 
	{ useNewUrlParser: true }, function (err, client) {
  if (err) { 
    console.log(err);
    process.exit(1);
  }

  var allbeads = [

{

  stone: 'Smokey Quartz',
  size: 18,
  cut: 'faceted',
  color: 'gray/clear',
  price: 1.00,
  shape: 'oval',
  image: '/static/photos/20180708_164320.png',
  _id: 'a01'




},

{

  stone: 'Smokey Quartz',
  size: 4,
  cut: 'smooth',
  color: 'gray/clear',
  price: 0.30,
  shape: 'teardrop',
  image: '/static/photos/20180708_164525.png',
  _id: 'a02'




},

{

  stone: 'Smokey Quartz',
  size: 10,
  cut: 'smooth',
  color: 'gray/clear',
  price: 0.35,
  shape: 'tube',
  image: '/static/photos/20180708_164816.png',
  _id: 'a03'




},

{

  stone: 'Blue Sandstone',
  size: 4,
  cut: 'smooth',
  color: 'blue',
  price: 0.15,
  shape: 'cube',
  image: '/static/photos/20180708_165551.png',
  _id: 'a04'




},

{

  stone: 'Blue Sandstone',
  size: 7,
  cut: 'smooth',
  color: 'blue',
  price: 0.40,
  shape: 'round',
  image: '/static/photos/20180708_165624.png',
  _id: 'a05'




},

{

  stone: 'Blue Sandstone',
  size: 17,
  cut: 'smooth',
  color: 'blue',
  price: 0.75,
  shape: 'block',
  image: '/static/photos/20180708_165855.png',
  _id: 'a06'




},

{

  stone: 'Obsidian',
  size: 13,
  cut: 'smooth',
  color: 'black',
  price: 0.50,
  shape: 'tube',
  image: '/static/photos/20180708_170214.png',
  _id: 'a07'

},

{

  stone: 'Obsidian',
  size: 20,
  cut: 'smooth',
  color: 'black',
  price: 3.00,
  shape: 'drop',
  image: '/static/photos/20180708_170446.png',
  _id: 'a08'

},

{

  stone: 'Obsidian',
  size: 10,
  cut: 'smooth',
  color: 'black',
  price: 0.35,
  shape: 'barrel',
  image: '/static/photos/20180708_170753.png',
  _id: 'a09'

},

{

  stone: 'Obsidian',
  size: 3,
  cut: 'smooth',
  color: 'black',
  price: 0.05,
  shape: 'chips',
  image: '/static/photos/20180708_171254.png',
  _id: 'a10'

},

{

  stone: 'Snowflake Obsidian',
  size: 8,
  cut: 'smooth',
  color: 'black/gray',
  price: 0.50,
  shape: 'round',
  image: '/static/photos/20180708_171647.png',
  _id: 'a11'

},

{

  stone: 'Snowflake Obsidian',
  size: 7,
  cut: 'smooth',
  color: 'black/gray',
  price: 0.50,
  shape: 'tube',
  image: '/static/photos/20180708_171825.png',
  _id: 'a12'

},

{

  stone: 'Snowflake Obsidian',
  size: 20,
  cut: 'smooth',
  color: 'black/gray',
  price: 0.75,
  shape: 'block',
  image: '/static/photos/20180708_172023.png',
  _id: 'a13'

},

{

  stone: 'Hematite',
  size: 4,
  cut: 'smooth',
  color: 'silver',
  price: 0.20,
  shape: 'cube',
  image: '/static/photos/20180708_172235.png',
  _id: 'a14'

},

{

  stone: 'Hematite',
  size: 5,
  cut: 'smooth',
  color: 'silver',
  price: 0.20,
  shape: 'round',
  image: '/static/photos/20180708_172558.png',
  _id: 'a15'

},

{

  stone: 'Hematite',
  size: 40,
  cut: 'smooth',
  color: 'silver',
  price: 3.00,
  shape: 'donut',
  image: '/static/photos/20180709_114309.png',
  _id: 'a16'

},


{

  stone: 'Opalite',
  size: 20,
  cut: 'smooth',
  color: 'clear',
  price: 5.00,
  shape: 'heart',
  image: '/static/photos/20180708_174019.png',
  _id: 'a17'

},


{

  stone: 'Opalite',
  size: 10,
  cut: 'smooth',
  color: 'clear',
  price: 0.70,
  shape: 'round',
  image: '/static/photos/20180708_174157.png',
  _id: 'a18'

},


{

  stone: 'Opalite',
  size: 7,
  cut: 'smooth',
  color: 'clear',
  price: 0.45,
  shape: 'round',
  image: '/static/photos/20180708_174407.png',
  _id: 'a19'

},

{

  stone: 'Opalite',
  size: 4,
  cut: 'faceted',
  color: 'clear',
  price: 0.60,
  shape: 'flat teardrop',
  image: '/static/photos/20180708_174735.png',
  _id: 'a20'

},

{

  stone: 'Opalite',
  size: 3,
  cut: 'faceted',
  color: 'clear',
  price: 0.50,
  shape: 'teardrop',
  image: '/static/photos/20180708_174956.png',
  _id: 'a21'

},

{

  stone: 'Opalite',
  size: 2,
  cut: 'faceted',
  color: 'clear',
  price: 0.30,
  shape: 'rondelle',
  image: '/static/photos/20180708_175148.png',
  _id: 'a22'

},

{

  stone: 'White Moonstone',
  size: 8,
  cut: 'smooth',
  color: 'white/clear',
  price: 0.40,
  shape: 'tube',
  image: '/static/photos/20180708_175617.png',
  _id: 'a23'

},

{

  stone: 'Rainbow Moonstone',
  size: 12,
  cut: 'smooth',
  color: 'white/clear',
  price: 0.80,
  shape: 'teardrop',
  image: '/static/photos/20180708_180002.png',
  _id: 'a24'

},

{

  stone: 'Rainbow Moonstone',
  size: 2,
  cut: 'faceted',
  color: 'white/clear',
  price: 0.10,
  shape: 'rondelle',
  image: '/static/photos/20180709_114423.png',
  _id: 'a25'

},

{

  stone: 'Rainbow Moonstone',
  size: 10,
  cut: 'faceted',
  color: 'white/clear',
  price: 0.60,
  shape: 'oval',
  image: '/static/photos/20180709_114704.png',
  _id: 'a26'

},

{

  stone: 'Malachite-Pyrite Mix',
  size: 10,
  cut: 'smooth',
  color: 'green/silver/gold',
  price: 1.00,
  shape: 'round',
  image: '/static/photos/20180709_115202.png',
  _id: 'a27'

},

{

  stone: 'Sunstone',
  size: 6,
  cut: 'smooth',
  color: 'pink',
  price: 0.15,
  shape: 'round',
  image: '/static/photos/20180709_115441.png',
  _id: 'a28'

},

{

  stone: 'Sunstone',
  size: 8,
  cut: 'smooth',
  color: 'pink',
  price: 0.35,
  shape: 'round',
  image: '/static/photos/20180709_115559.png',
  _id: 'a29'

},

{

  stone: 'Sunstone',
  size: 4,
  cut: 'smooth',
  color: 'pink',
  price: 0.20,
  shape: 'slab',
  image: '/static/photos/20180709_120038.png',
  _id: 'a30'

},

{

  stone: 'Sunstone',
  size: 12,
  cut: 'smooth',
  color: 'pink',
  price: 0.25,
  shape: 'oval',
  image: '/static/photos/20180709_120942.png',
  _id: 'a31'

},

{

  stone: 'Pyrite',
  size: 10,
  cut: 'smooth',
  color: 'gold/silver',
  price: 0.40,
  shape: 'chunk',
  image: '/static/photos/20180709_121518.png',
  _id: 'a32'

},

{

  stone: 'Pyrite',
  size: 30,
  cut: 'smooth',
  color: 'gold/silver',
  price: 1.15,
  shape: 'flat oval',
  image: '/static/photos/20180709_121646.png',
  _id: 'a33'

},

{

  stone: 'Carnelian',
  size: 12,
  cut: 'smooth',
  color: 'red/orange',
  price: 0.50,
  shape: 'square chunk',
  image: '/static/photos/20180709_122159.png',
  _id: 'a34'

},

{

  stone: 'Carnelian',
  size: 9,
  cut: 'smooth',
  color: 'red/orange/clear',
  price: 0.45,
  shape: 'round',
  image: '/static/photos/20180709_122351.png',
  _id: 'a35'

},

{

  stone: 'Carnelian',
  size: 10,
  cut: 'smooth',
  color: 'orange/red/clear',
  price: 0.50,
  shape: 'round',
  image: '/static/photos/20180709_123105.png',
  _id: 'a36'

},

{

  stone: 'Carnelian',
  size: 12,
  cut: 'smooth',
  color: 'red/orange/clear',
  price: 0.75,
  shape: 'round',
  image: '/static/photos/20180709_123404.png',
  _id: 'a37'

},

{

  stone: 'Carnelian',
  size: 5,
  cut: 'smooth',
  color: 'red/orange/clear',
  price: 0.15,
  shape: 'round',
  image: '/static/photos/20180709_123543.png',
  _id: 'a38'

},

{

  stone: 'Carnelian',
  size: 12,
  cut: 'faceted',
  color: 'red/orange/clear',
  price: 0.70,
  shape: 'round',
  image: '/static/photos/20180709_123843.png',
  _id: 'a39'

},

{

  stone: 'Carnelian',
  size: 7,
  cut: 'smooth',
  color: 'red/orange/clear',
  price: 0.50,
  shape: 'drop',
  image: '/static/photos/20180709_124047.png',
  _id: 'a40'

},

{

  stone: 'Carnelian',
  size: 4,
  cut: 'smooth',
  color: 'red/orange/clear',
  price: 0.15,
  shape: 'rondelle',
  image: '/static/photos/20180709_124253.png',
  _id: 'a41'

},

{

  stone: 'Red Aventurine',
  size: 5,
  cut: 'smooth',
  color: 'red/orange',
  price: 0.20,
  shape: 'rondelle',
  image: '/static/photos/20180709_124558.png',
  _id: 'a42'

},

{

  stone: 'Red Aventurine',
  size: 10,
  cut: 'smooth',
  color: 'red/orange',
  price: 0.35,
  shape: 'rectangle tube',
  image: '/static/photos/20180709_124758.png',
  _id: 'a43'

},

{

  stone: 'Red Aventurine',
  size: 5,
  cut: 'smooth',
  color: 'red/orange',
  price: 0.50,
  shape: 'slab',
  image: '/static/photos/20180709_124957.png',
  _id: 'a44'

},

{

  stone: 'Red Aventurine',
  size: 15,
  cut: 'faceted',
  color: 'red/orange',
  price: 0.75,
  shape: 'barrel',
  image: '/static/photos/20180709_125651.png',
  _id: 'a45'
},

{

  stone: 'Red Aventurine',
  size: 5,
  cut: 'smooth',
  color: 'red/orange',
  price: 0.20,
  shape: 'round',
  image: '/static/photos/20180709_125814.png',
  _id: 'a46'

},

{

  stone: 'Sodalite',
  size: 4,
  cut: 'smooth',
  color: 'blue/white',
  price: 0.20,
  shape: 'cube',
  image: '/static/photos/20180709_130045.png',
  _id: 'a47'

},

{

  stone: 'Sodalite',
  size: 30,
  cut: 'smooth',
  color: 'blue/white',
  price: 0.95,
  shape: 'flat oval',
  image: '/static/photos/20180709_130434.png',
  _id: 'a48'

},

{

  stone: 'Sodalite',
  size: 6,
  cut: 'smooth',
  color: 'blue/white',
  price: 0.35,
  shape: 'round',
  image: '/static/photos/20180709_130634.png',
  _id: 'a49'

},

{

  stone: 'Sodalite',
  size: 10,
  cut: 'smooth',
  color: 'blue/white',
  price: 0.55,
  shape: 'round',
  image: '/static/photos/20180709_130744.png',
  _id: 'a50'

},

{

  stone: 'Amazonite',
  size: 20,
  cut: 'smooth',
  color: 'green/blue/white',
  price: 0.70,
  shape: 'flat square',
  image: '/static/photos/20180709_203458.png',
  _id: 'a51'

},
{

  stone: 'Amazonite',
  size: 20,
  cut: 'smooth',
  color: 'green/blue/white',
  price: 0.60,
  shape: 'flat rectangle',
  image: '/static/photos/20180709_203654.png',
  _id: 'a52'

},
{

  stone: 'Amazonite',
  size: 14,
  cut: 'carved',
  color: 'green/blue/white',
  price: 1.15,
  shape: 'flower',
  image: '/static/photos/20180709_203913.png',
  _id: 'a53'

},
{

  stone: 'Amazonite',
  size: 8,
  cut: 'smooth',
  color: 'green/blue/white',
  price: 0.35,
  shape: 'round',
  image: '/static/photos/20180709_204109.png',
  _id: 'a54'

},
{

  stone: 'Amazonite',
  size: 10,
  cut: 'smooth',
  color: 'green/blue/white',
  price: 0.45,
  shape: 'round',
  image: '/static/photos/20180709_204253.png',
  _id: 'a55'

},
{

  stone: 'Goldstone',
  size: 4,
  cut: 'smooth',
  color: 'orange/brown',
  price: 0.30,
  shape: 'slab',
  image: '/static/photos/20180709_204810.png',
  _id: 'a56'

},
{

  stone: 'Goldstone',
  size: 15,
  cut: 'smooth',
  color: 'orange/brown',
  price: 2.50,
  shape: 'teardrop pendant',
  image: '/static/photos/20180709_205146.png',
  _id: 'a57'

},
{

  stone: 'Goldstone',
  size: 7,
  cut: 'smooth',
  color: 'orange/brown',
  price: 0.25,
  shape: 'round',
  image: '/static/photos/20180709_205536.png',
  _id: 'a58'

},
{

  stone: 'Goldstone',
  size: 5,
  cut: 'smooth',
  color: 'orange/brown',
  price: 0.15,
  shape: 'round',
  image: '/static/photos/20180709_205634.png',
  _id: 'a59'

},
{

  stone: 'Unakite',
  size: 10,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.45,
  shape: 'flat sphere',
  image: '/static/photos/20180709_205930.png',
  _id: 'a60'

},
{

  stone: 'Unakite',
  size: 6,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.55,
  shape: 'rectangular slab',
  image: '/static/photos/20180709_210137.png',
  _id: 'a61'

},
{

  stone: 'Unakite',
  size: 10,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.35,
  shape: 'rectangular tube',
  image: '/static/photos/20180709_210352.png',
  _id: 'a62'

},

{

  stone: 'Unakite',
  size: 12,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.60,
  shape: 'oval',
  image: '/static/photos/20180709_210553.png',
  _id: 'a63'

},

{

  stone: 'Unakite',
  size: 6,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.30,
  shape: 'round',
  image: '/static/photos/20180709_210729.png',
  _id: 'a64'

},

{

  stone: 'Unakite',
  size: 8,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.40,
  shape: 'round',
  image: '/static/photos/20180709_210841.png',
  _id: 'a65'

},

{

  stone: 'Unakite',
  size: 12,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.70,
  shape: 'round',
  image: '/static/photos/20180709_211016.png',
  _id: 'a66'

},

{

  stone: 'Unakite',
  size: 3,
  cut: 'smooth',
  color: 'green/pink',
  price: 0.10,
  shape: 'rondelle',
  image: '/static/photos/20180709_211134.png',
  _id: 'a67'

},

{

  stone: 'Black Agate',
  size: 5,
  cut: 'smooth',
  color: 'black',
  price: 0.85,
  shape: 'rectangular slab',
  image: '/static/photos/20180709_211547.png',
  _id: 'a68'

},

{

  stone: 'Green Kyanite',
  size: 4,
  cut: 'natural',
  color: 'green',
  price: 0.75,
  shape: 'natural slab',
  image: '/static/photos/20180709_211810.png',
  _id: 'a69'

},

{

  stone: 'Garnet',
  size: 5,
  cut: 'smooth',
  color: 'red/purple',
  price: 0.40,
  shape: 'flatdrop',
  image: '/static/photos/20180709_212158.png',
  _id: 'a70'

},

{

  stone: 'Garnet',
  size: 3,
  cut: 'smooth',
  color: 'red/purple',
  price: 0.35,
  shape: 'flat rectangle',
  image: '/static/photos/20180709_212502.png',
  _id: 'a71'

},

{

  stone: 'Garnet',
  size: 6,
  cut: 'smooth',
  color: 'red/purple',
  price: 0.40,
  shape: 'flat diamonds',
  image: '/static/photos/20180709_212744.png',
  _id: 'a72'

},

{

  stone: 'Clear Quartz',
  size: 8,
  cut: 'smooth',
  color: 'clear',
  price: 0.35,
  shape: 'triangle',
  image: '/static/photos/20180709_212913.png',
  _id: 'a73'

},

{

  stone: 'Agate',
  size: 16,
  cut: 'smooth',
  color: 'gray/white/brown',
  price: 0.70,
  shape: 'oval pebble',
  image: '/static/photos/20180709_213400.png',
  _id: 'a74'

}
];


db.collection(BEADS_COLLECTION).insertMany(allbeads, function(err, res) {
	 if (err) throw err;

	  console.log(res.insertedCount+' documents inserted');
    


});

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


