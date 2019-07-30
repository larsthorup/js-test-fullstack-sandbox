require('dotenv').config({path: '.env.test'});
const { expect } = require('chai');
require('isomorphic-fetch');
const { describe, it } = require('mocha');

const { recordHttp } = require('../../test/setupPolly');

const { connect, disconnect } = require('./db');
const { starting, stopping } = require('./server');
const { resetting } = require('./setupTestData');

const dbConnectionString = process.env.DATABASE;
const port = 3011;

describe('server', function () {
  let db, server;
  let polly;

  before(async function () {
    db = connect(dbConnectionString);
    await resetting({db});
    server = await starting({db, port});
    polly = recordHttp('dream');
  });

  after(async function () {
    if (polly) await polly.stop();
    if (server) await stopping({server});
    disconnect();
  });

  it('should fetch all dreams', async function () {
    const response = await fetch(`http://localhost:${port}/api/dreams`);
    expect(response.status).to.equal(200);
    const dreamList = await response.json();
    expect(dreamList).to.deep.equal([
      { title: 'Learn French', id: dreamList[0].id },
      { title: 'Visit Albania', id: dreamList[1].id }
    ]);
  });
});
