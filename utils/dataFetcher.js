// const axios  = require('axios');
const got = require('got');
function modifyCookie(cookies) {
	const cookiesArray = cookies.split(' ');
	const filterEdCookies = cookiesArray.filter(cookie => {
		return cookie.search(/(last_login)|(sessionid)|(csrftoken)/) !== -1;
	})
	return filterEdCookies.join(' ');
}

// async function dataFetcher(today,yesterDay,subdomain,cookies){
	
// 	cookies = modifyCookie(cookies);
// 	try {
// 		const url = `https://${subdomain}.revelup.com/resources/OrderAllInOne/?limit=0&created_date__gte=${yesterDay}T06:00:00&created_date__lte=${today}T06:00:00`;
// 		const {data,status} = await axios.get(url,{
// 			withCredentials:true,
// 			headers: {
// 				Cookie:cookies,
// 			}
// 		});
		
// 		console.log(status, Array.isArray(data.objects));

// 		if(status === 200 && Array.isArray(data.objects) ) {
// 			// console.log(data.objects.final_total);
// 			return {response:data.objects};
// 		}
// 		console.log(data,'data which has no mean');
// 		return {axiosError:'a unknown error occuered in server'};
// 	} catch (e) {
// 		console.log('error in axios');
// 		console.log(e);
// 		console.log(e.message);
// 			if(e.message.includes(401)){
// 				return {axiosError:'session expired. please submit the form again.'};
// 			}
// 	}
// }

async function dataFetcher(today,yesterDay,subdomain,cookies){
	
	cookies = modifyCookie(cookies);
	try {
		const url = `https://${subdomain}.revelup.com/resources/OrderAllInOne/?limit=0&created_date__gte=${yesterDay}T06:00:00&created_date__lte=${today}T06:00:00`;
		const response = await got(url, {
			headers:{
				Cookie:cookies,
			}
		})
		const {body:data,statusCode} = response;
		if(statusCode === 200) {
			// console.log(data.objects.final_total);
			return {response:JSON.parse(data).objects};
		}
		console.log('data which has no mean');
		return {axiosError:'a unknown error occuered in server'};
	} catch (e) {
		console.log('error in axios');
		console.log(e);
		console.log(e.message);
			if(e.message.includes(401)){
				return {axiosError:'session expired. please submit the form again.'};
			}
	}
}

module.exports = dataFetcher;