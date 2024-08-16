const { getPoints } = require("./get_points");

async function getLatest(assetName, commodityName) {
  const endDate = new Date(); // HOUR 24
  const startDate = new Date(endDate.getTime() - 24 * 60 * 60 * 1000); // HOUR 0
  const dateLevel = "HOUR";
  const isHistoricalIncluded = false;

  const latestPoints = getPoints(
    assetName,
    commodityName,
    startDate,
    endDate,
    dateLevel,
    isHistoricalIncluded
  );

  return latestPoints;
}

module.exports = { getLatest };