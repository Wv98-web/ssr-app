const response = {
	_body: undefined,
	get body() {
		return this._body;
	},

	set body(content) {
		// 用户修改了body属性那么就会更改状态码
		this.res.statusCode = 200;
		this._body = content;
	},

	// 和vue2的代理一样
};

// Object.defineProperties(obj, key, {
// 	get() {
// 		return xxx;
// 	},
// 	set(newValue) {
// 		xxx = newValue;
// 	},
// });

module.exports = response;
