const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
	uploadDate:{
		type:String,
		required:true,
		trim:true,
	},
	isDone:{
		type:Boolean,
		required:true,
	},
},{
	timestamps:true,
})

const History = mongoose.model('history', historySchema);


module.exports = History;