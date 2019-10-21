// 只有先执行了依赖收集，才能在属性更新的时候派发更新

class Dep {
	constructor() {
		this.subs = []
	}
	//添加依赖
	addSub(sub) {
		this.subs.push(sub)
	}
	//更新 
	notify() {
		this.subs.forEach(sub=>{
			sub.update()
		})
	}
}

Dep.target = null

//当需要依赖收集的时候调用 addSub，当需要派发更新的时候调用 notify

//在组件挂载时会先对所有需要的属性调用 Object.defineProperty()
//然后实例化 Watcher，传入组件更新的回调
//在实例化的过程中会对模板的属性进行求值，触发依赖收集

class Watcher {
	constructor(obj,key,cb) {
		// 将 Dep.target 指向自己
		// 然后触发属性的 getter 添加监听
		//最后将 Dep.target 置空
		Dep.target = this
		this.cb = cb
		this.obj = obj 
		this.key = key
		this.value = obj[key] //此处触发属性的 getter
		Dep.target = null
	}

	update() {
		//获取新值
		this.value = this.obj[this.key]
		//调用 update 更新 Dom
		this.cb(this.value)
	}
}

//在执行构造函数时将 Dep.target 指向自身，从而收集到对应的 Watcher，在派发更新的时候取出对应的 Watcher，然后执行 update 函数


function observe(obj) {
	if(!obj || typeof obj !== 'object'){
		return
	}

	for(let key in obj) {
		defineReactive(obj,key,obj[key])
	}
}

function defineReactive(obj,key,value) {
	observe(value)

	let dp = new Dep()
	Object.defineProperty(obj,key,{
		enumerable:true,
		cinfigurable:true,
		get:function() {
			if(Dep.target) {
				dp.addSub(Dep.target)
			}
			return value
		},
		set:function(newValue) {
			value = newValue
			dp.notify()
		}
	})
}


let obj = {a:1}


observe(obj)

new Watcher(obj,'a',function(v) {
	//document.querySelector().innerText = v //更新 DOM
	console.log("改变DOM")
})

obj.a