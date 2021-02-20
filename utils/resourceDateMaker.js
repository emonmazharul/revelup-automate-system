function resourceDateMaker () {
	let today = new Date().toLocaleDateString();
	const yesterDayDate = new Date().getDate() - 1;
	let yesterDay = new Date().setDate(yesterDayDate);
	yesterDay = new Date(yesterDay).toLocaleDateString();
	console.log(today,yesterDay);
	return {
		today:today.split('/').reverse().join('-'),
		yesterDay:yesterDay.split('/').reverse().join('-')
	}
}

module.exports = resourceDateMaker;