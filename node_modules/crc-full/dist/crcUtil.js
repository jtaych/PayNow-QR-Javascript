"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CrcUtil = (function () {
    function CrcUtil() {
    }
    CrcUtil.Reflect8 = function (val) {
        var resByte = 0;
        for (var i = 0; i < 8; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= ((1 << (7 - i)) & 0xFF);
            }
        }
        return resByte;
    };
    CrcUtil.Reflect16 = function (val) {
        var resByte = 0;
        for (var i = 0; i < 16; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= ((1 << (15 - i)) & 0xFFFF);
            }
        }
        return resByte;
    };
    CrcUtil.Reflect32 = function (val) {
        var resByte = 0;
        for (var i = 0; i < 32; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= ((1 << (31 - i)) & 0xFFFFFFFF);
            }
        }
        return resByte;
    };
    CrcUtil.ReflectGeneric = function (val, width) {
        var resByte = 0;
        for (var i = 0; i < width; i++) {
            if ((val & (1 << i)) != 0) {
                resByte |= (1 << ((width - 1) - i));
            }
        }
        return resByte;
    };
    return CrcUtil;
}());
exports.default = CrcUtil;
//# sourceMappingURL=crcUtil.js.map