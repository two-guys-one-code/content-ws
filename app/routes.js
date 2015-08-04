var DataTypes = require('sequelize');
module.exports = function(router, sequelize) {

    router.post('/signup', function(req, res){
      var uuid = require('node-uuid');
      var User = require('./models/user')(sequelize, DataTypes);

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

    });

    router.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

}
