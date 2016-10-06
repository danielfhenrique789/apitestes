var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var country = require('./country');

var countrySchema = new country().getSchema();

var documents = new Schema({
	name: String,
	description: String,
	code: [{name:String,code:String,description:String}],
	country: [countrySchema],
	organ: {name:String,description:String},
	vality: Date,
	created: Date,
	updated: Date,
	status: String,
	active: Boolean
});

documents.methods.getSchema = function(){
	return this.schema;
}

module.exports =  mongoose.model("documents",documents);