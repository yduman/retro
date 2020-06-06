require("./config");
const chalk = require("chalk");
const path = require("path");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const CronJob = require("cron").CronJob;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const apiRouter = require("./routes/apiRouter");
const { CONNECT, DISCONNECT } = require("./events/event-names");
const { boardEvents, columnEvents, cardEvents } = require("./events");
const { clean } = require("./storageCleanUp");

// eslint-disable-next-line
const { mongoose } = require("./db/mongoose");
const publicDir = path.resolve(__dirname, "../public");
const storageDir = path.resolve(__dirname, "../storage");
const port = process.env.PORT;

// run this cronjob every day at midnight
const job = new CronJob("0 0 * * *", () => {
  console.log(chalk`{blue.bold [INFO] Running cronjob for storage clean up}`);
  clean(storageDir);
});

app.use(cors());
app.use(json());
app.use(express.static(publicDir));
app.use("/api/boards", apiRouter);

// https://bit.ly/2wMAs0i
if (process.env.NODE_ENV === "PRODUCTION") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

io.on(CONNECT, (client) => {
  const roomId = client.handshake.query.boardId;

  client.join(roomId);
  client.on(DISCONNECT, () => {
    client.leave(roomId);
  });

  boardEvents(io, client, roomId);
  columnEvents(io, client, roomId);
  cardEvents(io, client, roomId);
});

server.listen(port, () => {
  console.log(chalk`{blue.bold [INFO] Listening on ${port}}`);
  job.start();
  console.log(chalk`{blue.bold [INFO] Started cronjob}`);
});

module.exports = { server };
