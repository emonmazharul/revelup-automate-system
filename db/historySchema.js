const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
	},
	subdomain:{
		type:String,
		required:true,
	},
	uploadDate:{
		type:String,
		required:true,
		trim:true,
	},
	isDone:{
		type:Boolean,
		required:true,
	},
	establishment_code:{
		type:String,
	},
},{
	timestamps:true,
})

const History = mongoose.model('history', historySchema);


module.exports = History;