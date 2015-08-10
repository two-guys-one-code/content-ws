module.exports = function(app) {
   var externalRoutes = {};

   externalRoutes.signup = function(req, res) {
       var UserModel = app.get('models').User;
       var user = createUser(req, true);
       UserModel.create(user).then(function(user) {
         res.json({success: true, message: 'User created.'});
       }).catch(function(err) {
         res.json({success: false, message: err.errors[0].message})
       });
   };

   externalRoutes.login = function(req, res) {
        var UserModel = app.get('models').User;
        if(!isValidCredentials(req, res))
          return;

        UserModel.findOne({where: { email: req.body.email }}).then(function(user) {
          if(user) {
             if(req.body.password == user.password) {
                user.access_token = createToken(user.email);
                updateUserTokenAndThenLogin(user, res);
             } else {
                res.json({success: false, message: 'Email or password is incorrect.'});
              }
           } else {
             res.json({success: false, message: 'Email does not exist.'});
           }
        });
   };

   return externalRoutes;
};

//Helper Methods
var isValidCredentials = function(req,res) {
    if(req.body.password == '' || req.body.email == '') {
        res.json({success: false, message: 'Invalid credentials.'});
        return false;
    }

    return true;
}

var createToken = function(email) {
   var jwt = require('jsonwebtoken');
   return jwt.sign(email, require('../secret'), {
      expiresInMinutes: 1440
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

var updateUserTokenAndThenLogin = function(user, res) {
  user.update({access_token: user.access_token}, {where: {id:user.id}}).then(function(updated){
    if(updated){
      res.json({success: true, message: 'You are logged in.', user: user});
    } else {
      res.json({success: false, message: 'An error occurred. Try again later.'});
    }
  });
};
