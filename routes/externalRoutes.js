module.exports = function(app) {
   var externalRoutes = {};

   externalRoutes.signup = function(req, res) {
       var UserModel = app.get('models').User;
       var user = createUser(req);

       //TODO validar password
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
             var crypt = require('bcrypt');

             if(crypt.compareSync(req.body.password, user.password)) {
                user.access_token = require('Utils').createToken(user.email);
                updateUserTokenAndThenLogin(user, res);
             } else {
                res.json({success: false, message: 'Email or password is incorrect.'});
              }
           } else {
             res.json({success: false, message: 'Email does not exist.'});
           }
        });
   };

   externalRoutes.forgotpassword = function(req, res) {
        if(isValidEmail(req)) {
          var UserModel = app.get('models').User;

          UserModel.findOne({where: { email: req.body.email }}).then(function(user) {
            var transporter = require('../mail');

            if(user)
              transporter.sendForgotPasswordEmail(user.email, function(sent){
                if(!sent)
                  res.json({success: false, message: 'Failed to send email.'});
              });

            res.json({success: true, message: 'Email sent.'});
          });
        }
   };

   externalRoutes.changepassword = function(req, res) {
     var jwt = require('jsonwebtoken')
     var decoded = jwt.verify(req.params.token, require('../secret'), function(err, decoded) {
       if (err) {
         res.json({success: false, message: 'Token expired.'});
      } else {
         //TODO validar password e cryptografar
         var UserModel = app.get('models').User;
         user.update({password: user.password}, {where: {email:decoded}}).then(function(updated){
           if(updated){
             res.json({success: true, message: 'Success.'});
           } else {
             res.json({success: false, message: 'An error occurred. Try again later.'});
           }
         });
       }
     });
   };

   externalRoutes.updatepassword = function(req, res) {
     //TODO criar HTML
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

var isValidEmail = function(req) {
  var validator = require('validator');

  if(req.body.email == '')
    return false;

  return validator.isEmail(req.body.email);
}

var createUser = function(req) {
   var uuid = require('node-uuid');
   var crypt = require('bcrypt');

   return {
     id: uuid.v4(),
     name: req.body.name,
     email: req.body.email,
     password: crypt.hashSync(req.body.password, crypt.genSaltSync(10))
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
