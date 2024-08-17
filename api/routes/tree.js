const { Router } = require("express");
const { getTree } = require("../get_routes/get_tree");

const treeRouter = Router();

treeRouter.post("/", async (req, res) => {
  const { parentId } = req.body;

  let data = [];

  if (!parentId) {
    console.log("*** Missing Data (/tree) ***");
    return res.json({
      data,
      status: "bad",
      message: "missing data",
    });
  }

  try {
    data = await getTree(parentId);
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

module.exports = { treeRouter };