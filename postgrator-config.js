require("dotenv").config();

const { NODE_ENV, DATABASE_URL, TEST_DATABASE_URL } = process.env;

const connectionString = NODE_ENV === "test" ? TEST_DATABASE_URL : DATABASE_URL;

if (!connectionString || !connectionString.startsWith("postgres"))
  throw Error("Database not specified in current environment");

module.exports = {
  migrationDirectory: "db.schema",
  driver: "pg",
  connectionString,
};
