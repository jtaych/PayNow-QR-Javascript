"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crcUtil_1 = require("./crcUtil");
var CRC = (function () {
    function CRC(name, width, polynomial, initial, finalXor, inputReflected, resultReflected) {
        this.width = width;
        this.name = name;
        this.polynomial = polynomial;
        this.initial = initial;
        this.finalXor = finalXor;
        this.inputReflected = inputReflected;
        this.resultReflected = resultReflected;
    }
    Object.defineProperty(CRC.prototype, "width", {
        get: function () { return this._width; },
        set: function (v) {
            this._width = v;
            switch (v) {
                case 8:
                    this._castMask = 0xFF;
                    break;
                case 16:
                    this._castMask = 0xFFFF;
                    break;
                case 32:
                    this._castMask = 0xFFFFFFFF;
                    break;
                default:
                    throw "Invalid CRC width";
            }
            this._msbMask = 0x01 << (v - 1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "name", {
        get: function () { return this._name; },
        set: function (v) {
            this._name = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "polynomial", {
        get: function () { return this._polynomial; },
        set: function (v) {
            this._polynomial = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "initial", {
        get: function () { return this._initialVal; },
        set: function (v) {
            this._initialVal = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "finalXor", {
        get: function () { return this._finalXorVal; },
        set: function (v) {
            this._finalXorVal = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "inputReflected", {
        get: function () { return this._inputReflected; },
        set: function (v) {
            this._inputReflected = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC.prototype, "resultReflected", {
        get: function () { return this._resultReflected; },
        set: function (v) {
            this._resultReflected = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CRC, "defaults", {
        get: function () {
            if (!this._list) {
                this._list = [
                    new CRC("CRC8", 8, 0x07, 0x00, 0x00, false, false),
                    new CRC("CRC8_SAE_J1850", 8, 0x1D, 0xFF, 0xFF, false, false),
                    new CRC("CRC8_SAE_J1850_ZERO", 8, 0x1D, 0x00, 0x00, false, false),
                    new CRC("CRC8_8H2F", 8, 0x2F, 0xFF, 0xFF, false, false),
                    new CRC("CRC8_CDMA2000", 8, 0x9B, 0xFF, 0x00, false, false),
                    new CRC("CRC8_DARC", 8, 0x39, 0x00, 0x00, true, true),
                    new CRC("CRC8_DVB_S2", 8, 0xD5, 0x00, 0x00, false, false),
                    new CRC("CRC8_EBU", 8, 0x1D, 0xFF, 0x00, true, true),
                    new CRC("CRC8_ICODE", 8, 0x1D, 0xFD, 0x00, false, false),
                    new CRC("CRC8_ITU", 8, 0x07, 0x00, 0x55, false, false),
                    new CRC("CRC8_MAXIM", 8, 0x31, 0x00, 0x00, true, true),
                    new CRC("CRC8_ROHC", 8, 0x07, 0xFF, 0x00, true, true),
                    new CRC("CRC8_WCDMA", 8, 0x9B, 0x00, 0x00, true, true),
                    new CRC("CRC16_CCIT_ZERO", 16, 0x1021, 0x0000, 0x0000, false, false),
                    new CRC("CRC16_ARC", 16, 0x8005, 0x0000, 0x0000, true, true),
                    new CRC("CRC16_AUG_CCITT", 16, 0x1021, 0x1D0F, 0x0000, false, false),
                    new CRC("CRC16_BUYPASS", 16, 0x8005, 0x0000, 0x0000, false, false),
                    new CRC("CRC16_CCITT_FALSE", 16, 0x1021, 0xFFFF, 0x0000, false, false),
                    new CRC("CRC16_CDMA2000", 16, 0xC867, 0xFFFF, 0x0000, false, false),
                    new CRC("CRC16_DDS_110", 16, 0x8005, 0x800D, 0x0000, false, false),
                    new CRC("CRC16_DECT_R", 16, 0x0589, 0x0000, 0x0001, false, false),
                    new CRC("CRC16_DECT_X", 16, 0x0589, 0x0000, 0x0000, false, false),
                    new CRC("CRC16_DNP", 16, 0x3D65, 0x0000, 0xFFFF, true, true),
                    new CRC("CRC16_EN_13757", 16, 0x3D65, 0x0000, 0xFFFF, false, false),
                    new CRC("CRC16_GENIBUS", 16, 0x1021, 0xFFFF, 0xFFFF, false, false),
                    new CRC("CRC16_MAXIM", 16, 0x8005, 0x0000, 0xFFFF, true, true),
                    new CRC("CRC16_MCRF4XX", 16, 0x1021, 0xFFFF, 0x0000, true, true),
                    new CRC("CRC16_RIELLO", 16, 0x1021, 0xB2AA, 0x0000, true, true),
                    new CRC("CRC16_T10_DIF", 16, 0x8BB7, 0x0000, 0x0000, false, false),
                    new CRC("CRC16_TELEDISK", 16, 0xA097, 0x0000, 0x0000, false, false),
                    new CRC("CRC16_TMS37157", 16, 0x1021, 0x89EC, 0x0000, true, true),
                    new CRC("CRC16_USB", 16, 0x8005, 0xFFFF, 0xFFFF, true, true),
                    new CRC("CRC16_A", 16, 0x1021, 0xC6C6, 0x0000, true, true),
                    new CRC("CRC16_KERMIT", 16, 0x1021, 0x0000, 0x0000, true, true),
                    new CRC("CRC16_MODBUS", 16, 0x8005, 0xFFFF, 0x0000, true, true),
                    new CRC("CRC16_X_25", 16, 0x1021, 0xFFFF, 0xFFFF, true, true),
                    new CRC("CRC16_XMODEM", 16, 0x1021, 0x0000, 0x0000, false, false),
                    new CRC("CRC32", 32, 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF, true, true),
                    new CRC("CRC32_BZIP2", 32, 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF, false, false),
                    new CRC("CRC32_C", 32, 0x1EDC6F41, 0xFFFFFFFF, 0xFFFFFFFF, true, true),
                    new CRC("CRC32_D", 32, 0xA833982B, 0xFFFFFFFF, 0xFFFFFFFF, true, true),
                    new CRC("CRC32_MPEG2", 32, 0x04C11DB7, 0xFFFFFFFF, 0x00000000, false, false),
                    new CRC("CRC32_POSIX", 32, 0x04C11DB7, 0x00000000, 0xFFFFFFFF, false, false),
                    new CRC("CRC32_Q", 32, 0x814141AB, 0x00000000, 0x00000000, false, false),
                    new CRC("CRC32_JAMCRC", 32, 0x04C11DB7, 0xFFFFFFFF, 0x00000000, true, true),
                    new CRC("CRC32_XFER", 32, 0x000000AF, 0x00000000, 0x00000000, false, false)
                ];
            }
            return this._list;
        },
        enumerable: true,
        configurable: true
    });
    CRC.prototype.makeCrcTable = function () {
        this._crcTable = new Array(256);
        for (var divident = 0; divident < 256; divident++) {
            var currByte = (divident << (this._width - 8)) & this._castMask;
            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                }
                else {
                    currByte <<= 1;
                }
            }
            this._crcTable[divident] = (currByte & this._castMask);
        }
    };
    CRC.prototype.makeCrcTableReversed = function () {
        this._crcTable = new Array(256);
        for (var divident = 0; divident < 256; divident++) {
            var reflectedDivident = crcUtil_1.default.Reflect8(divident);
            var currByte = (reflectedDivident << (this._width - 8)) & this._castMask;
            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                }
                else {
                    currByte <<= 1;
                }
            }
            currByte = crcUtil_1.default.ReflectGeneric(currByte, this.width);
            this._crcTable[divident] = (currByte & this._castMask);
        }
    };
    CRC.prototype.compute = function (bytes) {
        if (!this._crcTable)
            this.makeCrcTable();
        var crc = this._initialVal;
        for (var i = 0; i < bytes.length; i++) {
            var curByte = bytes[i] & 0xFF;
            if (this.inputReflected) {
                curByte = crcUtil_1.default.Reflect8(curByte);
            }
            crc = (crc ^ (curByte << (this._width - 8))) & this._castMask;
            var pos = (crc >> (this.width - 8)) & 0xFF;
            crc = (crc << 8) & this._castMask;
            crc = (crc ^ this._crcTable[pos]) & this._castMask;
        }
        if (this.resultReflected) {
            crc = crcUtil_1.default.ReflectGeneric(crc, this.width);
        }
        return ((crc ^ this._finalXorVal) & this._castMask);
    };
    CRC.prototype.computeBuffer = function (bytes) {
        var val = this.compute(bytes);
        if (this.width === 8) {
            return Buffer.from([val]);
        }
        else if (this.width === 16) {
            var b = Buffer.alloc(2);
            b.writeUInt16BE(val, 0);
            return b;
        }
        else if (this.width === 32) {
            var b = Buffer.alloc(4);
            b.writeUInt32BE(val, 0);
            return b;
        }
        else {
            throw new Error("Unsupported length");
        }
    };
    Object.defineProperty(CRC.prototype, "table", {
        get: function () {
            return this._crcTable;
        },
        enumerable: true,
        configurable: true
    });
    CRC.default = function (name) {
        return CRC
            .defaults
            .find(function (o) { return o.name === name; });
    };
    return CRC;
}());
exports.CRC = CRC;
//# sourceMappingURL=crc.js.map