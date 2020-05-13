require("./config");

const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
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
const { getPath, getImg } = require("./utils");
const { clean } = require("./storageCleanUp");

// eslint-disable-next-line
const { mongoose } = require("./db/mongoose");

const publicFolderPath = path.resolve(__dirname, "../public");
const storageFolderPath = path.resolve(__dirname, "../storage");
const port = process.env.PORT;
const MS_DELETE_TIMEOUT = 5000;

// run this cronjob every day at midnight
const job = new CronJob("0 0 * * *", () => {
  console.log(chalk`{blue.bold [INFO] Running cronjob for storage clean up}`);
  clean(storageFolderPath);
});

app.use(cors());
app.use(json());
app.use(express.static(publicFolderPath));
app.use("/api/boards", apiRouter);

// https://bit.ly/2wMAs0i
if (process.env.NODE_ENV === "PRODUCTION") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(publicFolderPath, "index.html"));
  });
}

// on a publicly available server, we want session-based board persistence
if (process.env.RETRO_PUBLIC) {
  var timeout;
  io.on(CONNECT, (client) => {
    const boardId = client.handshake.query.boardId;

    client.join(boardId);
    const clients = io.sockets.adapter.rooms[boardId].sockets;

    // handles the case when there is only 1 client left and she reloads the page
    // on a reload, we have 0 clients for a short amount of time
    // so we wait 5 seconds after this disconnect to be sure, that it's not a reload
    const actualClientCount = getNumberOfClients(clients);
    if (actualClientCount >= 0) {
      if (Boolean(timeout) && timeout.hasRef()) {
        clearTimeout(timeout);
      }
    }

    client.on(DISCONNECT, () => {
      client.leave(boardId);
      const immediateClientCount = getNumberOfClients(clients);
      if (immediateClientCount === 0) {
        timeout = setTimeout(
          () => deleteBoardWhenNoClientsPresent(boardId),
          MS_DELETE_TIMEOUT
        );
      }
    });

    boardEvents(io, client, boardId);
    columnEvents(io, client, boardId);
    cardEvents(io, client, boardId);
  });
} else {
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
}

server.listen(port, () => {
  console.log(chalk`{blue.bold [INFO] Listening on ${port}}`);
  job.start();
  console.log(chalk`{blue.bold [INFO] Started cronjob}`);
});

function deleteBoardWhenNoClientsPresent(boardId) {
  fs.unlink(getPath(boardId), (error) => {
    if (error) console.log("Couldn't find board for ", boardId);
  });

  fs.unlink(getImg(boardId), (error) => {
    if (error) console.log("Couldn't find image for ", boardId);
  });
}

function getNumberOfClients(clients) {
  return typeof clients !== "undefined" ? Object.keys(clients).length : 0;
}

module.exports = { server };
