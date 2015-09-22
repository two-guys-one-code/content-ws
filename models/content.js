module.exports = function(sequelize) {
  var DataTypes = require('sequelize');
  var Content = sequelize.define("Content", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUUID: 4
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title cannot be empty'}
      }
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: { msg: 'Content cannot be empty'}
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUUID: 4
      }
    },
    created_at: DataTypes.DATE
  }, {
    //tableName: 'content',
    timestamps: true,
    createdAt: 'created_at',
    deletedAt: false,
    updateAt: false,
  });

  return Content;
};
