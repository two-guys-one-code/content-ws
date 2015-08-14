var Sequelize = require('sequelize');
var config    = {
  name: 'content_app',
  username: 'root',
  password: '', //'root',
  options: {
  host: 'localhost',
  port:3306,
  //port: '/Applications/MAMP/tmp/mysql/mysql.sock',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
    }
  }
};

var sequelize = new Sequelize(
  config.name,
  config.username,
  config.password,
  config.options
);

// load models
var models = [
  'User',
  'Content',
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports.sequelize = sequelize;
