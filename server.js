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

const beads = [
{

	stone: 'Smokey Quartz',
	size: '18 mm',
	cut: 'faceted',
	color: 'gray/clear',
	price: '$1.00',
	shape: 'oval',
	image: 'http://localhost:3000/photos/20180708_164320.png',
	_id: 1




},

{

	stone: 'Smokey Quartz',
	size: '4 mm',
	cut: 'smooth',
	color: 'gray/clear',
	price: '$0.30',
	shape: 'teardrop',
	image: 'http://localhost:3000/photos/20180708_164525.png',
	_id: 2




},

{

	stone: 'Smokey Quartz',
	size: '10 mm',
	cut: 'smooth',
	color: 'gray/clear',
	price: '$0.35',
	shape: 'tube',
	image: 'http://localhost:3000/photos/20180708_164816.png',
	_id: 3




},

{

	stone: 'Blue Sandstone',
	size: '4 mm',
	cut: 'smooth',
	color: 'blue',
	price: '$0.15',
	shape: 'cube',
	image: 'http://localhost:3000/photos/20180708_165551.png',
	_id: 4




},

{

	stone: 'Blue Sandstone',
	size: '7 mm',
	cut: 'smooth',
	color: 'blue',
	price: '$0.40',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180708_165624.png',
	_id: 5




},

{

	stone: 'Blue Sandstone',
	size: '17 mm',
	cut: 'smooth',
	color: 'blue',
	price: '$0.75 per bead',
	shape: 'block',
	image: 'http://localhost:3000/photos/20180708_165855.png',
	_id: 6




},

{

	stone: 'Obsidian',
	size: '13 mm',
	cut: 'smooth',
	color: 'black',
	price: '$0.50 per bead',
	shape: 'tube',
	image: 'http://localhost:3000/photos/20180708_170214.png',
	_id: 7

},

{

	stone: 'Obsidian',
	size: '20 mm',
	cut: 'smooth',
	color: 'black',
	price: '$3 per pendant',
	shape: 'drop',
	image: 'http://localhost:3000/photos/20180708_170446.png',
	_id: 8

},

{

	stone: 'Obsidian',
	size: '10 mm',
	cut: 'smooth',
	color: 'black',
	price: '$0.35 per bead',
	shape: 'barrel',
	image: 'http://localhost:3000/photos/20180708_170753.png',
	_id: 9

},

{

	stone: 'Obsidian',
	size: '3 mm',
	cut: 'smooth',
	color: 'black',
	price: '$0.05 per bead',
	shape: 'chips',
	image: 'http://localhost:3000/photos/20180708_171254.png',
	_id: 10

},

{

	stone: 'Snowflake Obsidian',
	size: '8 mm',
	cut: 'smooth',
	color: 'black/gray',
	price: '$0.50 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180708_171647.jpg',
	_id: 11

},

{

	stone: 'Snowflake Obsidian',
	size: '7 mm',
	cut: 'smooth',
	color: 'black/gray',
	price: '$0.50 per bead',
	shape: 'tube',
	image: 'http://localhost:3000/photos/20180708_171825.jpg',
	_id: 12

},

{

	stone: 'Snowflake Obsidian',
	size: '20 mm',
	cut: 'smooth',
	color: 'black/gray',
	price: '$0.75 per bead',
	shape: 'block',
	image: 'http://localhost:3000/photos/20180708_172023.jpg',
	_id: 13

},

{

	stone: 'Hematite',
	size: '4 mm',
	cut: 'smooth',
	color: 'silver',
	price: '$0.20 per bead',
	shape: 'cube',
	image: 'http://localhost:3000/photos/20180708_172235.jpg',
	_id: 14

},

{

	stone: 'Hematite',
	size: '5 mm',
	cut: 'smooth',
	color: 'silver',
	price: '$0.20 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180708_172558.jpg',
	_id: 15

},

{

	stone: 'Hematite',
	size: '40 mm',
	cut: 'smooth',
	color: 'silver',
	price: '$3 per donut',
	shape: 'donut',
	image: 'http://localhost:3000/photos/20180709_114309.jpg',
	_id: 16

},


{

	stone: 'Opalite',
	size: '20 mm',
	cut: 'smooth',
	color: 'clear',
	price: '$5 per pendant',
	shape: 'heart',
	image: 'http://localhost:3000/photos/20180708_174019.jpg',
	_id: 17

},


{

	stone: 'Opalite',
	size: '10 mm',
	cut: 'smooth',
	color: 'clear',
	price: '$0.70 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180708_174157.jpg',
	_id: 18

},


{

	stone: 'Opalite',
	size: '7 mm',
	cut: 'smooth',
	color: 'clear',
	price: '$0.45 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180708_174407.jpg',
	_id: 19

},

{

	stone: 'Opalite',
	size: '4 mm',
	cut: 'faceted',
	color: 'clear',
	price: '$0.60',
	shape: 'flat teardrop',
	image: 'http://localhost:3000/photos/20180708_174735.jpg',
	_id: 20

},

{

	stone: 'Opalite',
	size: '3 mm',
	cut: 'faceted',
	color: 'clear',
	price: '$0.50',
	shape: 'teardrop',
	image: 'http://localhost:3000/photos/20180708_174956.jpg',
	_id: 21

},

{

	stone: 'Opalite',
	size: '2 mm',
	cut: 'faceted',
	color: 'clear',
	price: '$0.30',
	shape: 'rondelle',
	image: 'http://localhost:3000/photos/20180708_175148.jpg',
	_id: 22

},

{

	stone: 'White Moonstone',
	size: '8-10 mm',
	cut: 'smooth',
	color: 'white/clear',
	price: '$0.40 per bead',
	shape: 'tube',
	image: 'http://localhost:3000/photos/20180708_175617.jpg',
	_id: 23

},

{

	stone: 'Rainbow Moonstone',
	size: '12 mm',
	cut: 'smooth',
	color: 'white/clear',
	price: '$0.80 per bead',
	shape: 'teardrop',
	image: 'http://localhost:3000/photos/20180708_180002.jpg',
	_id: 24

},

{

	stone: 'Rainbow Moonstone',
	size: '2 mm',
	cut: 'faceted',
	color: 'white/clear',
	price: '$0.10 per bead',
	shape: 'rondelle',
	image: 'http://localhost:3000/photos/20180709_114423.jpg',
	_id: 25

},

{

	stone: 'Rainbow Moonstone',
	size: '10 mm',
	cut: 'faceted',
	color: 'white/clear',
	price: '$0.60',
	shape: 'oval',
	image: 'http://localhost:3000/photos/20180709_114704.jpg',
	_id: 26

},

{

	stone: 'Malachite-Pyrite Mix',
	size: '10 mm',
	cut: 'smooth',
	color: 'green/silver/gold',
	price: '$1 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_115202.jpg',
	_id: 27

},

{

	stone: 'Sunstone',
	size: '6 mm',
	cut: 'smooth',
	color: 'pink',
	price: '$0.15 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_115441.jpg',
	_id: 28

},

{

	stone: 'Sunstone',
	size: '8 mm',
	cut: 'smooth',
	color: 'pink',
	price: '$0.35 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_115559.jpg',
	_id: 29

},

{

	stone: 'Sunstone',
	size: '4 mm',
	cut: 'smooth',
	color: 'pink',
	price: '$0.20 per bead',
	shape: 'slab',
	image: 'http://localhost:3000/photos/20180709_120038.jpg',
	_id: 30

},

{

	stone: 'Sunstone',
	size: '12 mm',
	cut: 'smooth',
	color: 'pink',
	price: '$0.25 per bead',
	shape: 'oval',
	image: 'http://localhost:3000/photos/20180709_120942.jpg',
	_id: 31

},

{

	stone: 'Pyrite',
	size: '10 mm',
	cut: 'smooth',
	color: 'gold/silver',
	price: '$0.40 per bead',
	shape: 'chunk',
	image: 'http://localhost:3000/photos/20180709_121518.jpg',
	_id: 32

},

{

	stone: 'Pyrite',
	size: '20-40 mm',
	cut: 'smooth',
	color: 'gold/silver',
	price: '$1.15 per bead',
	shape: 'flat oval',
	image: 'http://localhost:3000/photos/20180709_121646.jpg',
	_id: 33

},

{

	stone: 'Carnelian',
	size: '10-15 mm',
	cut: 'smooth',
	color: 'red/orange',
	price: '$0.50 per bead',
	shape: 'square chunk',
	image: 'http://localhost:3000/photos/20180709_122159.jpg',
	_id: 34

},

{

	stone: 'Carnelian',
	size: '9 mm',
	cut: 'smooth',
	color: 'red/orange/clear',
	price: '$0.45 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_122351.jpg',
	_id: 35

},

{

	stone: 'Carnelian',
	size: '10 mm',
	cut: 'smooth',
	color: 'orange/red/clear',
	price: '$0.50 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_123105.jpg',
	_id: 36

},

{

	stone: 'Carnelian',
	size: '12 mm',
	cut: 'smooth',
	color: 'red/orange/clear',
	price: '$0.75 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_123404.jpg',
	_id: 37

},

{

	stone: 'Carnelian',
	size: '5 mm',
	cut: 'smooth',
	color: 'red/orange/clear',
	price: '$0.15 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_123543.jpg',
	_id: 38

},

{

	stone: 'Carnelian',
	size: '12 mm',
	cut: 'faceted',
	color: 'red/orange/clear',
	price: '$0.70 per bead',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_123843.jpg',
	_id: 39

},

{

	stone: 'Carnelian',
	size: '7 mm',
	cut: 'smooth',
	color: 'red/orange/clear',
	price: '$0.50 per bead',
	shape: 'drop',
	image: 'http://localhost:3000/photos/20180709_124047.jpg',
	_id: 40

},

{

	stone: 'Carnelian',
	size: '4 mm',
	cut: 'smooth',
	color: 'red/orange/clear',
	price: '$0.15 per bead',
	shape: 'rondelle',
	image: 'http://localhost:3000/photos/20180709_124253.jpg',
	_id: 41

},

{

	stone: 'Red Aventurine',
	size: '5 mm',
	cut: 'smooth',
	color: 'red/orange',
	price: '$0.20 per bead',
	shape: 'rondelle',
	image: 'http://localhost:3000/photos/20180709_124558.jpg',
	_id: 42

},

{

	stone: 'Red Aventurine',
	size: '10 mm',
	cut: 'smooth',
	color: 'red/orange',
	price: '$0.35 per bead',
	shape: 'rectangle tube',
	image: 'http://localhost:3000/photos/20180709_124758.jpg',
	_id: 43

},

{

	stone: 'Red Aventurine',
	size: '5 mm',
	cut: 'smooth',
	color: 'red/orange',
	price: '$0.50',
	shape: 'slab',
	image: 'http://localhost:3000/photos/20180709_124957.jpg',
	_id: 44

},

{

	stone: 'Red Aventurine',
	size: '15 mm',
	cut: 'faceted',
	color: 'red/orange',
	price: '$0.75',
	shape: 'barrel',
	image: 'http://localhost:3000/photos/20180709_125651.jpg',
	_id: 45
},

{

	stone: 'Red Aventurine',
	size: '5 mm',
	cut: 'smooth',
	color: 'red/orange',
	price: '$0.20',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_125814.jpg',
	_id: 46

},

{

	stone: 'Sodalite',
	size: '4 mm',
	cut: 'smooth',
	color: 'blue/white',
	price: '$0.20',
	shape: 'cube',
	image: 'http://localhost:3000/photos/20180709_130045.jpg',
	_id: 47

},

{

	stone: 'Sodalite',
	size: '30 mm',
	cut: 'smooth',
	color: 'blue/white',
	price: '$0.95 per bead',
	shape: 'flat oval',
	image: 'http://localhost:3000/photos/20180709_130434.jpg',
	_id: 48

},

{

	stone: 'Sodalite',
	size: '6 mm',
	cut: 'smooth',
	color: 'blue/white',
	price: '$0.35',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_130634.jpg',
	_id: 49

},

{

	stone: 'Sodalite',
	size: '10 mm',
	cut: 'smooth',
	color: 'blue/white',
	price: '$0.55',
	shape: 'round',
	image: 'http://localhost:3000/photos/20180709_130744.jpg',
	_id: 50

}]


router.get('/beads', (req, res) => {
catalog.find({}).exec(function(err, beads) {
    if (err) res.send(err);

res.status(200).json(beads);
});
});





app.listen(port, function(){
  console.log('Server listening on port ' + port)
});