const fs = require("fs");

const rs = fs.createReadStream('file.txt');

rs.on("data", (chunk) => {
	console.log(chunk.readUInt32BE());
	
});

