////////////////////////////////////////////////////////////////////////////////
// import ORM instance and Datatypes
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
////////////////////////////////////////////////////////////////////////////////
// import main model
var Artist = require("./baseStructure/Artists.js")(global.ORM.sequelize, DataTypes);
////////////////////////////////////////////////////////////////////////////////
// import additional models (for define relations)
var Productions = require("./baseStructure/Productions.js")(global.ORM.sequelize, DataTypes);
var Band = require("./baseStructure/Bands.js")(global.ORM.sequelize, DataTypes);
var Video = require("./baseStructure/Videos.js")(global.ORM.sequelize, DataTypes);
var ArtistsAndBands = require("./baseStructure/ArtistsAndBands.js")(global.ORM.sequelize, DataTypes);
////////////////////////////////////////////////////////////////////////////////
// define relation
Artist.belongsToMany(Band, {
  through: ArtistsAndBands,
  foreignKey: 'FKArtistId',
  otherKey: 'FKBandId'
});

// define relation
Artist.belongsToMany(Video, {
  through: Productions,
  foreignKey: 'FKMusicianId',
  otherKey: 'FKVideoId'
});
////////////////////////////////////////////////////////////////////////////////
// export model with structure and relations
module.exports = Artist;
////////////////////////////////////////////////////////////////////////////////