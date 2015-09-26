module.exports = function(sequelize) {
  var DataTypes = require('sequelize');
  var ContentTag = sequelize.define("ContentTag", {}, {
    timestamps: false
  });

  return ContentTag;
};
