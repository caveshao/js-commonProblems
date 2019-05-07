/***************001*****/

// var x = 1;
// function *foo() {
// 	x+=(yield 'hello');
// 	console.log(x);
// }

// function bar() {
// 	x++;
// }

// var it =  foo();
// var res = it.next();
// bar();
// it.next(6);
// console.log(res.value)

/**********002******/

// a = 1;
// b = 2;
// function *foo() {
// 	a++;
// 	yield;
// 	b = b * a;
// 	a = (yield b) + 3;
// }

// function *bar() {
// 	b--;
// 	yield;
// 	a = (yield 8) + b;
// 	a = 3;
// 	b = a * (yield 2);
// }

// function step(gen) {
// 	var it = gen();
// 	var last;

// 	return function(){
// 		last = it.next(last).value;
// 	}
// }

// var s1 = step(foo);
// var s2 = step(bar);

// debugger;

// s2();
// s2();
// s1();
// s2();

// s1();

// s1();
// s2();

// console.log(a+":"+b)

/********************003*********/

// var something = (function() {
//     var nextVal;
//     return {
//         [Symbol.iterator]: function() { return this },
//         next: function() {
//             if (nextVal == undefined) {
//                 nextVal = 1;
//             } else {
//                 nextVal = (3 * nextVal) + 6;
//             }
//             return {
//                 done: false,
//                 value: nextVal
//             }
//         }
//     }
// })();

// for(var v of something){
// 	console.log(v)
// 	if(v>=500) {
// 		break;
// 	}
// }


/****************************004**********************/

// function foo(x) {
//     setTimeout(function() { //此处必须为一个异步的函数包裹迭代器的调用
//         it.next(6)
//     }, 100)
// }

// function* main() {
//     try {
//         var num = yield foo(3);
//         console.log(num)
//     } catch (error) {
//         console.log("error")
//     }
// }
// debugger;
// var it = main();
// it.next();


/******************005******************************/

// function *foo(val) {
// 	if(val>1) {
// 		val = yield *foo(val-1);
// 	}
// 	return yield request("http://some.url/?v="+val)
// }

// function *bar() {
// 	var r1 = yield *foo(3);
// 	console.log(r1);
// }

// run(bar);


/********************006手动实现生成器*************************/

var request = function(url) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(url);
        }, 1000)
    })
}

function foo(url) {
    // 管理生成器状态
    var state;

    // 生成器变量范围声明
    var val;

    //处理每个状态
    function process(v) {
        switch (state) {
            case 1:
                console.log("requseting", url);
                return request(url);
            case 2:
                val = v;
                console.log(val);
                return;
            case 3:
                var err = v;
                console.log("oops:", err);
                return false;
        }
    }

    return {
        // 此处利用了闭包来保存状态,每次调用 next 都会进入不同的状态，模拟了迭代器的功能
        next: function(v) {
            // 初始状态，执行到 yield
            if (!state) {
                state = 1;
                return {
                    done: false,
                    value: process(),  //第一个状态返回对象的 value 为 request(url)
                }
            }
            // yield 恢复 
            else if (state == 1) {
                state = 2;
                return {
                    done: true,       // 第二个状态表示第二次调用 next ,此时生成器为完成状态
                    value: process(v) // 第二个状态返回的对象的 value 为 undefined
                }
            }
            // 此处生成器已经完成
            else {
                return {
                    done: true,
                    value: undefined
                }
            }
        },
        "throw": function(e) {
            // 显式错误处理在状态一
            if (state == 1) {
                state = 3;
                return {
                    done: true,
                    value: process(e),
                }
            }
            // 如果不在状态一，错误只抛回，不处理
            else {
                throw e;
            }

        }
    }
}

var it = foo(3);
it.next();
it.next(6);
it.next();