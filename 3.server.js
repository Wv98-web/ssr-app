const Koa = require("koa");

const app = new Koa();

// koa 默认是洋葱模型 调用next 会走下一个中间件函数
// 怎么异步
// koa中所有的异步操作都要基于promise
// koa内部会将所有的中间件进行组合操作，组合成了一个大的promise 只要从开头走到了结束就算完成了
// koa中的中间件必须增加 await next() 或者 return next() 否则异步逻辑可能出错

function sleep() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("sleep");
			resolve();
		}, 2000);
	});
}

// await 和 return 都会等待promise执行完毕 但return后面的代码不会执行
app.use((ctx, next) => {
	// start
	console.log(1);
	next(); // next表示执行下一个中间件
	console.log(2);
	// end
});

app.use(async (ctx, next) => {
	console.log(3);
	await sleep();
	next();
	console.log(4);
});

app.use((ctx, next) => {
	console.log(5);
	next();
	console.log(6);
});

// 135642
// 132sleep564    13 (开始sleep)2(结束显示2) sleep564

// app.use((ctx, next) => {
// 	console.log(1);
// 	((ctx, next) => {
// 		console.log(3);
// 		((ctx, next) => {
// 			console.log(5);
// 			next();
// 			console.log(6);
// 		})();
// 		console.log(4);
// 	})();
// 	console.log(2);
// });

app.listen(3000, () => {
	console.log("server start 3000");
});
