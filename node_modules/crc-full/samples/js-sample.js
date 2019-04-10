const CRC = require('crc-full').CRC;

var crc = new CRC("CRC16", 16, 0x8005, 0x0000, 0x0000, false, false);

var computed_crc = crc.compute(Buffer.from("Hello world!", "ascii"))

console.log("Hello wolrd!: ", computed_crc);