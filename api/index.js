const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// -------------------------------------------------------------
const tablesRouter = require("./routes/tables");
const { assetsRouter } = require("./routes/assets");
const { treeRouter } = require("./routes/tree");
const { recordsRouter } = require("./routes/records");
const { latestRouter } = require("./routes/space/latest");
const { pointsRouter } = require("./routes/space/points");
const { summaryRouter } = require("./routes/space/summary");
const { deviationRouter } = require("./routes/space/deviation");
// -------------------------------------------------------------

const db = require("./lib/db");
const app = express();
const PORT = process.env.PORT || 9000;

app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const requestLogger = (request, response, next) => {
  console.log(`${request.method} url:: ${request.url}`);
  next();
};

app.use(requestLogger);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Role"
  );
  next();
});

// check if api is running
app.get("/", async (_req, res) => {
  const data = await db.getAllTables();

  res.writeHead(200, { "Content-Type": "application/json" });

  return res.end(JSON.stringify({ data }));
});

app.use("/", tablesRouter);
app.use("/api/records", recordsRouter());
app.use("/api/assets", assetsRouter());
app.use("/api/tree", treeRouter());
app.use("/api/space/latest", latestRouter());
app.use("/api/space/points", pointsRouter());
app.use("/api/space/summary", summaryRouter());
app.use("/api/space/deviation", deviationRouter());

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT : ${PORT}`);
});
