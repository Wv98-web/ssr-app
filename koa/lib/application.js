const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

// 创建应用实例
class Application {
	constructor() {
		// this.context.__proto__ = context
		// 第一层 保证每个应用之间不共享上下文
		this.context = Object.create(context);
		this.request = Object.create(request);
		this.response = Object.create(response);
	}

	use(fn) {
		this.fn = fn; // 函数先存起来，请求来了触发函数
	}

	createContext(req, res) {
		// ctx.__proto__.__proto__ = context
		// 第二层 是保证每次请求的时候都产生一个新的上下文
		const ctx = Object.create(this.context);
		const request = Object.create(this.request);
		const response = Object.create(this.response);

		ctx.request = request; // 自己封装的
		ctx.request.req = ctx.req = req;

		ctx.response = response;
		ctx.response.res = ctx.res = res;

		return ctx;
	}

	// handleRequest(req, res) {
	// 	console.log(this);
	// }
	handleRequest = (req, res) => {
		console.log(this);

		// ...
		const ctx = this.createContext(req, res);
		this.fn(ctx);

		res.end(ctx.body); // 返回最终结果响应给用户
	};

	listen() {
		// 默认不采用箭头函数回调中的this指向我们http创建的服务
		// 为了使this永远指向创建的应用实例Application，最简单方法使用箭头函数，或者bind绑定this
		const server = http.createServer(this.handleRequest);

		server.listen(...arguments);
	}
}

// 导出
module.exports = Application;
