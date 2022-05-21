const { Client } = require("@notionhq/client");
const Database = require("./Database");

module.exports = (databaseId, token) => {
	const notion = new Client({
		auth: token,
	});

	return {
		Database: Database(notion, databaseId),
	};
};
