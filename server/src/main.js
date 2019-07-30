require('dotenv').config();
const { connect } = require('./db');
const { starting } = require('./server');

const dbConnectionString = process.env.DATABASE;
const db = connect(dbConnectionString);

const port = 3001; // Note: must match port of the "proxy" URL in app/package.json

async function running() {
  await starting({db, port});
  console.log(`Server is listening on port ${port}`);
}

running();
