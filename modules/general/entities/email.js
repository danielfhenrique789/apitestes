var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var email = new Schema({
	email:String,
	provider:String,
	description:String,
	status:String
});

email.methods.getSchema = function(){
	return this.schema;
}

module.exports =  mongoose.model("email",email);