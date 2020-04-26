const { spawn } = require('child_process');
const kill = require('tree-kill');

async function starting({port}) {
  netlifyProcess = spawn(`netlify dev --port ${port} --targetPort ${port - 1}`, {
    env: {
      ...process.env,
      NODE_ENV: 'test'
    },
    shell: true,
    stdio: 'inherit'
  });
  await new Promise(resolve => setTimeout(resolve, 10000)); // Note: wait for server to start
  return netlifyProcess;
}

async function stopping({netlifyProcess}) {
  kill(netlifyProcess.pid);
}

module.exports = {
  starting,
  stopping
};
