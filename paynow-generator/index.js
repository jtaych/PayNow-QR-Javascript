const CRC = require('crc-full').CRC;
var crc = CRC.default("CRC16_CCITT_FALSE");

//Payload (Non-Merchant)

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
    transactionAmountEdit: edit => {
        if(edit === "yes") {
            return "0301" + "1"
        } else {
            return "0301" + "0"
        }
    },
    expiryDateCode: "04"+"08"+"99991231",
    merchantCategoryCode: "52"+"04"+"0000",
    transactionCurrency: "53"+"03"+"702",
    transactionAmount: input => {
        let price = input.toString();
        if (price.length < 10) {
            return "54"+ "0" + price.length + price
        } else {
            return "54"+ price.length + price
        };
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
    additionalComments: comment => {
        if(comment == "") {
            return null
        } else if (comment.length >= 10) {
            return "62" + comment.length + comment
        } else {
            return "62" + "0" + comment.length + comment
        }
    },
    checksumCode: "63" + "04"
};

//need to calculate CRC, check page 26 of EMVCO specifications

function paynowGenerator (proxyType,proxyValue,edit,price,merchantName,additionalComments) {
    if (proxyType === "mobile") {
        var prelimString =  payload.preamble + 
        payload.globallyUniqueIdentifier + 
        payload.proxyTypeCode(proxyType) + 
        payload.proxyValueCode("+65"+proxyValue) + 
        payload.transactionAmountEdit(edit) + 
        payload.expiryDateCode +
        payload.merchantCategoryCode +
        payload.transactionCurrency +
        payload.transactionAmount(price) +
        payload.countryCode +
        payload.merchantNameCode(merchantName) +
        payload.merchantCity +
        payload.additionalComments(additionalComments) +
        payload.checksumCode;
    } else {
        var prelimString =  payload.preamble + 
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
        payload.additionalComments(additionalComments) +
        payload.checksumCode;
    }
    let crcInterim = crc.compute(Buffer.from(prelimString,"ascii"));
    let crcFinal = crcInterim.toString(16);
    let completeString = prelimString + crcFinal;
    return completeString;
};

module.exports.paynowGenerator = paynowGenerator;

/*
let test = generateString("mobile","97251347","yes",1,"","hello world")
console.log(test)
*/
