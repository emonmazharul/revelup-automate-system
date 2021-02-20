function resourceDateMaker () {
	let today = new Date().toLocaleDateString();
	const yesterDayDate = new Date().getDate() - 1;
	let yesterDay = new Date().setDate(yesterDayDate);
	yesterDay = new Date(yesterDay).toLocaleDateString();
	const [todayMonth,todayDate,todayYear] = today.split('/');
	const [yesterDayMonth,yesterDayDate,yesterDayYear] = yesterDay.split('/');

	return {
		today:todayYear+todayMonth+todayDate,
		yesterDay:yesterDayYear+yesterDayMonth+yesterDayDate
	}
}

module.exports = resourceDateMaker;