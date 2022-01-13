const context = {
	// get path() {
	// 	return this.request.path;
	// },
};

// ctx.path == ctx.request.path

function defineGetter(target, key) {
	context.__defineGetter__(key, function () {
		// 可能废弃，但兼容好， 新Object.defineProperties
		// defineProperty get方法
		return this[target][key];
	});
}

function defineSetter(target, key) {
	context.__defineSetter__(key, function (value) {
		// defineProperty set方法
		return (this[target][key] = value);
	});
}

defineGetter("request", "path");
defineGetter("request", "url");
defineGetter("request", "query");

defineGetter("response", "body"); // 先getter 后setter
defineSetter("response", "body");

//

module.exports = context;
