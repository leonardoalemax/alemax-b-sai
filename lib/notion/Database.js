const Page = require("./Page");

module.exports = function Database(notion, id) {
	return {
		Page: Page(notion, id),
	};
};
