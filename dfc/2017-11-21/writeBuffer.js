const fs = require("fs");
const ws = fs.createWriteStream('buffer.txt');
let d = Buffer.alloc(4);
d.writeInt32BE(1262682622,0);
ws.write(d);
console.log(d);
ws.end('');
ws.on('finish', () => {
    console.log('Writable finished');
});