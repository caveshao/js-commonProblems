
/* 1.检测浮点数是否相等 */

let x = 0.1;
let y = 0.2;
let z = 3.7

function numberCloseEnoughToEqual(n1,n2) {
	return Math.abs(n1-n2) <= Number.EPSIlon;
}

console.log(numberCloseEnoughToEqual(x+y,0.3)) //true


/* 2.指定小数显示位数 */

x.toFixed(5);


/* 3.取整 */

  // 向上取整,有小数就整数部分加1

Math.ceil(z)

  // 四舍五入.

Math.round(z)

  // 向下取整

Math.floor(z)

