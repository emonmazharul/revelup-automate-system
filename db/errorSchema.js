const mongoose = require('mongoose');

const errorSchema = new mongoose.Schema({
	errorMsg:{
		type:String,
		required:true,
		trim:true,
	},
	username:{
		type:String,
		required:true,
	},
	errorDate:{
		type:String,
		required:true,
	},
	subdomain:{
		type:String,
		required:true,
	}
},{
	timestamps:true,
})



const Errors = mongoose.model('Error', errorSchema);


module.exports = Errors;