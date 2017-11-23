const fs = require("fs");
const rs = fs.createReadStream('buffer.txt');
let b;
let bb;
rs.on('readable', () => {
    b = rs.read();
    if(b){
        bb = b.readInt32BE();
        console.log(bb);
    }
});
rs.on('end', () => {
    console.log('on readable end');
});