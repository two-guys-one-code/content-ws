module.exports = function (app, router) {
  var express = require('express');
  var router = express.Router();

  var externalRoutes = require('./externalRoutes')(app);

  //external routes
  router.post('/signup', externalRoutes.signup);
  router.post('/login', externalRoutes.login);
  router.post('/forgotpassword', externalRoutes.forgotpassword);
  router.post('/changepassword/:token', externalRoutes.changepassword);
  router.get('/changepassword/:token', externalRoutes.updatepassword);

  //error 404 if nothing else runs.
  router.get('*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  return router;
};
