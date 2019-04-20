# PayNow Generator

The PayNow Generator will create a PayNow compatible string containing payment information. This string is then encoded into a QR code to create a PayNow compatible QR code which can be scanned using the mobile banking app of any participating bank in Singapore. 

You will need to ensure that the PayNow alias/proxy (phone number or UEN) has been linked to a bank account for this to work.

## Installation

Use npm to install foobar.

```
npm install paynow-generator
```

## Usage

```Javascript
const paynow = require('paynow-generator').paynowGenerator

let payNowString = paynow('proxyType','proxyValue','edit',price,'merchantName','additionalComments')

```

## Fields

* proxyType: 'mobile' or 'UEN'
* proxyValue: 8 digit Singapore phone number or company UEN
* edit: 'yes' or 'no' - Defined whether the price value can be edited by the user
* price: number input - sets the value of the payment request
* merchantName (Optional) : Defines the merchant name (returns NA if blank)
* additionalComments(Optional) : Additional data field typically used to generate strings used for reconciliation purposes

## License
[MIT](https://choosealicense.com/licenses/mit/)