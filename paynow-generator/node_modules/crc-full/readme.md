# crc-full

![Support Node of LTS](https://img.shields.io/badge/node-LTS-brightgreen.svg?style=plastic) ![npm version](https://img.shields.io/badge/npm-3.5.0-brightgreen.svg?style=plastic) ![Build passing](https://img.shields.io/badge/build-passing-brightgreen.svg?style=plastic) ![dependencies typescript](https://img.shields.io/badge/dependencies-typescript-blue.svg?style=plastic) ![License mit](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic) 

---

# Description
The crc-full module is used to calculate any kind of CRC setting parameters such as length, polynomial and others. It's completely written in typescript for node js.

## How to use

Use is very simple. Just add the module to project.

> **Install dependencies:**  
> The only one dependency is typescript compiler
> ```sh
> npm install -g typescript
> ```

### Import in node js
After *typescript* is installed, simple run:
```sh
npm install crc-full
```

### Use in your project

First of all import the module in your project files, then create an instance of the class whith all parameters of the CRC algorithm you need.
After the instance is create you can compute the CRC of your data passing an array of byte or simply a buffer object.

For typescript use:
```ts
import {CRC} from 'crc-full'
...
let crc =  new CRC("CRC16", 16, 0x8005, 0x0000, 0x0000, false, false);
crc.compute([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
let computed_crc = crc.compute(Buffer.from("Hello world!","ascii"))
```
For javascript use:
```js
const CRC = require('crc-full').CRC;
var crc = new CRC("CRC16", 16, 0x8005, 0x0000, 0x0000, false, false);
crc.compute([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
var computed_crc = crc.compute(Buffer.from("Hello world!", "ascii"))
```

Where the parameters in the constructor are:
- Length: the Length of CRC in bit (8,16,32)
- Name: friendly name for the configuration
- Polinomial: the polinomial used to compute CRC
- InitialValue: initial value of CRC
- FinalXorValue: final value of CRC
- InputReflected: boolen that indicate if need to reflect input
- OutputReflected: boolen that indicate if need to reflect input

### Presets

Invoking the static getter *defaults* is possible to use the internal preconfigurated CRC algorithms. An array of instantiated object is returned back

The algorithms are:

| Length | Name | Polinomial | Initial value | Final value | Input reflected | Output reflected |
|:------:|------|:----------:|:-------------:|:-----------:|:---------------:|:----------------:|
|8|CRC8|0x07|0x00|0x00|false|false)|
|8|CRC8_SAE_J1850|0x1D|0xFF|0xFF|false|false)|
|8|CRC8_SAE_J1850_ZERO|0x1D|0x00|0x00|false|false)|
|8|CRC8_8H2F|0x2F|0xFF|0xFF|false|false)|
|8|CRC8_CDMA2000|0x9B|0xFF|0x00|false|false)|
|8|CRC8_DARC|0x39|0x00|0x00|true|true)|
|8|CRC8_DVB_S2|0xD5|0x00|0x00|false|false)|
|8|CRC8_EBU|0x1D|0xFF|0x00|true|true)|
|8|CRC8_ICODE|0x1D|0xFD|0x00|false|false)|
|8|CRC8_ITU|0x07|0x00|0x55|false|false|
|8|CRC8_MAXIM|0x31|0x00|0x00|true|true|
|8|CRC8_ROHC|0x07|0xFF|0x00|true|true|
|8|CRC8_WCDMA|0x9B|0x00|0x00|true|true|
|16|CRC16_CCIT_ZERO|0x1021|0x0000|0x0000|false|false|
|16|CRC16_ARC|0x8005|0x0000|0x0000|true|true|
|16|CRC16_AUG_CCITT|0x1021|0x1D0F|0x0000|false|false|
|16|CRC16_BUYPASS|0x8005|0x0000|0x0000|false|false|
|16|CRC16_CCITT_FALSE|0x1021|0xFFFF|0x0000|false|false|
|16|CRC16_CDMA2000|0xC867|0xFFFF|0x0000|false|false|
|16|CRC16_DDS_110|0x8005|0x800D|0x0000|false|false|
|16|CRC16_DECT_R|0x0589|0x0000|0x0001|false|false|
|16|CRC16_DECT_X|0x0589|0x0000|0x0000|false|false|
|16|CRC16_DNP|0x3D65|0x0000|0xFFFF|true|true|
|16|CRC16_EN_13757|0x3D65|0x0000|0xFFFF|false|false|
|16|CRC16_GENIBUS|0x1021|0xFFFF|0xFFFF|false|false|
|16|CRC16_MAXIM|0x8005|0x0000|0xFFFF|true|true|
|16|CRC16_MCRF4XX|0x1021|0xFFFF|0x0000|true|true|
|16|CRC16_RIELLO|0x1021|0xB2AA|0x0000|true|true|
|16|CRC16_T10_DIF|0x8BB7|0x0000|0x0000|false|false|
|16|CRC16_TELEDISK|0xA097|0x0000|0x0000|false|false|
|16|CRC16_TMS37157|0x1021|0x89EC|0x0000|true|true|
|16|CRC16_USB|0x8005|0xFFFF|0xFFFF|true|true|
|16|CRC16_A|0x1021|0xC6C6|0x0000|true|true|
|16|CRC16_KERMIT|0x1021|0x0000|0x0000|true|true|
|16|CRC16_MODBUS|0x8005|0xFFFF|0x0000|true|true|
|16|CRC16_X_25|0x1021|0xFFFF|0xFFFF|true|true|
|16|CRC16_XMODEM|0x1021|0x0000|0x0000|false|false|
|32|CRC32|0x04C11DB7|0xFFFFFFFF|0xFFFFFFFF|true|true|
|32|CRC32_BZIP2|0x04C11DB7|0xFFFFFFFF|0xFFFFFFFF|false|false|
|32|CRC32_C|0x1EDC6F41|0xFFFFFFFF|0xFFFFFFFF|true|true|
|32|CRC32_D|0xA833982B|0xFFFFFFFF|0xFFFFFFFF|true|true|
|32|CRC32_MPEG2|0x04C11DB7|0xFFFFFFFF|0x00000000|false|false|
|32|CRC32_POSIX|0x04C11DB7|0x00000000|0xFFFFFFFF|false|false|
|32|CRC32_Q|0x814141AB|0x00000000|0x00000000|false|false|
|32|CRC32_JAMCRC|0x04C11DB7|0xFFFFFFFF|0x00000000|true|true|
|32|CRC32_XFER|0x000000AF|0x00000000|0x00000000|false|false|

Is possible to use one of above CRC preset using the method default(name) where parameter _name_ is the name of chosen preset.

Typescript users can use:

```ts
import {CRC} from 'crc-full'
let crc = CRC.default("CRC16_CCIT_ZERO");
let computed_crc = crc.compute(Buffer.from("Hello world!","ascii"))
```
Typescript users can use:

```ts
const CRC = require('crc-full').CRC;
var crc = CRC.default("CRC16_CCIT_ZERO");
var computed_crc = crc.compute(Buffer.from("Hello world!","ascii"))
```

### Advanced

The module also support advanced methods to calculate CRC tables and export them as byte arrays:

```js
...
crc.makeCrcTable();
crc.makeCrcTableReversed();
var table = crc.table;
...
```

### Notes

The method `compute` take a byte array (or Buffer) as input and returns a number.  
If you need to convert a string you have to pass it as a byte array.  
If you need to read the CRC result in hex format string use `.toString(16)`