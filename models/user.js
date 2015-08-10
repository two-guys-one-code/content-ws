module.exports = function(sequelize) {
  var DataTypes = require('sequelize');
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUUID: 4
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Invalid name.'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Invalid email.'},
        isUnique: function (email, done) {
            User.find({ where: { email: email }}).done(function (user) {
                    if (user) {
                        done(new Error('Email already in use.'));
                    }
                    done();
            });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Invalid password.'},
        len: {
          args: [6,100],
          msg: 'Password must contain between 6 and 20 characteres.'
        }
      }
    },
    profile_id: {
      type: DataTypes.STRING
    },
    access_token: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'user',
    timestamps: false,
    instanceMethods: {
      toJSON: function () {
        var result = this.get({plain:true});
        delete result['password'];
        return result;
      }
    }
  });

  return User;
};
