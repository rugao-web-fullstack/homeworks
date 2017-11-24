//uint32
const buf1 = Buffer.allocUnsafe(8);
buf1.writeUInt32BE(0x12345678,0)
console.log(buf1);
const data1 = buf1.readUInt32BE(0);
console.log(data1.toString(16));

// //int32(-1, 1)
const buf2 = Buffer.allocUnsafe(8);
buf2.writeInt32BE(0x12345678,0)
console.log(buf2);
const data2 = buf2.readInt32BE(0);
console.log(data2.toString(16));

//uint8
const buf3 = Buffer.allocUnsafe(8);
buf3.writeUInt8(0o123,0)
console.log(buf3);
const data3 = buf3.readUInt8(0);
console.log(data3.toString(8));

//int8(-1, 1)
const buf4 = Buffer.allocUnsafe(8);
buf4.writeInt8(0o123,0)
console.log(buf4);
const data4 = buf4.readInt8(0);
console.log(data4.toString(8));

//float
const buf5 = Buffer.allocUnsafe(8);
buf5.writeFloatBE(1.001,0)
console.log(buf5);
const data5 = buf5.readFloatBE(0);
console.log(data5.toString(8));

//double
const buf6 = Buffer.allocUnsafe(8);
buf6.writeDoubleBE(1.001,0)
console.log(buf6);
const data6 = buf6.readDoubleBE(0);
console.log(data6.toString(8));