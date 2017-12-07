var debug = require('debug')('double');


const fs = require('fs');
const ws = fs.createWriteStream('double.txt');
const rs = fs.createReadStream('double.txt');

const buf = Buffer.allocUnsafe(8);

//---buf.writeDoubleBE
buf.writeDoubleBE(0xdeadbeefcafebabe, 0);
ws.write(buf);

//---buf.readDoubleBE
rs.on('data', function (data) {
  debug('log: '+buf.readDoubleBE(data));
});
