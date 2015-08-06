var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
//var sequelize = new Sequelize('content_app', 'root', '', {
var sequelize = new Sequelize('content_app', 'root', 'root', {
  host: 'localhost',
  port: '/Applications/MAMP/tmp/mysql/mysql.sock',
  //port:3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var externalRoutes = require('./externalRoutes')(sequelize);

//external routes
router.post('/signup', externalRoutes.signup);
router.post('/login', externalRoutes.login);


//se chegar aqui, mandar um erro 404
router.get('*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
