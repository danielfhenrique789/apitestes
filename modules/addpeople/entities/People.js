var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var user = require('./Users');
var email = require('./../../general/entities/email');
var country = require('./../../general/entities/country');
var phone = require('./../../general/entities/phone');
var documents = require('./../../general/entities/documents');
var address = require('./../../general/entities/address');

var emailSchema = new email().getSchema();
var countrySchema = new country().getSchema();
var phoneSchema = new phone().getSchema();
var documentsSchema = new documents().getSchema();
var addressSchema = new address().getSchema();

var People = new Schema({
	name: String,
	surname: String,
	birth: Date,
	sex: String,
	emails: [emailSchema],
	user: user.getInstance(), 
	documents: [documentsSchema],
	nacionalities: [countrySchema],
	phones: [phoneSchema],
	address: [addressSchema],
	introduction: String,
	description: String,
	marital_status: String,
	status: String,
	active: Boolean
});

People.methods.addEmail = function(obj,callback){
	var error = null;
	var objPeople = this;
	emailValidate(obj,function(response){
		if(response.success){
			objPeople.emails.push(obj);
		}
		else 
			error = {msg:"Email Inválido. Erro:"+response.message};
		if(callback)
			callback(error);
	});	
}

People.methods.addCountry = function(obj,callback){
	var error = null;
	var objPeople = this;
	countryValidate(obj,function(response){
		if(response.success){
			objPeople.nacionalities.push(obj);
		}
		else 
			error = {msg:"Dados do país inválidos. Erro:"+response.message};
		if(callback)
			callback(error);
	});	
}

People.methods.addPhone = function(obj,callback){
	var error = null;
	var objPeople = this;
	phoneValidate(obj,function(response){
		if(response.success){
			objPeople.phones.push(obj);
		}
		else 
			error = {msg:"Dados de telefone inválidos. Erro:"+response.message};
		if(callback)
			callback(error);
	});	
}

People.methods.addAddress = function(obj,callback){
	var error = null;
	var objPeople = this;
	addressValidate(obj,function(response){
		if(response.success){
			objPeople.address.push(obj);
		}
		else 
			error = {msg:"Dados de endereço inválidos. Erro:"+response.message};
		if(callback)
			callback(error);
	});	
}

module.exports =  mongoose.model("People",People);

var emailValidate = function(obj,callback){
	var response = {success: true}
	if(!obj.email){
		response.success = false;
		response.message = "Campo email é obrigatório.";
	}
	callback(response);
}
var countryValidate = function(obj,callback){
	var response = {success: true}
	if(!obj.name){
		response.success = false;
		response.message = "Campo name é obrigatório.";
	}
	callback(response);
}
var phoneValidate = function(obj,callback){
	var response = {success: true}
	if(!obj.number){
		response.success = false;
		response.message = "Campo number é obrigatório.";
	}
	callback(response);
}
var addressValidate = function(obj,callback){
	var response = {success: true}
	if(!obj.street){
		response.success = false;
		response.message = "Campo street é obrigatório.";
	}
	callback(response);
}