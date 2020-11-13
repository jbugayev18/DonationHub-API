const { expect } = require("chai");
const supertest = require("supertest");
const knex = require("knex");
const app = require("../src/app.js");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
process.env.NODE_ENV = "test";
global.expect = expect;
global.supertest = supertest;
const db = knex({ client: "pg", connection: process.env.TEST_DATABASE_URL });
app.set("db", db);
const sqlFile = (filePath) => {
  return fs.readFileSync(path.join(__dirname, filePath)).toString();
};
const migrations = [
  `../db.schema/001.do.initialize.sql`,
  `../db.schema/002.do.inventory.sql`,
  `../db.schema/003.do.pastdonations.sql`,
];
const undoMigrations = [
  `../db.schema/003.undo.pastdonations.sql`,
  `../db.schema/002.undo.inventory.sql`,
  `../db.schema/001.undo.all.sql`,
];
const seeds = [
  `../seeds/seed.inventory.sql`,
  `../seeds/seed.sites.sql`,
  `../seeds/seed.tables.sql`,
];

async function runSqlFiles(FilePathArray) {
  for (const path of FilePathArray) {
    await db.raw(sqlFile(path));
  }
}
// runSqlFiles(undoMigrations);
// runSqlFiles(migrations);
//runSqlFiles(seeds);
async function prepTestDB() {
  let undo = await runSqlFiles(undoMigrations);
  let migrate = await runSqlFiles(migrations);
  let seed = await runSqlFiles(seeds);

  console.log(db.raw(`SELECT * FROM "user"`));
}
prepTestDB();
