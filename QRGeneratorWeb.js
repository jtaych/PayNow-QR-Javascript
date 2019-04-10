var QRCode = require('qrcode');
const CRC = require('crc-full').CRC;
var crc = CRC.default("CRC16_CCITT_FALSE");

//Generic Payload (Non-Merchant)

var payload = {
    preamble: "0002010102112650",
    globallyUniqueIdentifier: "0009SG.PAYNOW",
    proxyTypeCode: function (proxyType) {
        if(proxyType === "UEN") {
            return "0101"+ "2"
        } else {
            return "0101" + "0"
        }
    },
    proxyValueCode: function (proxyValue) {
        if (proxyValue.length < 10) {
            var proxyOutput = "0" + proxyValue.length
        } else {
            var proxyOutput = proxyValue.length
        }
        return "02" + proxyOutput + proxyValue
    },
    transactionAmountEdit: function(edit) {
        if(edit === "yes") {
            return "0301" + "1"
        } else {
            return "0301" + "0"
        }
    },
    expiryDateCode: "04"+"08"+"99991231",
    merchantCategoryCode: "52"+"04"+"0000",
    transactionCurrency: "53"+"03"+"702",
    transactionAmount: function (price) {
        if (price.length < 10) {
            return "54"+ "0" + price.length + price
        } else {
            return "54"+ price.length + price
        }
    },
    countryCode: "58"+"02"+"SG",
    merchantNameCode: function(merchantName) {
        if(merchantName == "") {
            return "59"+"02"+"NA"
        } else if (merchantName.length >= 10) {
            return "59" + merchantName.length + merchantName
        } else {
            return "59" + "0" + merchantName.length + merchantName
        }
    },
    merchantCity: "60" + "09" +"Singapore",
    checksumCode: "63" + "04"
};

//need to calculate CRC, check page 26 of EMVCO specifications

function generateString (proxyType,proxyValue,edit,price,merchantName) {
    return payload.preamble + 
    payload.globallyUniqueIdentifier + 
    payload.proxyTypeCode(proxyType) + 
    payload.proxyValueCode(proxyValue) + 
    payload.transactionAmountEdit(edit) + 
    payload.expiryDateCode +
    payload.merchantCategoryCode +
    payload.transactionCurrency +
    payload.transactionAmount(price) +
    payload.countryCode +
    payload.merchantNameCode(merchantName) +
    payload.merchantCity +
    payload.checksumCode
};

/*function noPrice (proxyType,proxyValue,edit,merchantName) {
    return payload.preamble + 
    payload.globallyUniqueIdentifier + 
    payload.proxyTypeCode(proxyType) + 
    payload.proxyValueCode(proxyValue) + 
    payload.transactionAmountEdit(edit) + 
    payload.expiryDateCode +
    payload.merchantCategoryCode +
    payload.transactionCurrency +
    payload.countryCode +
    payload.merchantNameCode(merchantName) +
    payload.merchantCity +
    payload.checksumCode
};*/

let test1 = generateString("mobile","+6592361751","no","110","payyouuuu")

var crcTest1 = crc.compute(Buffer.from(test1,"ascii"))
var crcFinal = crcTest1.toString(16)

//console.log(crcFinal)

let final = test1+crcFinal

console.log(final)
//console.log(payload.proxyValueCode("+6597251347"))
 
QRCode.toFile('./QR-Output/test.png', final, /*{
    color: {
      dark: '#00F',  // Blue dots
      light: '#0000' // Transparent background
    }
  },*/ function (err) {
    if (err) throw err
    console.log('done')
  }
)