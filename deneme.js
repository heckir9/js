const { spawn } = require('child_process');

const pythonServer = spawn('python', ['-m', 'http.server', '7482']);

const sshTunnel = spawn('ssh', ['-R', '80:localhost:7482', 'serveo.net']);

var flag = true

sshTunnel.stdout.on('data', (data) => {

  if (flag) {

  console.log(data.toString().split("//")[1].split(".")[0]);

  } flag = false

});
