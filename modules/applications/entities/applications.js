var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var Applications = new Schema({
	name:String,
	type:String,
	description:String,
	token:{type:String,unique:true},
	created:{ type : Date, default: Date.now },
	status:String,
	active:Boolean
});

Applications.methods.getSchema = function(){
	return this.schema;
}

module.exports =  mongoose.model("Applications",Applications);