module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.INTEGER
  }, {
    tableName: 'user',
    timestamps: false,
  });

  return User;
};
