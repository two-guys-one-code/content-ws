module.exports = function(sequelize) {
  var externalRoutes = {

      signup: function(req, res) {
        var user = createUser(req);
        var isUserValid = validateSignUp(user,sequelize);

        if(isUserValid.success) {
          sequelize.sync().then(function() {
            return User.create(user);
          }).then(function(user) {
            res.json({success: true, message: 'User created.'});
          });
        } else {
           res.json(isUserValid);
        }
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

var createUser = function(req) {
   var uuid = require('node-uuid');
   return {
     id: uuid.v4(),
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
   };
}

var validateSignUp = function(user, sequelize) {
  var validator = require('validator');

  //validate fields
  if(!validator.isEmail(user.email))
    return {success: false, message: 'Invalid email.'}

  if(!validator.isAlpha(user.name) || user.name == null || user.name == 'undefined')
    return {success:false, message: 'Invalid name.'}

  if(validator.isNull(user.password) || !validator.isLength(user.password,6))
    return {success:false, message: 'Password must have at least 6 characteres.'}

  //check if email already exists
  var UserTable = require('../models/user')(sequelize);
  if(UserTable.findOne({where: {email: user.email}}))
    return {success: false, message:'User already exists.'}

  return {success:true, message: ''};
}
