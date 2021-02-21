const axios = require('axios');
const uploadFile = require('../utils/ftp');
const csvCreator = require('../utils/obj');
const History = require('../db/historySchema');
const Errors = require('../db/errorSchema');
const messageShower = require('../utils/messageShower');
const dataFetcher = require('../utils/dataFetcher');
const resourceDateMaker = require('../utils/resourceDateMaker');

async function automate() {
	const {today,yesterDay} = resourceDateMaker();
	console.log(today,yesterDay)
	try {
		const {data,status} = await axios.get(process.env.SECRET_ROUTE, {
				headers:{
					Authorization:'Bearer ' + process.env.SECRET_CODE,
				}
		});

		const users = data.filter(user => {
			const [myHour,myMinutes] = user.scheduleTime.split(':').map(item => Number(item));
			const currentHour = new Date().getHours();
			const currentMinutes =  new Date().getMinutes();

			if(myHour < currentHour){
				return true;
			}
			if(myHour === currentHour){
				return myMinutes >= currentMinutes ? true : false;
			}

		});

		if(!users.length) {
			console.log('no available user to upload for this time');
			return;
		}

		for(let i=0;i<users.length;i++){
	
			const {subdomain,cookies,mall_code,tenant_code,ftp_url,ftp_username,ftp_password,isSecure,username,establishment_code} = users[i];
			

			const doneUpload = await History.findOne({uploadDate:today,username,subdomain,establishment_code,isDone:true}) 
			const hasErrorOnUpload = await Errors.findOne({errorDate:today,username,subdomain,establishment_code});

			if(doneUpload || hasErrorOnUpload) continue;
			
			const {response,axiosError} = await dataFetcher(today,yesterDay,subdomain,cookies);

			if(axiosError) { 
				console.log(axiosError);
				await new Errors({errorMsg:axiosError,username,errorDate:today,subdomain,establishment_code}).save();
			} else {
				if(!response.length){
					const emptyCsv = '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,'
					const {isUploaded,errorMsg} = await uploadFile(emptyCsv,ftp_url,ftp_username,ftp_password,isSecure); 
					if(errorMsg) {
						console.log(errorMsg)
						await new Errors({errorMsg,username,errorDate:today,subdomain,establishment_code}).save();
					} else {
						console.log(isUploaded);
						await new History({uploadDate:today,username,subdomain,establishment_code,isDone:true}).save();
					}
				} else {
						const csv = csvCreator(response,mall_code,tenant_code);
						const {isUploaded,errorMsg} = await uploadFile(csv,ftp_url,ftp_username,ftp_password,isSecure); 
						if(errorMsg) {
							console.log(errorMsg)
							await new Errors({errorMsg,username,errorDate:today,subdomain,establishment_code}).save();
						} else {
							console.log(isUploaded);
							await new History({uploadDate:today,username,subdomain,establishment_code,isDone:true}).save();
						}
				}
			}
		}

		await messageShower();
	} catch (e) {
		console.log('GET ERROR AT ', new Date().toLocaleTimeString());
		console.log('main function')
		console.log(e);
	}
}

module.exports = automate;
