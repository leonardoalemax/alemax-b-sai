require("dotenv").config();

const useHowLongToBeat = require("./lib/useHowLongToBeat");
const { rateStyled } = require("./lib/useStyling");

const Notion = require("./lib/Notion");

(async () => {
	const notion = Notion(process.env.DATABASE_ID, process.env.NOTION_TOKEN);
	const completions = await useHowLongToBeat.completions("./HLTB.csv");

	for (let i = 0; i < completions.length; i++) {
		const {
			Title: name,
			Platform: platform,
			Completed: data,
			Review: review,
			Progress: progress,
		} = completions[i];

		console.log(name);

		await notion.Database.Page.updateOrCreate(
			{ name, platform, data },
			{
				data: {
					date: {
						start: data,
					},
				},
				console: {
					select: {
						name: platform,
					},
				},
				nota: {
					select: {
						name: rateStyled(review),
					},
				},
				tempo: {
					rich_text: [
						{
							type: "text",
							text: {
								content: progress,
							},
						},
					],
				},
			}
		);
	}
})();
