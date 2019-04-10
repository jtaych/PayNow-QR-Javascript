import CrcUtil from './crcUtil';

export class CRC {

    private _width: number;
    private _name: string;
    private _polynomial: number;
    private _initialVal: number;
    private _finalXorVal: number;
    private _inputReflected: boolean;
    private _resultReflected: boolean;
    private static _list: CRC[];

    private _crcTable: number[];
    private _castMask: number;
    private _msbMask: number

    public get width(): number { return this._width; }
    public set width(v: number) {
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
        this._msbMask = 0x01 << (v - 1)
    }

    public get name(): string { return this._name; }
    public set name(v: string) {
        this._name = v;
    }

    public get polynomial(): number { return this._polynomial; }
    public set polynomial(v: number) {
        this._polynomial = v;
    }

    public get initial(): number { return this._initialVal; }
    public set initial(v: number) {
        this._initialVal = v;
    }

    public get finalXor(): number { return this._finalXorVal; }
    public set finalXor(v: number) {
        this._finalXorVal = v;
    }

    public get inputReflected(): boolean { return this._inputReflected; }
    public set inputReflected(v: boolean) {
        this._inputReflected = v;
    }

    public get resultReflected(): boolean { return this._resultReflected; }
    public set resultReflected(v: boolean) {
        this._resultReflected = v;
    }

    constructor(name: string, width: number, polynomial: number, initial: number, finalXor: number, inputReflected: boolean, resultReflected: boolean) {
        this.width = width;
        this.name = name;
        this.polynomial = polynomial;
        this.initial = initial;
        this.finalXor = finalXor;
        this.inputReflected = inputReflected;
        this.resultReflected = resultReflected;
    }

    public static get defaults(): CRC[] {
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
            ]
        }
        return this._list;
    }

    public makeCrcTable() {
        this._crcTable = new Array(256);

        for (var divident = 0; divident < 256; divident++) {
            var currByte = (divident << (this._width - 8)) & this._castMask;
            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                } else {
                    currByte <<= 1;
                }
            }
            this._crcTable[divident] = (currByte & this._castMask);
        }
    }

    public makeCrcTableReversed() {
        this._crcTable = new Array(256);

        for (var divident = 0; divident < 256; divident++) {
            var reflectedDivident = CrcUtil.Reflect8(divident);

            var currByte = (reflectedDivident << (this._width - 8)) & this._castMask;

            for (var bit = 0; bit < 8; bit++) {
                if ((currByte & this._msbMask) != 0) {
                    currByte <<= 1;
                    currByte ^= this._polynomial;
                } else {
                    currByte <<= 1;
                }
            }

            currByte = CrcUtil.ReflectGeneric(currByte, this.width);

            this._crcTable[divident] = (currByte & this._castMask);
        }
    }

    public compute(bytes: number[] | Buffer) {
        if (!this._crcTable)
            this.makeCrcTable();
        var crc = this._initialVal;
        for (var i = 0; i < bytes.length; i++) {

            var curByte = bytes[i] & 0xFF;

            if (this.inputReflected) {
                curByte = CrcUtil.Reflect8(curByte);
            }

            /* update the MSB of crc value with next input byte */
            crc = (crc ^ (curByte << (this._width - 8))) & this._castMask;
            /* this MSB byte value is the index into the lookup table */
            var pos = (crc >> (this.width - 8)) & 0xFF;
            /* shift out this index */
            crc = (crc << 8) & this._castMask;
            /* XOR-in remainder from lookup table using the calculated index */
            crc = (crc ^ this._crcTable[pos]) & this._castMask;
        }

        if (this.resultReflected) {
            crc = CrcUtil.ReflectGeneric(crc, this.width);
        }
        return ((crc ^ this._finalXorVal) & this._castMask);
    }

    public computeBuffer(bytes: number[] | Buffer) {
        let val = this.compute(bytes);
        if (this.width === 8) {
            return Buffer.from([val])
        } else if (this.width === 16) {
            let b = Buffer.alloc(2);
            b.writeUInt16BE(val, 0);
            return b;
        } else if (this.width === 32) {
            let b = Buffer.alloc(4);
            b.writeUInt32BE(val, 0);
            return b;
        } else {
            throw new Error("Unsupported length");
        }
    }

    public get table() {
        return this._crcTable;
    }

    public static default(name: string): CRC | undefined {
        return CRC
            .defaults
            .find((o: CRC): boolean => o.name === name);
    }
}