const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Auth Endpoints", function () {
  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  before("make knext instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());
  before("cleanup", () => helpers.cleanTables(db));
  afterEach("cleanup", () => helpers.cleanTables(db));
  beforeEach("insert users", () => helpers.seedUser(db, testUsers));

  const requiredFields = ["username", "password"];

  requiredFields.forEach((field) => {
    const loginAttemptBody = {
      username: "admin",
      password: "password",
    };

    it(`responds with 400 required error when '${field}' is missing`, () => {
      delete loginAttemptBody[field];

      return supertest(app)
        .post("/api/auth/token")
        .send(loginAttemptBody)
        .expect(400, {
          error: `Missing '${field}' in request body`,
        });
    });
  });

  it(`responds 400 'invalid username or password' when bad username`, () => {
    const userInvalidUser = { username: "user-not", password: "existy" };
    return supertest(app)
      .post("/api/auth/token")
      .send(userInvalidUser)
      .expect(400, { error: `Incorrect username or password` });
  });

  it(`responds 400 'invalid username or password' when bad password`, () => {
    const userInvalidPassword = {
      username: testUser.username,
      label: "incorrect",
    };
    return supertest(app)
      .post("/api/auth/token")
      .send(userInvalidPassword)
      .expect(400, { error: `Missing 'password' in request body` });
  });

  // it.skip(`responds 200 and JWT auth token using secret when valid credentials`, () => {
  //   const userValidCredentials = {
  //     username: testUser.username,
  //     label: testUser.label,
  //   };
  //   const expectedToken = jwt.sign(
  //     { user_id: testUser.id },
  //     process.env.JWT_SECRET,
  //     {
  //       subject: testUser.username,
  //       algorithm: "HS256",
  //     }
  //   );
  //   return supertest(app)
  //     .post("/api/auth/token")
  //     .send(userValidCredentials)
  //     .expect(200, {
  //       authToken: expectedToken,
  //     });
  // });
});

// describe.skip(`POST /api/auth/token`, () => {
//   const testUsers = helpers.makeRegistrationArray();

//   const testUser = testUsers[0];

//   before("make knext instance", () => {
//     db = knex({
//       client: "pg",
//       connection: process.env.TEST_DATABASE_URL,
//     });
//     app.set("db", db);
//   });
//   after("disconnect from db", () => db.destroy());
//   before("cleanup", () => helpers.cleanTables(db));
//   afterEach("cleanup", () => helpers.cleanTables(db));
//   beforeEach("insert users", () => helpers.seedUser(db, testUsers));

//   it(`responds 200 and JWT auth token using secret`, () => {
//     const expectedToken = jwt.sign(
//       { user_id: testUser.id },
//       process.env.JWT_SECRET,
//       {
//         subject: testUser.username,
//         algorithm: "HS256",
//       }
//     );
//     return supertest(app)
//       .put("/api/auth/token")
//       .set("Authorization", helpers.makeAuthHeader(testUser)) //helpers.makeAuthHeader(testUser))
//       .expect(200, {
//         authToken: expectedToken,
//       });
//   });
// });
