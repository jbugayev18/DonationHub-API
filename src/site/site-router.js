const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth');
const siteRouter = express.Router();
const SitesService = require("./site-service");

siteRouter.get("/", async (req, res, next) => {
  try {
    return res.json(await SitesService.getSitesInWindow(req.app.get("db"), ...String(req.query.rect).split(',',4)));
  } catch(err) {
    next(err);
  }
});

siteRouter.post("/", requireAuth, (req, res) => {
  //SitesService.postSite(req.app.get("db"), site);
  return res.status(500).send();
});

module.exports = siteRouter;
