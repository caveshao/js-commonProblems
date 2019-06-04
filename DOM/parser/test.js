const {HTMLSyntaticalParser} = require('./syntactical-parser.js')
const {HTMLLexicalParser} = require('./lexer.js')

const html = `<html maaa=a >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
    </body>
</html>`

const syntaxer = new HTMLSyntaticalParser()
const lexer = new HTMLLexicalParser(syntaxer)

for (let c of html) {
    lexer.receiveInput(c)
}

console.log(JSON.stringify(syntaxer.getOutput(), null, 2))
