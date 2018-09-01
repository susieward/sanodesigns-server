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

var Datastore = require('nedb');
var db = {};
var catalog = new Datastore({ filename: 'catalog.db', autoload: true });

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', router);

router.use('/photos', express.static(__dirname + '/photos'));



router.get('/beads', (req, res) => {
catalog.find({}).exec(function(err, beads) {
    if (err) res.send(err);

res.status(200).json(beads);
});
});


router.post('/beads', (req, res) => {
 
 let name = req.body.stone;
 let number = Date.now() + Math.random().toString().slice(18);

let _id = name + number;

let bead = {

	_id: _id,
	stone: req.body.stone,
	size: req.body.size,
	cut: req.body.cut,
	color: req.body.color,
	price: req.body.price,
	shape: req.body.shape

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





app.listen(port, function(){
  console.log('Server listening on port ' + port)
});