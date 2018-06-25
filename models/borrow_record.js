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
      allowNull: true
    },
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    borrow_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    return_date: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    borrow_status: {
      type: DataTypes.ENUM('5','4','3','2','1','0'),
      allowNull: true,
      defaultValue: '0'
    },
    form_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'borrow_record'
  });
};
