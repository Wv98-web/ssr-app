const Koa = require("./koa");

const app = new Koa();

// 所有异步逻辑都要变成 promise的形式

function sleep() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("sleep");
			resolve();
		}, 2000);
	});
}
app.use(async (ctx, next) => {
	console.log(1);
	ctx.body = "1";
	await next(); // 在这里加了next 会等待后面的逻辑执行完毕，后面的执行完毕后
	await next();
	console.log(2);
	ctx.body = "2";
});

app.use(async (ctx, next) => {
	console.log(3);
	ctx.body = "3";
	await sleep();
	await next();
	console.log(4);
	ctx.body = "4";
});

app.use((ctx, next) => {
	console.log(5);
	ctx.body = "5";
	next();
	console.log(6);
	ctx.body = "6";
});

// 捕获错误
app.on("error", function (err) {
	console.log(err);
});

app.listen(3000, () => {
	console.log("server start 3000");
});
