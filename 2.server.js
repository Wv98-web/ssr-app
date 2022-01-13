const Koa = require("./koa"); // 引入自定义封装koa

let App = new Koa(); // 创建一个koa应用；

// 1。每个应用创建的时候 使用的上下文应该是不同的
// 2.每次请求的上下文应该是独立的一个

// 监听请求到来，返回响应结果
App.use((resquest, response) => {
	// node 自带的请求响应
	// 用户请求发送的时候会执行此回调方法(resquest 客户端的信息, response 服务端的响应对象)
	// koa中把(resquest, response)这两个对象封装到ctx这个变量上
	// 创建注册方法
	// ctx.body = "hello koa";

	response.end("ok");
});

// 相当于向后端服务器发送请求，需要对路径进行响应
App.listen(3000, () => [console.log("server start 3000")]);

// 全局安装nodemon， nodemon可以监控文件的变化，文件变化后可以自动重启服务
// npm install nodemon -g
// 启动命令 nodemon fileName

// koa 默认就是对我们node原生的http服务进行了封装
