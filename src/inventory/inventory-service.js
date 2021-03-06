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

  //Add Item to Update Item Quantity
  updateItemQuantity(db, site_id, item_id, new_amount) {
    return db
      .from("inventory")
      .where({
        site_id: site_id,
        id: item_id,
      })
      .update({ current_amount: new_amount });
  },

  //Add New Item into Inventory
  findSiteId(db, place_id) {
    return db.select("id").from("site").where({
      place_id: place_id,
    });
  },
  addNewItem(db, new_item) {
    return (
      db
        .insert(new_item)
        .into("inventory")
        // .returning("*")
        .then((rows) => {
          return rows[0];
        })
    );
  },

  //Delete an Item by Id
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
