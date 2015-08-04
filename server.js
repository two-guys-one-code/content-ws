var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var methodOverride = require('method-override');

//var sequelize = new Sequelize('content_app', 'root', '', {
var sequelize = new Sequelize('content_app', 'root', 'root', {
  host: 'localhost',
  port: '/Applications/MAMP/tmp/mysql/mysql.sock',
  // port:3306,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

var router = express.Router();
require('./app/routes')(router,sequelize);
app.use('/api', router);

app.listen(port);

console.log('running at port: ' + port);
exports = module.exports = app;
