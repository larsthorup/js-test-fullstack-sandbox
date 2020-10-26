const env =
  process.env.NODE_ENV === 'test'
    ? require('../env.test.json')
    : require('../env.json');
const pgp = require('pg-promise')();
module.exports = pgp(env.DATABASE);
