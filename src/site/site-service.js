const boxQuery =
  "box(point(lon, lat), point(lon, lat)) && '(??, ??), (??, ??)'::box";

const SitesService = {
  // TODO -- do something about the seam at +/-180 degrees longitude
  getSitesInWindow(db, leftLon, topLat, rightLon, bottomLat) {
    return db("site").whereRaw(boxQuery, [
      +leftLon || 0,
      +topLat || 0,
      +rightLon || 0,
      +bottomLat || 0,
    ]);
  },
  postSite(db, newSite) {
    return db
      .insert(newSite)
      .into("site")
      .returning("*")
      .then(([site]) => site);
  },
};

module.exports = SitesService;
