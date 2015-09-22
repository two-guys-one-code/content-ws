exports.createTimeToken = function(email) {
   var jwt = require('jsonwebtoken');
   return jwt.sign(email, require('./secret'), {
      expiresInMinutes: 1440
    });
};

exports.createTokenUser = function(user) {
   var jwt = require('jsonwebtoken');
   var payload = {
      email: user.email,
      secret: user.secret
   };

   return jwt.sign(payload, require('./secret'));
};
