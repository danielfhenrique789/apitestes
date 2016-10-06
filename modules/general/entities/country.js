var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var country = new Schema({
	name: {type:String},
	capital: {type:String},
	nationality: {type:String},
	currency: {type:String},
	currency_symbol: {type:String},
	iso_code: {type:String},
	iso_lang_code: {type:String},
	phone_code: {type:String},
	time_zone:Number
});

country.methods.getSchema = function(){
	return this.schema;
}

module.exports =  mongoose.model("country",country);