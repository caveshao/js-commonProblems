    // 当设备宽度为 750px 时，1rem = 100px
    document.documentElement.style.fontSize = `${(document.body.clientWidth / 750)*100}px`;
    //在窗口大小改变之后,就会触发resize事件.
    window.onresize = () => {
         document.documentElement.style.fontSize = `${(document.body.clientWidth / 750)*100}px`;
    }