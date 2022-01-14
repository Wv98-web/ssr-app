const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
const EventEmitter = require("events");

// 创建应用实例
class Application extends EventEmitter {
	constructor() {
		super();
		// this.context.__proto__ = context
		// 第一层 保证每个应用之间不共享上下文
		this.context = Object.create(context);
		this.request = Object.create(request);
		this.response = Object.create(response);

		this.middlewares = [];
	}

	use(middleware) {
		// this.fn = fn; // 函数先存起来，请求来了触发函数

		this.middlewares.push(middleware);
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

	compose(ctx) {
		let index = -1;

		const dispatch = (i) => {
			console.log(index, i, "index i");
			if (index <= i) {
				return Promise.reject("next() call multiples times");
			}
			index = i;
			if (this.middlewares.length == i) {
				return Promise.resolve();
			}
			let middleware = this.middlewares[i];
			console.log(i + 1, "------");
			try {
				return Promise.resolve(
					// next函数是 ()=>{dispatch(i+1)}
					middleware(ctx, () => {
						dispatch(i + 1);
					})
				);
			} catch (error) {
				return Promise.reject(error);
			}
		};

		return dispatch(0); // 我要执行第一个中间件

		// 这里相当于 Promise1(Promise2(Promise3)).then()
		// 将功能组合在一起，依次执行
	}

	// handleRequest(req, res) {
	// 	console.log(this);
	// }
	handleRequest = (req, res) => {
		console.log(this);

		// ...
		const ctx = this.createContext(req, res);

		res.statusCode = 404;

		this.compose(ctx)
			.then(() => {
				// 等待ctx赋值后响应给用户
				let body = ctx.body;
				if (body) {
					res.end(ctx.body); // 返回最终结果响应给用户
				} else {
					res.end("not found");
				}
			})
			.catch((err) => {
				this.emit("error", err);
			});

		// this.fn(ctx);
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
