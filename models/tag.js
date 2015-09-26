module.exports = function(sequelize) {
  var DataTypes = require('sequelize');
  var Tag = sequelize.define("Tag", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Tag cannot be empty'},
        isUnique: function (name, done) {
            Tag.find({ where: { name: name }}).done(function (tag) {
                    if (tag) {
                        done(new Error('Tag already in use.'));
                    }
                    done();
            });
        }
      }
    }
  },{
    timestamps: false
  });

  return Tag;
};
