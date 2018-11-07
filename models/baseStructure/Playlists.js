/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Playlists', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    FKUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    tableName: 'Playlists'
  });
};