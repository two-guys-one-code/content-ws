module.exports = function () {
  var nodemailer = require('nodemailer');

  // create reusable transporter object using SMTP transport
  var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'twoguysonecode@gmail.com',
          pass: 'qazXSW@1'
      }
  });

  return transporter;
};
