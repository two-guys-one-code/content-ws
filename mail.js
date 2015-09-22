var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'twoguysonecode@gmail.com',
        pass: ''
    }
});

transporter.sendForgotPasswordEmail = function(email, callback , options) {
  var token = require('./Utils').createTimeToken(email);

//TODO check every property to see if it was set.
  var mailOptions = {
      from: (options) ? options.from : 'Two Guys One Code <twoguysonecode@gmail.com>',
      to: (options) ? options.email : email, // list of receivers
      subject: (options) ? options.subject : 'Forgot Password?', // Subject line
      text: (options) ? options.text : 'Click in the link bellow to reset your password.', // plaintext body
      html: 'http://localhost:8080/api/changepassword/'+ token // html body
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          callback(false);
      }else{
          callback(true);
      }
  });
};

transporter.confirmPasswordChangedEmail = function(email, callback , options) {
  var token = require('./Utils').createTimeToken(email);

//TODO check every property to see if it was set.
  var mailOptions = {
      from: (options) ? options.from : 'Two Guys One Code <twoguysonecode@gmail.com>',
      to: (options) ? options.email : email, // list of receivers
      subject: (options) ? options.subject : 'Change Password!', // Subject line
      text: (options) ? options.text : 'Your password was changed.', // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          callback(false);
      }else{
          callback(true);
      }
  });
};

module.exports = transporter;
