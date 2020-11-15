const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");
const { expect } = require("chai");
describe("sites endpoint", function () {
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
  describe(`GET /api/sites`, () => {
    beforeEach("insert users", () => helpers.seedUser(db, testUsers));
    beforeEach("insert sites", () => helpers.seedSites(db, testSites));
    it(`Given there is a site in the database with lat 20 and lon 20, return site `, () => {
      let newSite = {
        id: 3,
        lat: 20,
        lon: 20,
        label: "Donation Shelter",
        address: "1111 Donation Drive",
        description: "A donation location",
        formatted_phone_number: "123-456-7890",
        place_id: "Ldifnaopferin",
        url: "https://donate.com",
        website: "donate.com",
      };
      return supertest(app)
        .get("/api/sites?rect=20,20,20,20")
        .expect(200, [newSite]);
    });
  });
  describe(`POST /api/sites`, () => {
    beforeEach("insert users", () => helpers.seedUser(db, testUsers));
    beforeEach("insert sites", () => helpers.seedSites(db, testSites));
    it(`Unauthorized user receives 401 response`, () => {
      return supertest(app).post("/api/sites").send({}).expect(401);
    });
    it(`If site already exists, User receives 400 and gets error message`, () => {
      let newSite = {
        id: 3,
        lat: 20,
        lon: 20,
        label: "Donation Shelter",
        address: "1111 Donation Drive",
        description: "A donation location",
        formatted_phone_number: "123-456-7890",
        place_id: "Ldifnaopferin",
        url: "https://donate.com",
        website: "donate.com",
      };
      return supertest(app)
        .post("/api/sites")
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send(newSite)
        .expect(400)
        .expect((res) => {
          expect(res.body.error).to.eql(
            "We already have records of this location, duplicate entries are not allowed."
          );
        });
    });
    it(`If site doesn't exist, User receives 200 response and creates site`, () => {
      let newSite = {
        id: 2,
        lat: 10,
        lon: 10,
        label: "Another Donation Shelter",
        address: "2222 Donation Ae",
        description: "A donation location",
        formatted_phone_number: "456-123-7890",
        place_id: "Ldifnaopferin123",
        url: "https://donate.com/now",
        website: "donate.com",
      };
      return supertest(app)
        .post("/api/sites")
        .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
        .send(newSite)
        .expect(201);
    });
  });
});
