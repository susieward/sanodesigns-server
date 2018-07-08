require('dotenv').config();
const express = require('express');
      bodyParser = require('body-parser');
       app = express();
      cors = require('cors');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var router = express.Router();

var jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/', router);

app.listen(port, function(){
  console.log('Server listening on port ' + port)
});