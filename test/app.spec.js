const app = require("../src/app");
const supertest = require("supertest");


describe("app", () => {
  it('GET / responds with 200 containing "Hello, World"', () => {
    return supertest(app).get("/").expect(200, "Hello, World");
  });
});
