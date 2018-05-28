/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    book_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    book_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    book_writer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pub_company: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    current_num: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    book_des: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    pub_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    book_cover: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'book',
      timestamps:false
  });
};
