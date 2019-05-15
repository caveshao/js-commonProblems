// 利用 Promise 加 async 函数
    function lightChange(duration,color) {
    	return new Promise(function(resolve,reject) {
    		light.style.backgroundColor = color;
    		setTimeout(resolve,duration);
    	})
    }

    async function index() {
    	while(1) {
    		await lightChange(2000,'red');
    		await lightChange(1000,'yellow');
    		await lightChange(3000,'green');
    	}
    }

    index();

// 利用生成器模拟 Promise

    function func(color, duration) {
        return new Promise(function(resolve, reject) {
            light.style.backgroundColor = color;
            setTimeout(function() {
                it.next();
            }, duration)
        })
    }

    function* main() {
        while (1) {
            yield func('red',2000);
            yield func('yellow',1000);
            yield func('green',3000);
        }
    }

    var it = main();
    it.next();