/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order_record', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'order_record',
      timestamps:false
  });
};
