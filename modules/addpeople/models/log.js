var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var log = new Schema({
	action: String,
	params: Schema.Types.Mixed,
	result: Schema.Types.Mixed,
	description: Date,
	timestamp: {type:Date,default: Date.now()}
});

module.exports =  mongoose.model("log",log);