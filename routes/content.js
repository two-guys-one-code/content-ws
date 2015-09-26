module.exports = function(app) {
  var ContentModel = app.get('models').Content;
  var UserModel = app.get('models').User;
  var uuid = require('node-uuid');
  var jwt = require('jsonwebtoken');

  var content = {};

  content.getAllContents = function(req, res) {
     ContentModel.findAll().then(function(contents){
        res.json({success: true, contents: contents});
     });
  };

  content.getContentsFromUser = function(req, res) {
    ContentModel.findAll({
       where: {authorId: req.params.id}
    }).then(function(contents){
       res.json({success: true, contents: contents});
    });
  };

  content.getContent = function(req, res) {
    ContentModel.findOne({
        where: {id: req.params.id}
    }).then(function(content){
        res.json({success: true, content: content});
    }).catch(function(err){
        res.json({success: false, message: err.errors[0].message});
    });
  };

  content.createContent = function(req, res) {
    var tags = req.body.tags;

    ContentModel.create({
      id: uuid.v4(),
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      authorId: req.user.id
    }).then(function(content) {
      if(tags != null) {
        for(var i=0; i<tags.length;i++) {
          TagModel.findOrCreate({where: {name: tags[i]}}).then(function(tag){
            content.addTask(tag).catch(function(err){
                res.json({success: false, message: err});
            });
          }).catch(function(err){
              res.json({success: false, message: err});
          });
        }
      }

      res.json({success: true, message: 'Content created.', id: content});
    }).catch(function(err) {
      res.json({success: false, message: err});
    });
  };

  content.updateContent = function(req, res) {
      ContentModel.update({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
      }, {where: {id:req.params.id}}).then(function(updated){
          res.json({success: true, message: 'Content updated.'});
      }).catch(function(err){
        res.json({success: false, message: err.errors[0].message});
      });
  };

  content.deleteContent = function(req, res) {
      ContentModel.destroy({
        where: {id: req.params.id}
      }).then(function(deleted){
        if(deleted > 0)
          res.json({success: true, message: 'Content deleted.'});
        else
          res.json({success: false, message: 'Content not found.'});
      }).catch(function(err){
        res.json({success: false, message: err.errors[0].message});
      });
  };

  return content;
};
