const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");
const supertest = require("supertest");

describe.skip("places endpoint", function () {
  let db;

  // const { testUsers, testSites, testPlaces}

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

  describe.skip(`POST /api/`, () => {
    beforeEach("insert users", () => helpers.seedUser(db, testUsers));
    beforeEach("insert sites", () => helpers.seedSites(db, testSites));
    beforeEach("insert places", () => helpers.seedPlaces(db, testPlaces));
    it(`Unauthorized user receives 401 response`, () => {
      return supertest(app).post("/api/").send({}).expect(401);
    });
    it(`User revieces 200 response and adds an item to the inventory or something I guess`, () => {
      return supertest(app)
        .post("/api/")
        .set("Authorization", helpers.makeAuthHeader(testUsers[2]))
        .send({})
        .expect(200);
    });
  });
});
