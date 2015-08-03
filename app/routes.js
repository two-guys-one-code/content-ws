var DataTypes = require('sequelize');
module.exports = function(app, sequelize) {

    app.post('/signup', function(req, res){
      var uuid = require('node-uuid');

      console.log(req.body);

      var User = require('./models/user')(sequelize, DataTypes);
      sequelize.sync().then(function() {
        return User.create({
          id: uuid.v4(),
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
      }).then(function(jane) {
        console.log(jane.get('name'))
        res.sendfile('./public/views/index.html');
      });

    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });

}
