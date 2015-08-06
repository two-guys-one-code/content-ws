module.exports = function(sequelize) {
  var DataTypes = require('sequelize');
  var User = sequelize.define("User", {
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_id: DataTypes.INTEGER
  }, {
    tableName: 'user',
    timestamps: false,
  });

  return User;
};
