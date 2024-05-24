const Enum = require("enum");

const measurementQueryTypes = new Enum({
  Asset: 1,
  AssetComplementary: 2,
  Latest: 3,
});

module.exports = { measurementQueryTypes };
