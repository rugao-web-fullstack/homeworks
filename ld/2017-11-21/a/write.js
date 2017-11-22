const fs = require("fs");

const ws = fs.createWriteStream('file.txt');

let buf = Buffer.alloc(4);

buf.writeUInt32BE(12341234);
console.log(buf);
ws.write(buf);

//console.log(buf.writeUInt32BE(12341234));
//console.log(buf.readUInt32BE());

ws.end("\n");
//若要实现finish必须写上end.
ws.on('finish', () => {
	console.log('All writes are now complete.');
})

