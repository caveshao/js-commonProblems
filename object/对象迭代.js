var obj = {
    a: 1
};

obj[Symbol.iterator] = function () {
    return {
        next: function () {
            return {
                /* 这是要返回的对象，格式是固定的,done 为 true 时迭代停止 */
                value: 1,
                done: false
            }
        }
    };
}

for (let val of obj) {
    console.log(val);// 会打印无数个 1
}