module.exports = function(sequelize) {
  var User = require('../models/user')(sequelize);

  var externalRoutes = {
      signup: function(req, res) {
        var user = createUser(req, true);
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
        var user = createUser(req);
        var isUserValid = validateLogin(user, sequelize);

        if(isUserValid.success) {
          sequelize.sync().then(function() {
            var token = createToken(user);
            return User.findOne({where: { email: req.body.email }});
          }).then(function(user) {
            if(user)
              res.json({success: true, message: 'You are logged in.'});
          });
        } else {
          res.json(isUserValid);
        }
      }
  };

  return externalRoutes;
};

//Helper Methods
var createToken = function(user) {
   var jwt = require('jsonwebtoken');
   return jwt.sign(user, require('./secret'), {
     expires: 1440
   });
}

var createUser = function(req, isCreating) {
   var uuid = require('node-uuid');
   return {
     id: (isCreating) ? uuid.v4() : '',
     name: req.body.name,
     email: req.body.email,
     password: req.body.password
   };
}

var validateLogin = function(user, sequelize) {
   var validator = require('validator');
   var UserTable = require('../models/user')(sequelize);
   //validate fields
   if(!validator.isEmail(user.email))
     return {success: false, message: 'Invalid email.'};

   if(validator.isNull(user.password) || !validator.isLength(user.password,6))
     return {success:false, message: 'Password must have at least 6 characteres.'};

     var dbUser = UserTable.findOne({where: {email: user.email}});
     if(dbUser) {
        if(validator.equals(user.password, dbUser.password)) {
          return {success: true, message: 'You are logged in.'};
        } else {
          return {success: false, message: 'Invalid password.'};
        }
     } else {
       return {success: false, message:'Invalid user.'};
     }
}

var validateSignUp = function(user, sequelize) {
  var validator = require('validator');
  var UserTable = require('../models/user')(sequelize);
  //validate fields
  if(!validator.isEmail(user.email))
    return {success: false, message: 'Invalid email.'};

  if(!validator.isAlpha(user.name) || user.name == null || user.name == 'undefined')
    return {success:false, message: 'Invalid name.'};

  if(validator.isNull(user.password) || !validator.isLength(user.password,6))
    return {success:false, message: 'Password must have at least 6 characteres.'};

  //check if email already exists
  var dbUser = UserTable.count({ where: {email: user.email} });

  if(dbUser)
    return {success:true, message: ''};
  else
    return {success: false, message:'User already exists.'};
}
