/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('borrow_record', {
    borrow_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'book',
        key: 'book_id'
      }
    },
    borrow_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    return_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'borrow_record',
      timestamps:false,
  });
};
