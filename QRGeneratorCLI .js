var QRCode = require('qrcode');
const CRC = require('crc-full').CRC;
var crc = CRC.default("CRC16_CCITT_FALSE");
var inquirer = require('inquirer');

//CLI Settings

console.log('Hi, welcome to Joel\'s QR Generator 9000');

var questions = [
  {
    type: 'list',
    name: 'proxyType',
    message: 'Are you using a UEN or Phone Number?',
    choices: ['UEN', 'Phone Number'],
    filter: function(val) {
      if (val === 'Phone Number') {
          return "mobile"
      };
    },
    default: 1
  },
  {
    type: 'input',
    name: 'proxyNumber',
    message: "What's your UEN/phone number?",
  },
  {
    type: 'list',
    name: 'edit',
    message: 'Do you want your payment amount to be editable?',
    choices: ['Yes', 'No'],
    filter: function(val) {
      return val.toLowerCase();
    }
  },
  {
    type: 'input',
    name: 'paymentAmount',
    message: 'How much is the value of the payment?',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number
  },
  {
    type: 'input',
    name: 'merchantName',
    message: 'What\'s the Merchant Name? (Optional)',
  },
  {
    type: 'input',
    name: 'additionalComments',
    message: 'Any Additional Comments? (Optional)',
  }
]

inquirer.prompt(questions)
        .then(answers => {
            if (answers.proxyType === "mobile"){
                answers.proxyNumber = "+65"+ answers.proxyNumber
            }
            //console.log(answers.proxyNumber)
            return generateString(answers.proxyType,
                answers.proxyNumber,
                answers.edit,
                answers.paymentAmount.toString(),
                answers.merchantName,
                answers.additionalComments)
        })
        .then(interimString => {
            var crcInterim = crc.compute(Buffer.from(interimString,"ascii"))
            var crcFinal = crcInterim.toString(16)
            var completeString = interimString + crcFinal
            console.log(completeString)
            QRCode.toFile('./QR-Output/test.png', completeString, {
                color: {
                  dark: '#7C1A78',  // Blue dots
                  light: '#0000' // Transparent background
                }
              },function (err) {
                if (err) throw err
                console.log('done')
              }
            )
        }
        )

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
    transactionAmount: price => {
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

function generateString (proxyType,proxyValue,edit,price,merchantName,additionalComments) {
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
    payload.additionalComments(additionalComments) +
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


//let test1 = generateString("mobile","+6596327472","no","1","HI PF")

/*
let final = test1+crcFinal

console.log(final)
//console.log(payload.proxyValueCode("+6597251347"))
 

*/

