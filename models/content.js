module.exports = function(sequelize) {
  var DataTypes = require('sequelize');
  var Content = sequelize.define("Content", {
    id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    content: {
      type: DataTypes.STRING,
      notNull: true,
      notEmpty: true
    },
    image: DataTypes.STRING,
    author_id: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
        notEmpty: true,
        isUUID: 4
      }
    },
    created_at: DataTypes.DATE
  }, {
    tableName: 'content',
    timestamps: true,
    createdAt: 'created_at',
    deletedAt: false,
    updateAt: false,
  });

  return Content;
};
