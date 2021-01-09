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
	}
},{
	timestamps:true,
})


// errorSchema.methods.addError = async function(errorMsg,username){
// 	try {
// 		const error = this;
// 		error.errorMsgs = error.errorMsgs.concat({error:errorMsg,username});
// 		await error.save();
// 	}
// 	catch (e) {
// 		console.log('errorSchema error', e);
// 	}
// }

const Errors = mongoose.model('Error', errorSchema);


module.exports = Errors;