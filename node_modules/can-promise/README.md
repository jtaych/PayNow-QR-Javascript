# can-promise

> Tiny module for checking if Promise is globally available.

## Installation

```bash
npm i --save can-promise
```

## Example

```javascript
const canPromise = require('can-promise')
// or
import canPromise from 'can-promise'

// on Node < 0.11.13
console.log(canPromise()) // false

// on Node >= 0.11.13
console.log(canPromise()) // true

// on IE9
console.log(canPromise()) // false

// on Chrome, Firefox
console.log(canPromise()) // true
```
