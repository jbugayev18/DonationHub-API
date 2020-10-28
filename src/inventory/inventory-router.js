const express = require("express");
const InventoryService = require("./inventory-service");

const inventoryRouter = express.Router();

inventoryRouter.route("/").get((req, res, next) => {
  InventoryService.getAllItemsfromSites(req.app.get("db")).then((items) => {
    res.json(items);
  });
});

inventoryRouter.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const items = await InventoryService.getAllItemsFromSiteId(
    req.app.get("db"),
    id
  );
  console.log(items);
  res.json(items);

  res.send(req.params);
});

module.exports = inventoryRouter;
