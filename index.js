require('./db/connection');
require('./automate/automateRunner');

const express = require('express');

const app = express();
app.get('/', (req,res) => {
	res.send('running automated task on  daily basis');
})

app.listen(process.env.PORT, (err) => {
	if(err) console.log(err);
	console.log('server running on port ' + process.env.PORT );
})