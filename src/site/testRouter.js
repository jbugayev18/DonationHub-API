const express = require("express");
const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  res.send("Test Route Works");
});

module.exports = testRouter;
