const axios  = require('axios');

async function dataFetcher(today,yesterDay,subdomain,cookies){
	console.log(subdomain);
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

module.exports = dataFetcher;