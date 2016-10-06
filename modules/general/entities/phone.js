var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var phone = new Schema({
	city_code: String,
	country_code: String,
	is_mobile: Boolean,
	number: Number
});

phone.methods.getSchema = function(){
	return this.schema;
}

module.exports =  mongoose.model("phone",phone);