const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.skip("Auth Endpoints", function () {
  // const { testUsers } = helpers.makeDonationFixtures();
  // const testUser = testUsers[0];

  const db = app.get("db");

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

  // it(`responds 400 'invalid username or password' when bad username`, () => {
  //   const userInvalidUser = { username: "user-not", password: "existy" };
  //   return supertest(app)
  //     .post("/api/auth/login")
  //     .send(userInvalidUser)
  //     .expect(400, { error: `Incorrect username or password` });
  // });

  // it(`responds 400 'invalid username or password' when bad password`, () => {
  //   const userInvalidPassword = {
  //     username: testUser.username,
  //     password: "incorrect",
  //   };
  //   return supertest(app)
  //     .post("/api/auth/login")
  //     .send(userInvalidPassword)
  //     .expect(400, { error: `Incorrect username or password` });
  // });

  // it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
  //   const userValidCredentials = {
  //     username: testUser.username,
  //     password: testUser.password,
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

// describe(`POST /api/auth/refresh`, () => {
//   //beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

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
//       .post("/api/auth/refresh")
//       .set("Authorization", //helpers.makeAuthHeader(testUser))
//       .expect(200, {
//         authToken: expectedToken,
//       });
//   });
// });
