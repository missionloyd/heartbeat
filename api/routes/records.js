const { Router } = require("express");
const { getRecords } = require("../get_routes/get_records");
const {
  createRecordsView,
} = require("../utils/create_records_view");

const recordsRouter = Router();

// Get data, queried by an input user query, from a normalized measurement table.
recordsRouter.post("/", async (req, res) => {
  const { parentAssetName, userQuery } = req.body;

  let data = [];

  if (!parentAssetName || !userQuery) {
    console.log("*** Missing Data (/records) ***");
    return res.json({
      data,
      status: "bad",
      message: "missing data",
    });
  }

  try {
    const recordsViewAlias = "records";

    await createRecordsView(parentAssetName, recordsViewAlias);

    data = await getRecords(userQuery, recordsViewAlias);
  } catch (error) {
    console.log(error);

    return res.json({
      data: [],
      status: 500,
      message: error,
    });
  }

  return res.json({
    data,
    status: "ok",
  });
});

module.exports = { recordsRouter };
