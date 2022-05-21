const csv = require("csvtojson");

module.exports = {
	completions: async (url) => {
		const jsonObj = await csv().fromFile(url);

		return jsonObj.filter((c) => c.Completed !== "");
	},
};
