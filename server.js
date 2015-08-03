var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var methodOverride = require('method-override');

var sequelize = new Sequelize('content_app', 'root', 'root', {
  host: 'localhost',
  port: '/Applications/MAMP/tmp/mysql/mysql.sock',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

require('./app/routes')(app, sequelize);

app.listen(port);

console.log('hello world at port: ' + port);

exports = module.exports = app;
