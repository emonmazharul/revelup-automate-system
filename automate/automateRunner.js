const automate = require('./automate');

setInterval(async () => {
	await automate();
},  2000);
