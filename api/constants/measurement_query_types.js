const Enum = require("enum");

const measurementQueryTypes = new Enum({
  Points: 1,
  Summary: 2,
  SummaryComplementary: 3,
  Records: 4,
});

module.exports = { measurementQueryTypes };
