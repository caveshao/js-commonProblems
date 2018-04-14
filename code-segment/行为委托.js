
let col = {
    doSomething() {
        console.log("go back");
    },
    getInfom() {
        console.log(this.doSomething);
    }
}

/* 把 act「委托者」 对象委托给 col「委托目标」 对象 */

//第一种方法 
// let act = Object.create(col);

/*2. es6 的方法 */
let act = {};
Object.setPrototypeOf(act, col)

/* 互相委托,这是禁止的做法 */
// let act = Object.create(col);
// col = Object.create(act);

act.get = function () {
    this.getInfom();
}



act.get();