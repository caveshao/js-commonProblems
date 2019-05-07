console.log(123)

var p = new Promise(function(resolve,reject) {
	setTimeout(function(){resolve("A")},1000);
})
p.then(function() {
	p.then(function() {
		console.log(2)
	})
	console.log(1)
})
p.then(function() {
	console.log(3)
	return new Promise(function(resolve,reject) {
		resolve(10);
	});
}).then(function(v) {
	console.log(v)
})