const { StartTagToken, EndTagToken } = require("./lexer.js")

// define node
class HTMLDocument {
    constructor() {
        this.isDocument = true
        this.childNodes = []
    }
}

class Node {}

class Element extends Node {
    constructor(token) {
        super(token)
        for (let key in token) {
            this[key] = token[key]
        }
        this.childNodes = []
    }
    // 在该对象的实例上调用 toSting 可以得到实例名称
    get[Symbol.toStringTag]() {
        return `Element${this.name}`
    }
}
class Text extends Node {
    constructor(value) {
        super(value)
        this.value = value || ''
    }
}

// syntaxer
function HTMLSyntaticalParser() {
    var stack = [new HTMLDocument];
    //栈顶元素是当前节点，

    this.receiveInput = function(token) {

        if (typeof token === 'string') {
            if (getStackTop(stack) instanceof Text) {
                getStackTop(stack).value += token
            } else {
                let text = new Text(token)
                getStackTop(stack).childNodes.push(text)
                stack.push(text)
            }
        } else if (getStackTop(stack) instanceof Text) {
            stack.pop()
        }

        if (token instanceof StartTagToken) {
        	//遇到 start tag 入栈一个节点，当前节点就是这个节点的父节点
            let element = new Element(token)
            getStackTop(stack).childNodes.push(element)
            stack.push(element)
        } else {

        }

        if (token instanceof EndTagToken) {
            return stack.pop()
        } else {

        }

    }

    this.getOutput = function() {
        return stack[0];
    }

    function getStackTop(stack) {
        return stack[stack.length - 1]
    }
}

module.exports = {
    HTMLSyntaticalParser
}