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
  getAllItemsFromSiteId(db, id) {
    return db.from("inventory").where({
      site_id: id,
    });
  },
};

module.exports = InventoryService;
