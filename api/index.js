const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const rateSpeedLimiter = require("express-slow-down");
// -------------------------------------------------------------
const tablesRouter = require("./routes/tables");
const { assetsRouter } = require("./routes/assets");
const { recordsRouter } = require("./routes/records");
const { latestRouter } = require("./routes/space/latest");
const { pointsRouter } = require("./routes/space/points");
const { summaryRouter } = require("./routes/space/summary");

const app = express();
const PORT = process.env.PORT || 9000;

// In-memory cache
const cache = {};
const cacheTTL = 365 * 24 * 60 * 60 * 1000; // 1 year

app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Rate limit middleware
const rateLimit = rateLimiter({
  max: 50,
  windowMs: 1 * 60 * 1000,
});

const rateSpeedLimit = rateSpeedLimiter({
  delayAfter: 15,
  windowMs: 1 * 60 * 1000,
  delayMs: 5000,
});

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

app.use("/tables", tablesRouter);
app.use("/api/records", recordsRouter(cache, cacheTTL));
app.use("/api/assets", assetsRouter(cache, cacheTTL));
app.use("/api/space/latest", latestRouter(cache, cacheTTL));
app.use("/api/space/points", pointsRouter(cache, cacheTTL));
app.use("/api/space/summary", summaryRouter(cache, cacheTTL));

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT : ${PORT}`);
});
