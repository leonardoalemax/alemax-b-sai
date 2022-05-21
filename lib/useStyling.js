module.exports = {
	rateStyled: (rate) => {
		switch (rate) {
			case "100":
				return "💎";
			case "90":
				return "⭐️⭐️⭐️⭐️⭐️";
			case "80":
				return "⭐️⭐️⭐️⭐️";
			case "70":
				return "⭐️⭐️⭐️";
			case "60":
				return "⭐️⭐️";
			case "50":
				return "⭐️";
			default:
				return "👎";
		}
	},
};
