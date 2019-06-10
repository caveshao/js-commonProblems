// nodejs
const util = require('util')

var o = {
    a: 1,
    b: [1, 2, {
        b: 666,
        c:[{ 'jj': 'h' }]
    }]
}
console.log(o)
console.log(JSON.stringify(o,null,2))
console.log(util.inspect( o, { depth: null }))