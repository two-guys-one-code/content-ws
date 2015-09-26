module.exports = function(app) {
  var TagModel = app.get('models').Tag;
  var ContentModel = app.get('models').Content;

  var tag = {};

  tag.addTagToContent = function(req, res) {
    ContentModel.findOne({
      where: {id: req.params.id}
    }).then(function(content){
      TagModel.findOrCreate({where: {name: req.body.name} }).then(function(tag){
        content.addTag(tag).then(function(tag){
          res.json({success: true, message: 'tag added to content.'});
        });
      });
    });
  };

  tag.addNewTag = function(req,res) {
    TagModel.create({
        name: req.body.name
    }).then(function(tag){
      res.json({success: true, message: 'tag created.'});
    }).catch(function(err){
      res.json({success: false, message: err.errors[0].message});
    });
  };

  tag.findAllTags = function(req, res) {
    TagModel.findAll().then(function(tags) {
      res.json({success: true, tags: tags});
    }).catch(function(err){
      res.json({success: false, message: err.errors[0].message});
    });
  };

  tag.findTagsByContent = function(req,res) {
    ContentModel.findOne({
      where: {id: req.params.id}
    }).then(function(content){
      content.getTags().then(function(tags){
        res.json({success: true, tags: tags});
      });
    });
  };

  tag.updateTags = function(req, res) {
    var tags = req.body.tags;

    ContentModel.findOne({
      where: {id: req.params.id}
    }).then(function(content){
      content.setTags([]).then(function() {
        if(tags == null)
          return;

        for(var i=0; i<1; i++) {
          TagModel.findOrCreate({
            where: {name: tags[i].name}
          }).then(function(tag){
            content.addTag(tag).then(function(tag){
              res.json({success: true, tag: tag});
            });
          });
        };
      });
    });
  };

  return tag;
};
