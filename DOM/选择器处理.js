  //  getElementById、getElementsByName、getElementsByTagName、getElementsByClassName，这几个 API 的性能高于 querySelector。
  //  getElementsByName、getElementsByTagName、getElementsByClassName 获取的集合并非数组，而是一个能够动态更新的集合。

  function querySelector(selector) {

      let element = null
      let elements = null

      let idSelector = /(?<=#)[\w-]+/g
      let classSelector = /(?<=\.)[\w-]+/g
      let typeSelector = /^[a-zA-Z]+/g
      let attrSelector = /(^[\w-]*)(\[(\w+)\]|\[(\w+)=\"(\w+)\"\])/g

      if (idSelector.test(selector)) {
          let id = selector.match(idSelector)[0]
          element = document.getElementById(id)
      } else {

      }

      if (classSelector.test(selector)) {
          let className = selector.match(classSelector)[0]
          elements = document.getElementsByClassName(className)
          if (elements.length === 1) {
              element = elements[0]
          }
      } else {

      }

      if (typeSelector.test(selector)) {
          let tagName = selector.match(typeSelector)[0]
          elements = document.getElementsByTagName(tagName)
          if (elements.length === 1) {
              element = elements[0]
          }
      } else {

      }

      if (attrSelector.test(selector)) {
          //在调用 exec() 或 test() 时，RegExp $1-$9 属性会被自动填充。
          let res = attrSelector.exec(selector)
          let tag = RegExp.$1
          let attrName = RegExp.$3 || RegExp.$4
          let attrValue = RegExp.$5

          elements = document.getElementsByTagName(tag)

          if (attrValue) {
              elements = Array.prototype.filter.call(elements, ele => ele.getAttribute(attrName) === attrValue)
          } else {
              elements = Array.prototype.filter.call(elements, ele => ele.hasAttribute(attrName))
          }

          if (elements.length === 1) {
              element = elements[0]
          }
      } else {

      }

      return element || elements

  }