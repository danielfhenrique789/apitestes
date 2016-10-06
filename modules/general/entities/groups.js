var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var groups = new Schema({
	name:String,
	type:String,
	description:String,
	status:String,
	active:Boolean
});

groups.methods.getSchema = function(){
	return this.schema;
}

module.exports =  mongoose.model("groups",groups);