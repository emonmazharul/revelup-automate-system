const automate = require('./automate');

setInterval(async () => {
	await automate();
},60000*30);
