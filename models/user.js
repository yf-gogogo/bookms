/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    user_cardid: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    is_admin: {
      type: DataTypes.ENUM('1','0'),
      allowNull: true,
      defaultValue: '0'
    },
    user_email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    user_nickname: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'user',
      timestamps:false,
  });
};
