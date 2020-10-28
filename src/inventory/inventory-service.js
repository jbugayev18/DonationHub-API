const InventoryService = {
  //get all items from its respected site.
  getAllItemsfromSites(db) {
    return db
      .from("inventory")
      .select(
        "site_id",
        "item_name",
        "ideal_amount",
        "current_amount",
        "critical_amount"
      );
  },
  //now I want to filter by just one site
  getAllItemsFromSiteId(db, site_id) {
    return db.from("inventory").where({
      site_id: site_id,
    });
  },

  // Get by site and item
  getItemById(db, site_id, item_id) {
    return db.from("inventory").where({
      site_id: site_id,
      id: item_id,
    });
  },

  deleteItemById(db, site_id, item_id) {
    return db
      .from("inventory")
      .where({
        site_id: site_id,
        id: item_id,
      })
      .del();
  },
};

module.exports = InventoryService;
