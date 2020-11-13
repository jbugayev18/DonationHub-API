const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");

describe.only("inventory endpoint", function () {
  let db;

  const {
    testUsers,
    testSites,
    testInventory,
  } = helpers.makeDonationFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`POST /api/items`, () => {
    beforeEach("insert users", () => helpers.seedUser(db, testUsers));
    beforeEach("insert sites", () => helpers.seedSites(db, testSites));
    beforeEach("insert inventory", () =>
      helpers.seedInventory(db, testInventory)
    );
    it(`Unauthorized user receives 401 response`, () => {
      return supertest(app)
        .post("/api/items/1/items")
        .send({})
        .expect(401)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    });
    it(`User revieces 200 response and adds an item to the inventory or something I guess`, () => {
      let newInv = {
        item_name: "Toothpaste",
        site_id: 1,
        ideal_amount: 50,
        current_amount: 10,
        critical_amount: 30,
      };

      return supertest(app)
        .post("/api/items/1/items")
        .set("Authorization", helpers.makeAuthHeader(testUsers[2]))
        .send(newInv)
        .expect(200);
    });
  });
});
