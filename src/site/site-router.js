const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth');
const siteRouter = express.Router();
const SitesService = require("./site-service");
const {sanitizeFields} = require('../utils');
const jsonParser = express.json();
const xss = require('xss')

const serializeSites = sites => ({
  id: sites.id,
  lat: sites.lat,
  lon: sites.lon,
  label: xss(sites.label),
  address: xss(sites.address),
  description: xss(sites.description),
  place_id: xss(sites.place_id)
})
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
    const {lat, lon,label, address, description, place_id} = req.body;
    let newSite = {  lat, lon,label, address, description, place_id };
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
  });

siteRouter.route('/:site_id')
  .get((req,res,next)=>{
    SitesService.findById(req.app.get('db'), req.params)
      .then(site => {
        if (!site) {
          return res.status(404).json({
            error: { message: `No donation sites found by id -${req.params.id}`}
          });
        }
        res.site = site;
        next();
      })
      .catch(next);
  })

module.exports = siteRouter;
