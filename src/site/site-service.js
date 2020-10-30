const boxQuery =
  'box(point(lat, lon), point(lat, lon)) && \'(??, ??), (??, ??)\'::box';

const SitesService = {
  // TODO -- do something about the seam at +/-180 degrees longitude
  getSitesInWindow(db, leftLon, topLat, rightLon, bottomLat) {
    return db('site').whereRaw(boxQuery, [
      +topLat || 0,
      +leftLon || 0,
      +bottomLat || 0,
      +rightLon || 0,
    ]);
  },
  postSite(db, newSite) {
    return db
      .insert(newSite)
      .into('site')
      .returning('*')
      .then(([site]) => site);
  },
  findById(db,site_id){
    return db
      .from('site')
      .select('*')
      .where('id', '=', site_id);
  }
};

module.exports = SitesService;
