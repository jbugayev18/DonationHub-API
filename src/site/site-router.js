const path = require("path");
const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const siteRouter = express.Router();
const SitesService = require("./site-service");
const { sanitizeFields } = require("../utils");
const jsonParser = express.json();

siteRouter.get("/", async (req, res, next) => {
  try {
    const siteResponse = await SitesService.getSitesInWindow(
      req.app.get("db"),
      ...String(req.query.rect).split(",", 4)
    );
    return res.json(
      siteResponse.length === 0 ? "There is no site" : siteResponse
    );
  } catch (err) {
    next(err);
  }
});

siteRouter
  .use(requireAuth)
  .route("/")
  .post(jsonParser, async (req, res, next) => {
    const db = req.app.get("db");
    const {
      lat,
      lon,
      label,
      address,
      description,
      formatted_phone_number,
      place_id,
      url,
      website,
    } = req.body;
    let newSite = {
      lat,
      lon,
      label,
      address,
      description,
      formatted_phone_number,
      place_id,
      url,
      website,
    };
    for (const [key, value] of Object.entries(newSite)) {
      if (value === null) {
        return next({
          status: 400,
          message: `Missing '${key}' in request body`,
        });
      }
    }
    newSite = sanitizeFields(newSite);
    try {
      const hasSiteWithPlaceId = await SitesService.hasSiteWithPlaceId(
        req.app.get("db"),
        place_id
      );
      if (hasSiteWithPlaceId)
        return res.status(400).json({
          error: `We already have records of this location, duplicate entries are not allowed.`,
        });
      const site = await SitesService.postSite(db, newSite);
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/:${site.id}`))
        .json(site);
      return site.id;
    } catch (err) {
      next(err);
    }
    //return res.status(500).send();
  });

module.exports = siteRouter;
