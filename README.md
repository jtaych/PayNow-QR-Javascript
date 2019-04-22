# PayNow QR Generator

This project will allow you to generate dynamic QR codes which are compatible with PayNow standards. There are two major steps in the creation of a PayNow QR Code

1. Generation of a string based on the relevant inputs
1. Encoding this string into a QR code

PayNow QR codes can be scanned using the banking application of any participating bank in Singapore (most of them). This generator will allow you to create these QR codes with information such as payment amount, destination account, and other bits of information required for reconciliation afterward (e.g. merchant name, additional comments) There are two files of note in this repo.

* PayNowCLI - Useful if you want a quick demo of what fields are relevant for the generation of a QR code, or if you want to generate a single QR code. 
* QRGenerator - Full set of code with the encoding logic for the QR code included 

If you're just looking for a simple function to generate your code, without having to mess around with the QRGenerator file, I've exposed the functionality as a package over at https://www.npmjs.com/package/paynow-generator and you can find more information about how to use it there.

Do note that some of the fields are hardcoded for Singapore, but I hardly see that as an issue in the short term. I've also hardcoded certain fields such as expiry date just for this initial run, and I'll get around to fixing that later.

The PayNow QR encoding format is governed by standards laid out by EMVCo - and you can find that documentation here as well.

## PayNowCLI

```
node QRGeneratorCLI.js
```
This should bring up a CLI information where you can navigate the fields required to generate a basic QR code step by step. It's a good way to get a sense of what goes into the QR code. Generated files can be found in the QR-Output folder as test.png. You can test them by scanning it with your preferred PayNow compatible QR code scanner.

This uses the QRGenerator file with a CLI built on top using the Inquirer package.

## PaynowGenerator Package

Usage details can be found over at https://www.npmjs.com/package/paynow-generator

This exposes the QR encoding as a single function, giving you plenty of flexibility to generate QR codes en masse, or whatever tickles your fancy. This package does not include the functionality of encoding the string into a QR code. If you're using this package I'd assume you'll want more control over the QR outputs anyway.

## PaynowGenerator

This file is really only useful if you'd like to understand the encoding process in detail and/or modify it to suit your needs. The QRGeneratorCLI file is build on top of this. If you'd just like to bake the string generation logic into your application, you can just use the packaged version.


