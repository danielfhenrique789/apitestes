var mongoose = require("mongoose");

exports.getInstance = function()
{
	return {
		username: {type:String}, //, unique:true},
		password: String,
		aphesys:{type:String}, //,unique:true},
		aptosys:String,
		last_access: Date
	};
}