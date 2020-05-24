const { expect } = require('chai');
require('isomorphic-fetch');
const { describe, it } = require('mocha');
const pgp = require('pg-promise')();

const { recordHttp } = require('../../test/setupPolly');

const env = require('../src/env.test.json');
const { starting, stopping } = require('./netlify');
const { resetting } = require('./setupTestData');

const dbConnectionString = env.DATABASE;
const port = 3011;

describe('server', function () {
  let db, netlifyProcess;
  let polly;

  before(async function () {
    this.timeout(15000);
    db = pgp(dbConnectionString);
    await resetting({db});
    netlifyProcess = await starting({port});
    polly = recordHttp('dream');
  });

  after(async function () {
    if (polly) await polly.stop();
    if (netlifyProcess) await stopping({netlifyProcess});
    pgp.end();
  });

  it('should fetch all dreams', async function () {
    const response = await fetch(`http://localhost:${port}/.netlify/functions/dreams`);
    expect(response.status).to.equal(200);
    const dreamList = await response.json();
    expect(dreamList).to.deep.equal([
      { title: 'Learn French', id: dreamList[0].id },
      { title: 'Visit Albania', id: dreamList[1].id }
    ]);
  });
});
