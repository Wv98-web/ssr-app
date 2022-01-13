const response = {
	_body: undefined,
	get body() {
		return this._body;
	},

	set body(content) {
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
