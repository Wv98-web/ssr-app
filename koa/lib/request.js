const url = require("url");

const request = {
	get url() {
		return this.req.url; // 为什么在request身上加上一个req属性， 为了在取值的时候可以快速获取到原生的req
	},
	get path() {
		let { pathname } = url.parse(this.req.url); // 不带查询参数的
		return pathname;
	},
	get query() {
		let { query } = url.parse(this.req.url, true);
		return query;
	},
};

module.exports = request;
