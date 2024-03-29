const assetsRouter = require('./routes/space/assets');
const latestRouter = require('./routes/space/latest');
const pointsRouter = require('./routes/space/points');
const summaryRouter = require('./routes/space/summary');
const express = require('express');

const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());

app.get('/', (request, response) => {
    response.send("Heartbeat API...");
})

app.use('/api/space/latest', latestRouter);
app.use('/api/space/points', pointsRouter);
app.use('/api/space/summary', summaryRouter);
app.use('/api/space/assets', assetsRouter);

app.listen(port, () => {
    console.log(`APP LISTENING ON PORT : ${port}`);
});
