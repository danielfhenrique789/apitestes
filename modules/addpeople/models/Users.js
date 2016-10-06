(function(){
	const Class = require('./../../../library/framework/Class');
	const People = require('./People');
	//const Users = require('./../entities/People');
	const HelperJson = require('./../../general/helpers/JsonUtils');
	const RamdonGenerate = require('./../../general/utils/RamdonGenerate');
	const bcrypt = require('bcryptjs');

	const User = Class.name("Users").extends(People).begin(function(){

		const self = this;
		People.call(self);
		
		self.authenticate = function(pUser,callback)
		{
			console.log(pUser);
			self.findOne({"user.username": pUser.username},{},function(result)
			{		
				var msgErrorLogin = "Email ou senha inválido.";
				if(!result.status){
					callback(result);
				}
				else{
					user = result.result;
					if(bcrypt.compareSync(pUser.password,user.user.password)){
						user.user.last_access = Date.now();
						self.save(user,function(result){ result.statusCode=200; callback(result); });
					}
					else{
						callback({"message":msgErrorLogin,"status":false,"statusCode":401});
					}
				}		
			});
		}

		self.register = function(pUser,callback)
		{
			self.findOne({"user.username": pUser.user.username},{},function(result){
				if(result.status && result.result != null){
					callback({"message":"Username já cadastrado.","status":false,"statusCode":401});
				}
				else{
					pUser.user.last_access = Date.now();
					pUser.user.password = bcrypt.hashSync(pUser.user.password,bcrypt.genSaltSync(10));
					self.save(pUser,function(result){
						//response.json(HelperJson.buildSuccessJson(result.msg,{data:result.result.user.aptosys})); 
						callback(result);
					});
				}
			});
			
		}

	});
	module.exports = User;
}())