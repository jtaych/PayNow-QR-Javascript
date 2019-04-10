/// <reference types="node" />
export declare class CRC {
    private _width;
    private _name;
    private _polynomial;
    private _initialVal;
    private _finalXorVal;
    private _inputReflected;
    private _resultReflected;
    private static _list;
    private _crcTable;
    private _castMask;
    private _msbMask;
    width: number;
    name: string;
    polynomial: number;
    initial: number;
    finalXor: number;
    inputReflected: boolean;
    resultReflected: boolean;
    constructor(name: string, width: number, polynomial: number, initial: number, finalXor: number, inputReflected: boolean, resultReflected: boolean);
    static readonly defaults: CRC[];
    makeCrcTable(): void;
    makeCrcTableReversed(): void;
    compute(bytes: number[] | Buffer): number;
    computeBuffer(bytes: number[] | Buffer): Buffer;
    readonly table: number[];
    static default(name: string): CRC | undefined;
}
