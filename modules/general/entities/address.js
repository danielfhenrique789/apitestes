var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var address = new Schema({
	street: String,
	number: String,
	neibourhood: String,
	postal_code: String,
	city: String,
	state: String,
	country: Schema.Types.Mixed
});

address.methods.getSchema = function(){
	return this.schema;
}

module.exports =  mongoose.model("address",address);