var debug = require('debug')('xxx');
const fs = require('fs');
const util = require('util');
debug('info'+util);

function Storage(filename) {
  this.filename = filename;
}

Storage.prototype.save = function (json, callback) {
  const ws = fs.createWriteStream(this.filename);
  debug('info'+json);
  // ws.write(util.inspect(json,{depth:null}));
  ws.write(JSON.stringify(json));
  ws.end();
  ws.on('finish', function () {
    callback(false);
  });
};

Storage.prototype.read = function (callback) {
  let data = [];
  const rs = fs.createReadStream(this.filename);
  rs.on('data', function (chunk) {
    data.push(chunk);
  });
  rs.on('end', function () {
    try {
      let maxLength = 0;
      for (let i = 0; i < data.length; i++) {
        maxLength += data[i].length;
        // debug("info"+"chunk" + data[i]);
      }
      // debug("info"+'data.length' + data.length);
      let str = String(Buffer.concat(data, maxLength));
      // debug("info"+"str = ");
      // debug("info"+str);
      // debug("info"+str.length);
      if (str.length) {
        let json = JSON.parse(str);
        callback(false, json);
      } else {
        callback(false, {});
      }
    } catch (e) {
      debug('info'+e);
      callback(e);
    }
  });
};

exports.Storage = Storage;