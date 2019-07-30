const pgp = require('pg-promise')();

function connect (dbConnectionString) {
  const db = pgp(dbConnectionString);
  return db;
}

function disconnect () {
  pgp.end();
}

module.exports = {
  connect,
  disconnect
};
