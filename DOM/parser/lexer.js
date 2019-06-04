// 每个函数是一个状态，参数是传入的字符，返回值是下一个状态
const EOF = void 0

function HTMLLexicalParser(syntaxer) {
    let state = data
    let token = null
    let attribute = null

    //all state
    function data(c) {

        if (c == "<") {
            return tagOpen
        }

        if (c === EOF) {
            emitToken(EOF)
            return data
        } else {
            emitToken(c)
            return data
        }
    }

    function markupDeclaration(c) {

    }

    function tagOpen(c) {

        if (c == "/") {
            return endTagOpen
        }

        if (/[a-zA-Z]/.test(c)) {
            token = new StartTagToken()
            token.name = c.toLowerCase()
            return tagName
        }

    }

    function endTagOpen(c) {
        if (/[a-zA-Z]/.test(c)) {
            token = new EndTagToken()
            token.name = c.toLowerCase()
            return tagName
        }
    }

    // \u0020 WhiteSpace
    function tagName(c) {
        if (c === '/') {
            return selfClosingStartTag
        }
        if (c === '\u0020') {
            return beforeAttributeName
        }
        if (c === '>') {
            emitToken(token)
            return data
        }
        if (/[A-Za-z]/.test(token)) {
            token.name += c.toLowerCase();
            return tagName
        }
    }

    function selfClosingStartTag(c) {
        if (c === '>') {
            emitToken(token)
            endToken = new EndTagToken()
            endToken.name = token.name
            emitToken(endToken)
            return data
        }
    }

    function beforeAttributeName(c) {
    	if(c === '\u0020'){
    		beforeAttributeName
    	}
        if (c === '/') {
            return selfClosingStartTag
        }
        if (c === '>') {
        	emitToken(token)
            return data
        }
        if (/[a-zA-z]/.test(c)) {
        	attribute = new Attribute()
        	attribute.name = c.toLowerCase()
        	attribute.value = ''
        	return attributeName
        }
    }

    function attributeName(c) {
        if (c === '=') {
            return beforeAttributeValue
        }

        attribute.name += c.toLowerCase()
        return attributeName
    }

    function beforeAttributeValue(c) {
    	if (c === '"') {
    		return beforeAttributeValue
    	}
        if (/[a-zA-Z]/.test(c)) {
        	attribute.value = c
            return attributeValue
        }
    }

    function attributeValue(c) {
        if (c === '\u0020') {
        	token[attribute.name] = attribute.value
            return beforeAttributeName
        }
        if (c === '"') {
        	return attributeValue
        }
        attribute.value += c
        return attributeValue
    }

    // 输出解析好的 token
    function emitToken(token) {
        syntaxer.receiveInput(token)
    }

    // state transition
    this.receiveInput = function(char) {
        state = state(char)
    }
}

class StartTagToken {}
class EndTagToken {}
class Attribute {}

module.exports = {
    HTMLLexicalParser,
    StartTagToken,
    EndTagToken,
}