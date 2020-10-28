const express = require("express");
const json = require("body-parser").json();
const siteRouter = express.Router();
const SitesService = require("./site-service");

siteRouter.get("/", (req, res) => {
  //Return all sites
  SitesService.getSitesInWindow(req.app.get("db")).then((sites) => {
    res.json(sites);
  });
});

siteRouter.post("/", (req, res) => {
  //Post a site.
  SitesService.postSitesInWindow(
    req.app.get("db").then((site) => {
      res.json(site);
    })
  );
});

module.exports = siteRouter;
