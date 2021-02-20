function resourceDateMaker () {
	let today = new Date().toLocaleDateString();
	const yesterDayDate = new Date().getDate() - 1;
	let yesterDay = new Date().setDate(yesterDayDate);
	yesterDay = new Date(yesterDay).toLocaleDateString();
	const [todayMonth,todayDate,todayYear] = today.split('/');
	const [yesterDayMonth,yesterDaydate,yesterDayYear] = yesterDay.split('/');

	return {
		today:todayYear+todayMonth+todayDate,
		yesterDay:yesterDayYear+yesterDayMonth+yesterDaydate
	}
}

module.exports = resourceDateMaker;