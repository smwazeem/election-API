const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "wazeem",
  port: 5432,
  password: "Nusha@007",
  database: "election",
});

module.exports = client;
