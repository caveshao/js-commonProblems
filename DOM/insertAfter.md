```
    function insertAfter(element, targetElement) {
        let parent = targetElement.parentNode;
        if (parent.lastChild === targetElement) {
            parent.appendChild(element);
        } else {
            parent.insertBefore(element, targetElement.nextSibling);
        }
    }
```

