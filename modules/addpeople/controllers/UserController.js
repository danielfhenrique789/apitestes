(function(){
	const HelperJson = require('./../../../library/framework/helpers/JsonUtils');
	const Class = require('./../../../library/framework/Class');
	const Email = require('./../../general/entities/email');
	const log = require('./../models/log');
	const Users = require('./../entities/People');
	const UserModel = require('./../models/Users');
	const People = require('./PeopleController');
	const Controller = require('./../../../library/framework/controller');

	const User = Class.name("UserController").extends(Controller).begin(function(constructor){

		const self = this;
		Controller.call(self);

		/**
		 * Rules.
		 */
		var rules = {logged:true,token:true};

		self.Authenticate = function(request,response)
		{	
			if(request.session && request.session.user)
			{
				response.json(HelperJson.getResultJson({"message":"Usuário já se encontra logado.","status":false,"statusCode":404}));
			}
			else
			{
				var user = {username:request.body.username,password:request.body.password};
				var userModel = new UserModel;
				userModel.authenticate(user,function(result){ 
					if(result.status){
						request.session.reset();
						request.session.user = user;
						//response.json(HelperJson.getResultJson(result.msg,{data:result.result.user.aptosys}));
						response.status(result.statusCode).send(HelperJson.getResultJson(result));
					}
					else{
						response.json(result); 
					}
				});
			}
		}

		self.Logout = function(request,response)
		{
			request.session.reset();
			response.json(HelperJson.buildSuccessJson("Logout realizado com sucesso."));
		}

		self.Register = function(request,response)
		{
			var user = new Users(request.body);
			var userModel = new UserModel;
			if(request.get("aphesys")){
				user.user.aphesys = request.get("aphesys");
				user.user.aptosys = RamdonGenerate.GetAlphaNumericRamdon(15);
			}

			userModel.register(user,function(result){
				request.session.reset();
				request.session.user = user;
				response.status(result.statusCode).send(HelperJson.getResultJson(result));
			});
		}

		/**
		 * Find all people.
		 */
		self.findAll = function(request,response)
		{
			var userRule = {user:{"$exists":true}};
			var query = (request.body.query) ? HelperJson.concat(request.body.query,userRule) : userRule;
			var projection = request.body.projection ? request.body.projection : {};
			var showUser = true;
			var projection = getProjection(projection,showUser);
			var userModel = new UserModel;
			userModel.find(query,projection,function(result){ response.json(result); });	
		}

		function consoleError(error){
			if(error)
			console.log(error);
		}

		var getProjection = function(projection,showUser){	
			if(!showUser){
				return HelperJson.concat(projection,{"user":0});
			}
			else{
				return HelperJson.concat(projection,{"user.password":0});
			}
		}
	});
	module.exports = new User;
}())

