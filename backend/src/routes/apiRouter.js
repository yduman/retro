const fs = require("fs");
const path = require("path");
const express = require("express");
const puppeteer = require("puppeteer");
const chalk = require("chalk");

const router = express.Router();
const {
  getPath,
  getImg,
  stringify,
  processBoard,
  respondWithInvalidBoardId,
} = require("../utils");
const { Board } = require("../models/board.model");

const width = 1920;
const height = 1080;

/*
{
  boardId: 'A5YFxiIlTBFy3injhESjy',
  title: 'test',
  format: '',
  items: {},
  columns: {},
  columnOrder: [],
  error: false,
  isBlurred: true,
  maxVoteCount: 3,
  showContinueDiscussion: false,
  continueDiscussionVotes: { yes: 0, no: 0, abstain: 0 }
}
*/
router.post("/", async (req, res) => {
  try {
    const body = processBoard(req.body);
    const board = new Board(body);
    await board.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send({ errorMsg: "Board creation went wrong" });
  }

  /*
  try {
    fs.writeFile(
      getPath(processedBoard.boardId),
      stringify(processedBoard),
      "utf8",
      (error) => {
        if (error)
          res.status(400).send({ errorMsg: "Board creation went wrong." });
        res.status(200).send();
      }
    );
  } catch (error) {
    res.status(400).send({ errorMsg: "Board creation went wrong." });
  }
  */
});

router.get("/validate/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  fs.readFile(getPath(boardId), "utf-8", (error) => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }
    res.status(200).send();
  });
});

router.get("/export/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  fs.readFile(getPath(boardId), "utf-8", async (error) => {
    if (error) {
      respondWithInvalidBoardId(res, error);
    }

    const exportPort = process.env.EXPORT_URL_PORT;
    const browser = await puppeteer.launch({
      defaultViewport: { width, height },
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(`http://localhost:${exportPort}/boards/${boardId}`, {
      waitUntil: "networkidle0",
    });

    await page.screenshot({
      path: `./storage/${boardId}.png`,
      fullPage: true,
    });

    const imgPath = path.resolve(getImg(boardId));
    res.download(imgPath, (error) => {
      if (error) {
        res.status(400).send(error);
        console.log(
          chalk`{red.bold [ERROR:EXPORT_BOARD] ${JSON.stringify(error)}}`
        );
      }
    });
  });
});

router.delete("/:boardId", async (req, res) => {
  const boardId = req.params.boardId;
  fs.unlink(getPath(boardId), (error) => {
    if (error) throw error;
    res.status(200).send();
  });
});

module.exports = router;
