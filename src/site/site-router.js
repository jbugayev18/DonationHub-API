const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth');
const siteRouter = express.Router();
const SitesService = require("./site-service");
const {sanitizeFields} = require('../utils');
const jsonParser = express.json();

siteRouter.get("/", async (req, res, next) => {
  try {
    return res.json(await SitesService.getSitesInWindow(req.app.get("db"), ...String(req.query.rect).split(',',4)));
  } catch(err) {
    next(err);
  }
});

siteRouter.use(requireAuth).route("/")
.post(jsonParser,async (req, res, next) => {
  const db = req.app.get('db');
  const {address, description, label, lat, lon, place_id} = req.body;
  let newSite = { address, description, label, lat, lon, place_id};
  
  for (const [key, value] of Object.entries(newSite)){
    if(value === null){
      return next({status: 400, message: `Missing '${key}' in request body`});
    }
  }
  newSite = sanitizeFields(newSite);
  try {
    const sites = await SitesService.postSite(db, newSite);
    res
      .status(201)
      .json(sites);
  } catch (err) {
    next(err);
  }
  //return res.status(500).send();
});

module.exports = siteRouter;
