const express = require("express");
const router = express.Router();
const session = require("../controller/session");
const board = require("../controller/board");

router.post("/login", (req, res) => {
  session.login(req, res);
});

router.post("/register", (req, res) => {
  session.register(req, res);
});

router.get("/logout", (req, res) => {
  session.logout(req, res);
});

router.post("/post_make", (req, res) => {
  board.post(req, res);
  // board.post(req, res);
});

router.post("/board", (req, res) => {
  board.board(req, res);
  // board.post(req, res);
});

router.post("/check_my_post", (req, res) => {
  board.check_my_post(req, res);
});


module.exports = router;
