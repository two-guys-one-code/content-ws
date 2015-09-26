module.exports = function (app, router) {
  var express = require('express');
  var router = express.Router();

  var externalRoutes = require('./externalRoutes')(app);
  var content = require('./content')(app);
  var tag = require('./tag')(app);

  //external routes
  router.post('/signup', externalRoutes.signup);
  router.post('/login', externalRoutes.login);
  router.post('/forgotpassword', externalRoutes.forgotpassword);
  router.post('/changepassword/:token', externalRoutes.changepassword);
  router.get('/changepassword/:token', externalRoutes.updatepassword);

  //content routes
  router.get('/api/user/:id/content', content.getContentsFromUser);
  router.get('/api/content', content.getAllContents);
  router.post('/api/content', content.createContent);
  router.get('/api/content/:id', content.getContent);
  router.put('/api/content/:id', content.updateContent);
  router.delete('/api/content/:id', content.deleteContent);

  //tags routes
  router.post('/api/tag', tag.addNewTag);
  router.get('/api/tags', tag.findAllTags);
  router.get('/api/content/:id/tags', tag.findTagsByContent);
  router.put('/api/content/:id/tags', tag.updateTags);

  //error 404 if nothing else runs.
  router.get('*', function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  return router;
};
