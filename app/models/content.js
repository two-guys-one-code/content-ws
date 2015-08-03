module.exports = function(sequelize, DataTypes) {
  var Content = sequelize.define("Content", {
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    author_id: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    tableName: 'content',
    timestamps: false,
  });

  return Content;
};
