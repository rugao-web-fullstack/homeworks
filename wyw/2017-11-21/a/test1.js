//uint32
const buf = Buffer.allocUnsafe(8);
buf.writeUInt32BE(0x12345678,0)
console.log(buf);
const data = buf.readUInt32BE(0);
console.log(data.toString(16));

// //int32(-1, 1)
const buf = Buffer.allocUnsafe(8);
buf.writeInt32BE(0x12345678,0)
console.log(buf);
const data = buf.readInt32BE(0);
console.log(data.toString(16));

//uint8
const buf = Buffer.allocUnsafe(8);
buf.writeUInt8(0o123,0)
console.log(buf);
const data = buf.readUInt8(0);
console.log(data.toString(8));

//int8(-1, 1)
const buf = Buffer.allocUnsafe(8);
buf.writeInt8(0o123,0)
console.log(buf);
const data = buf.readInt8(0);
console.log(data.toString(8));

//float
const buf = Buffer.allocUnsafe(8);
buf.writeFloatBE(1.001,0)
console.log(buf);
const data = buf.readFloatBE(0);
console.log(data.toString(8));

//double
const buf = Buffer.allocUnsafe(8);
buf.writeDoubleBE(1.001,0)
console.log(buf);
const data = buf.readDoubleBE(0);
console.log(data.toString(8));