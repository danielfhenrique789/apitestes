var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var people_groups = new Schema({
	name: String,
	created: Date,
	modified: Date,
	people: [{person:Schema.Types.ObjectId,inserted:Date,removed:Date}],
	status: String,
	active: Boolean
});

module.exports =  mongoose.model("people_groups",people_groups);