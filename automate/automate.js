const axios = require('axios');
const uploadFile = require('../utils/ftp');
const csvCreator = require('../utils/obj');
const History = require('../db/historySchema');
const Errors = require('../db/errorSchema');


async function automate() {
	const {today,yesterDay} = resourceDateMaker();
	let cloneUser;
	const history = new History({uploadDate:today,isDone:true});
	try {
		const {data:users} = await axios.get(process.env.SECRET_ROUTE, {
				headers:{
					Authorization:'Bearer ' + process.env.SECRET_CODE,
				}
		});
		if(!users.length) {
			return;
		}
		for(let i=0;i<users.length;i++){

			const {subdomain,cookies,mall_code,tenant_code,ftp_url,ftp_username,ftp_password,isSecure,username} = users[i];
			const {response,axiosError} = await dataFetcher(today,yesterDay,subdomain,cookies);
			if(axiosError) { 
				await new Errors({errorMsg:axiosError,username,errorDate:today,}).save();
			} else {
				if(!response.length){
					const emptyCsv = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'
					const {isUploaded,errorMsg} = await uploadFile(emptyCsv,ftp_url,ftp_username,ftp_password,isSecure); 
					console.log(isUploaded);
					if(errorMsg) {
						await new Errors({errorMsg,username,errorDate:today}).save();
					}
				} else {
						const csv = csvCreator(response,mall_code,tenant_code);
						const {isUploaded,errorMsg} = await uploadFile(csv,ftp_url,ftp_username,ftp_password,isSecure); 
						console.log(isUploaded);
						if(errorMsg) {
							await new Errors({errorMsg,username,errorDate:today}).save();
						}
				}
			}
		}

		await history.save();
	
	} catch (e) {
		console.log(e.message,'main function')
	}
}


async function dataFetcher(today,yesterDay,subdomain,cookies){
	try {
		const url = `https://${subdomain}.revelup.com/resources/OrderAllInOne/?limit=0&created_date__gte=${yesterDay}T06:00:00&created_date__lte=${today}T06:00:00`;
		const {data,status} = await axios.get(url,{
			headers: {
				Cookie:cookies,
			}
		});
		if(status === 200 && Array.isArray(data.objects) ) {
			return {response:data.objects};
		}
	} catch (e) {
			if(e.message.includes(401)){
				return {axiosError:'session expired. please submit the form again.'};
			}
	}
}

function resourceDateMaker () {
	let today = new Date().toLocaleDateString();
	const yesterDayDate = new Date().getDate() - 1;
	let yesterDay = new Date().setDate(yesterDayDate);
	yesterDay = new Date(yesterDay).toLocaleDateString();
	return {
		today:today.split('/').reverse().join('/'),
		yesterDay:yesterDay.split('/').reverse().join('/')
	}
}

module.exports = automate;
