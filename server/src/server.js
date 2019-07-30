const express = require('express');

async function starting({db, port}) {
  const app = express();

  app.use(express.static('app'));
  app.get('/', function (request, response) {
    response.sendFile(__dirname + '/app/index.html');
  });

  async function dreamsGetHandler(request, response, next) {
    try {
      const rowList = await db.query('select * from dream order by title');
      response.send(rowList);
    } catch (error) {
      response.status(500).send(error.message)
    }
  }
  app.get('/api/dreams', dreamsGetHandler);

  let server;
  await new Promise(resolve => {
    server = app.listen(port, resolve)
  });
  return server;
}

async function stopping({server}) {
  await new Promise(resolve => server.close(resolve));
}

module.exports = {
  starting,
  stopping
};
