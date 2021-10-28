const fs = require('fs');
const maxApi = require('max-api');

let stream;

const handlers = {
  serial_port: PORT => {
    maxApi.post('got serial_port');
    startFileStream(PORT);
  },
};

maxApi.addHandlers(handlers);

function startFileStream(PORT) {
  stream = fs.createReadStream(PORT);

  stream.on('data', data => {
    let chunk = data.toString();
    maxApi.outlet(chunk);
  });
}
