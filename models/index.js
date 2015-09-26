var Sequelize = require('sequelize');
var config    = {
  name: 'content_app',
  username: 'root',
  password: '',
  //password: 'root',
  options: {
  host: 'localhost',
  port:3307,
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
  'Tag',
  'ContentTag'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

sequelize.sync();

(function(models){
   models.User.hasMany(models.Content, {foreignKey: 'authorId'});
   models.Content.belongsTo(models.User, {foreignKey: 'authorId'});
   models.Tag.belongsToMany(models.Content, {through: 'ContentTag'});
   models.Content.belongsToMany(models.Tag, {through: 'ContentTag'});
})(module.exports);

module.exports.sequelize = sequelize;
