 ## 1. 遍历 DOM 树并打印节点类型及名称 
    function consoAllNodeName(parentNode) {
        let nodeType = '';
        parentNode.childNodes.forEach(element => {
            switch (element.nodeType) {
                case 1:
                    nodeType = 'Element node:';
                    break;
                case 3:
                    nodeType = 'Text node:';
                    break;
                case 7:
                    nodeType = 'XML ProcessingInstruction:';
                    break;
                case 8:
                    nodeType = 'Comment node:';
                    break;
                case 9:
                    nodeType = 'Document node:';
                    break;
                case 10:
                    nodeType = 'DocumentType node:';
                    break;
                case 11:
                    nodeType = 'DocumentFragment node:';
                    break;
                default:
                    nodeType = 'Unknown type node:';
                    break;
            }
            console.log(nodeType + element.nodeName.toUpperCase());
    
            if (element.firstChild) {
                consoAllNodeName(element);
            } else {
    
            }
    
        })
    }
    
    consoAllNodeName(document);

## 2. 遍历 DOM 树并打印所有元素的 tagName


    function consoAllTagName(parentNode) {
    
        let nodeType = '';
        let childNodes = Array.prototype.filter.call(parentNode.childNodes, element => element.tagName);
        childNodes.forEach(element => {
             
            console.log(element.tagName.toUpperCase());
            if (element.firstChild) {
                consoAllNodeName(element);
            } else {
    
            }
    
        })
    }
    
    consoAllTagName(document);
    

在这段代码中，由于 nodeList 类型并没有 filter 方法，使用 call 函数传入 nodelist 调用该方法。并且将 filter 的处理函数作为第二个参数。
在这段代码中，由于 nodeList 类型并没有 filter 方法，使用 call 函数传入 nodelist 调用该方法。并且将 filter 的处理函数作为第二个参数。

下面这种方法是广度优先遍历。
``` 
function consoAllTagName(root){
  const queue = [root];
  while(queue.length) {
    const currentNode = queue.shift();
    const {childNodes, tagName} = currentNode;
    if (tagName) {
      console.log(currentNode.tagName);
    } else {
    }
    Array.prototype.filter.call(childNodes, item=>item.tagName)
    .forEach(itemNode=>{
      queue.push(itemNode)
    })
  }
}
```

这段代码中，通过解构赋值得到 childNodes 和 tageName 属性。