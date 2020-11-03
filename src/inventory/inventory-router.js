const express = require("express");
const InventoryService = require("./inventory-service");
const {sanitizeFields} = require('../utils');
const inventoryRouter = express.Router();

inventoryRouter.route("/").get((req, res, next) => {
  InventoryService.getAllItemsfromSites(req.app.get("db")).then((items) => {
    res.json(items);
  });
});

inventoryRouter.route("/:site_id").get(async (req, res) => {
  const { site_id } = req.params;
  console.log(site_id);
  const items = await InventoryService.getAllItemsFromSiteId(
    req.app.get("db"),
    site_id
  );
  console.log(items);
  res.json(items);
});

inventoryRouter.route("/:site_id/items/:item_id").get(async (req, res) => {
  const { site_id, item_id } = req.params;
  const item = await InventoryService.getItemById(
    req.app.get("db"),
    site_id,
    item_id
  );
  console.log(item);
  res.json(item);
});

//PUT method; Add an item to the inventory and update count

inventoryRouter.route("/:site_id/items/:item_id").put(async (req, res) => {
  const { site_id, item_id } = req.params;
  //get the data from the user
  const { new_amount } = req.body;

  InventoryService.updateItemQuantity(
    req.app.get("db"),
    site_id,
    item_id,
    new_amount
  ).then((rows) => {
    if (!rows) {
      return res.status(404).json({ success: fail });
    }
    return res.json({ success: true });
  });
});

//POST an item into the inventory

inventoryRouter.route("/:site_id/items").post(async (req, res, next) => {
  const db = req.app.get("db");
  const {item_name,critical_amount,site_id } = req.body;
  let new_item = {item_name,critical_amount,site_id };
  new_item = sanitizeFields(new_item);
  try{
    const item = await InventoryService.addNewItem(
      db,
      new_item
    ); 
    res
      .status(201)
      .json(item);
  } catch (err){
    next(err);
  }
});

inventoryRouter.route("/:site_id/items/:item_id").delete(async (req, res) => {
  //Remove item from site. This should only be done from the administrator
  const { site_id, item_id } = req.params;
  const item = await InventoryService.deleteItemById(
    req.app.get("db"),
    site_id,
    item_id
  );
  res.json(item);
});

module.exports = inventoryRouter;
