var DataTypes = require('sequelize');

module.exports = function(sequelize) {
  var User = require('../models/user')(sequelize, DataTypes);

  var externalRoutes = {

      signup: function(req, res) {
        var uuid = require('node-uuid');

        sequelize.sync().then(function() {
          return User.create({
            id: uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
        }).then(function(user) {
          res.json({success: true, message: 'User Created.'});
        });
      },

      login: function(req, res) {
        sequelize.sync().then(function() {
          return User.findOne({where: { email: req.body.email }});
        }).then(function(user) {
          if(user)
            res.json({success: true, message: 'You are logged in.'});
        });
      }
  };

  return externalRoutes;
};
