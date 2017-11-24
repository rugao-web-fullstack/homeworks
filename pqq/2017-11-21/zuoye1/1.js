const fs = require("fs");
const filename = '1.txt';
const ws = fs.createWriteStream(filename);
const rs = fs.createReadStream(filename);
const writeBuff = Buffer.alloc(22);
let readBuff = [];

writeBuff.writeUInt32BE(100, 0);
writeBuff.writeInt32BE(-100, 4);
writeBuff.writeUInt8(100, 8);
writeBuff.writeInt8(-100, 9);
writeBuff.writeFloatBE(33.22, 10);
writeBuff.writeDoubleBE(-32.2, 11);


ws.end(writeBuff, function () {
    console.log("文件写入完成！");
    rs.on("readable", function () {
        var data = rs.read();
        if(data){
            readBuff.push(data);
        }
    })

    rs.on("end", function () {
        readBuff = Buffer.concat(readBuff);
        console.log("从文件中读取出来的值为：");
        console.log("UInt32 = " +readBuff.readInt32BE(0));
        console.log("Int32 = " +readBuff.readInt32BE(4));
        console.log("UInt8 = " +readBuff.readUInt8(8));
        console.log("Int8 = " +readBuff.readInt8(9));
        console.log("Float = " +readBuff.readFloatBE(10));
        console.log("Double = " +readBuff.readDoubleBE(14));
    })
})