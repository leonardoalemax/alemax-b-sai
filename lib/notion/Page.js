module.exports = function Page(notion, databaseId) {
	const fetch = async ({ name, platform, data }) => {
		const query = await notion.databases.query({
			database_id: databaseId,
			filter: {
				and: [
					{
						property: "nome",
						title: {
							contains: name,
						},
					},
					{
						property: "console",
						select: {
							equals: platform,
						},
					},
					{
						property: "data",
						date: {
							equals: data,
						},
					},
				],
			},
		});

		return query.results[0];
	};

	const updateOrCreate = async (query, update) => {
		const myPage = await fetch(query);

		if (!myPage) {
			await notion.pages.create({
				parent: {
					database_id: databaseId,
				},
				properties: {
					nome: {
						title: [
							{
								text: {
									content: query.name,
								},
							},
						],
					},
					...update,
				},
			});
		} else {
			await notion.pages.update({
				page_id: myPage.id,
				properties: update,
			});
		}
	};

	return {
		fetch,
		updateOrCreate,
	};
};
