
function dateInfoParser(arg) {
	const [year,month,date] = [ arg.getFullYear() + '' , arg.getMonth() + 1 +'' , arg.getDate() + '' ];
	return year + '-' + month + '-' + date ;
}

function resourceDateMaker () {
	const yesterDayDate = new Date().getDate() - 1;
	let yesterDay = new Date().setDate(yesterDayDate); 
	return {
		today:dateInfoParser(new Date()),
		yesterDay:dateInfoParser(new Date(yesterDay)),
	}
}

module.exports = resourceDateMaker;