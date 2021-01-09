const History = require('../db/historySchema');
const automate = require('./automate');

const hours = [6,7,8];

let timer = setInterval(async () => {
		const today = new Date().toLocaleDateString();
		let isUploadedToday = await History.findOne({uploadDate:today,isDone:true});
		const currentHours = new Date().getHours();
		const minutes = new Date().getMinutes();
		const targetHour = hours.find(hour => hour === currentHours) || currentHours; 
		if(isUploadedToday){
			clearInterval(timer);
		} else {
			if(targetHour == 6 && minutes >= 30) {
				console.log('first',new Date().toLocaleString());
				await automate();
				clearInterval(timer)
			}

			if(targetHour > 6){
				console.log('uploaded at > 6');
				await automate();
				clearInterval(timer);			
			} else {
				console.log('still running on ' + new Date().toLocaleDateString());
			}
		}	 
},60000*30 );

