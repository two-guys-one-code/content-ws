module.exports = function(app) {
   var UserModel = app.get('models').User;
   var uuid = require('node-uuid');
   var crypt = require('bcrypt');
   var jwt = require('jsonwebtoken');
   var mailTransporter = require('../mail');

   var externalRoutes = {};

   externalRoutes.signup = function(req, res) {
       //TODO validar password
       UserModel.create({
         id: uuid.v4(),
         name: req.body.name,
         email: req.body.email,
         password: crypt.hashSync(req.body.password, crypt.genSaltSync(10))
       }).then(function(user) {
         res.json({success: true, message: 'User created.'});
       }).catch(function(err) {
         res.json({success: false, message: err.errors[0].message})
       });
   };

   externalRoutes.login = function(req, res) {
        UserModel.findOne({where: { email: req.body.email }}).then(function(user) {
          if(user) {
             if(!crypt.compareSync(req.body.password, user.password)) {
                res.json({success: false, message: 'Email or password is incorrect.'});
                return;
             }

             user.access_token = require('../Utils').createToken(user.email);
             updateUserTokenAndThenLogin(user, res);
        });
   };

   externalRoutes.forgotpassword = function(req, res) {
        if(isValidEmail(req)) {
          res.json({success: false, message: 'Failed to send email.'});
          return;
        }

        UserModel.findOne({where: { email: req.body.email }}).then(function(user) {
          if(user)
            mailTransporter.sendForgotPasswordEmail(user.email, function(sent){
              if(!sent)
                res.json({success: false, message: 'Failed to send email. Try again later.'});
              else
                res.json({success: true, message: 'Email sent.'});
            });
        });
   };

   externalRoutes.changepassword = function(req, res) {
     jwt.verify(req.body.token, require('../secret'), function(err, email) {
         if (err) {
             res.json({success: false, message: 'Token expired.'});
             return;
          }
           //TODO validar password
           var new_password = req.body.new_password;
           var confirm_password = req.body.confirm_password;

          if(new_password !== confirm_password) {
              res.json({success: false, message: 'Password do not match.'});
              return;
          }

          new_password = crypt.hashSync(new_password, crypt.genSaltSync(10));
          UserModel.update({password: new_password}, {where: {email:email}}).then(function(updated){
             if(updated){
               res.json({success: true, message: 'Success.'});
             } else {
               res.json({success: false, message: 'An error occurred. Try again later.'});
             }
           });
     });
   };

   externalRoutes.updatepassword = function(req, res) {
     res.sendfile('./public/forgotpassword.html');
   };

   return externalRoutes;
};

//Helper Methods
var isValidEmail = function(req) {
  var validator = require('validator');
  if(req.body.email == '')
    return false;

  return validator.isEmail(req.body.email);
}

var updateUserTokenAndThenLogin = function(user, res) {
  user.update({access_token: user.access_token}, {where: {id:user.id}}).then(function(updated) {
    if(updated)
      res.json({success: true, message: 'You are logged in.', user: user});
    else
      res.json({success: false, message: 'An error occurred. Try again later.'});
  });
};
