const Koa = require("./koa"); // 引用原生的koa

let App = new Koa(); // 创建一个koa应用；

// 1。每个应用创建的时候 使用的上下文应该是不同的
// 2.每次请求的上下文应该是独立的一个
// 默认情况下，node原生的 req 和 res功能弱，我们核心目的就是为了扩展原生的req和res

// 监听请求到来，返回响应结果
App.use((ctx) => {
	// 用户请求发送的时候会执行此回调方法(req 客户端的信息, res 服务端的响应对象)
	// req和res是原生自带的
	// koa中把(req, res)这两个对象封装到ctx这个对象上

	// ctx是koa自己封装的一个对象，内部包含了node中的http模块中的原生的req和res
	console.log(ctx.req.url);
	console.log(ctx.request.req.url); // 通过自己封装的request对象拿到原生的req对象
	console.log(ctx.request.path); // request 和 response 是koa中新封装的
	console.log(ctx.request.query);
	console.log(ctx.path); // 默认我们访问穿ctx.path属性 会被代理到ctx.request.path

	// 创建注册方法
	ctx.body = "hello ";
	ctx.body = "koa";
	ctx.response.body = "hello koa";
	console.log(ctx.response.body);
});

// 相当于向后端服务器发送请求，需要对路径进行响应
App.listen(3000, () => [console.log("server start 3000")]);

// 全局安装nodemon， nodemon可以监控文件的变化，文件变化后可以自动重启服务
// npm install nodemon -g
// 启动命令 nodemon fileName

// koa 默认就是对我们node原生的http服务进行了封装

/**
 *  koa文件目录
 *
 *  lib
 *  application.js 整个的应用
 *  context.js 代表的是上下文
 *  request.js 用于扩展请求
 *  response.js 用于扩展相应
 *
 */
