const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");
const { markAsUntransferable, isMainThread } = require("worker_threads");

describe("sites endpoint", function () {
  let db;

  const {
    testUsers,
    testSites,
    testRegistration,
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

  describe(`POST /api/sites`, () => {
    beforeEach("insert users", () => helpers.seedUser(db, testUsers));

    it(`Unauthorized user receives 401 response`, () => {
      return supertest(app).post("/api/").send({}).expect(401);
    });
    it(`User receives 200 response and adds user`, () => {
      return supertest(app)
        .post("api/")
        .set("Authorization", helpers.makeAuthHeader(testUsers[2]))
        .send({})
        .expect(200);
    });
  });
});
