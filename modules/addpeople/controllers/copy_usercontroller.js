var HelperJson = require('./../../general/helpers/JsonUtils');
var RamdonGenerate = require('./../../general/utils/RamdonGenerate');
var Class = require('./../../general/utils/Class');
var Email = require('./../../general/entities/email');
var log = require('./../models/log');
var bcrypt = require('bcryptjs');
var users = require('./../entities/people');
var People = require('./PeopleController');

Class.name("UserController").extends(People).begin(function(constructor){

	var funcPeople;

	constructor(function(Super)
	{	
		Class.setExports(Super,exports);
		funcPeople = Super;
		delete exports['add'];
	});

	exports.Authenticate = function(request,response)
	{	

		if(request.session && request.session.user)
		{
			response.json(HelperJson.buildErrorJson("Usuário já se encontra logado."));
		}
		else
		{
			users.findOne({"user.username": request.body.username},function(err,user){
			var msgErrorLogin = "Email ou senha inválido.";
				if(err){
					console.log("Erro ao logar: "+err);
				}
				if(!user){				
						var log1 = new log;
							log1.action = "User.Authenticate";
							log1.params = {username:request.body.username,password:request.body.password};
							log1.result = HelperJson.buildErrorJson(msgErrorLogin);
							log1.save();
					response.json(HelperJson.buildErrorJson(msgErrorLogin));			
				}
				else{
					if(bcrypt.compareSync(request.body.password,user.user.password)){
						request.session.reset();
						user.user.last_access = Date.now();
						user.save(function(error,user){
							request.session.user = user;
							var log1 = new log;
							log1.action = "User.Authenticate";
							log1.params = user.user;
							log1.result = HelperJson.buildSuccessJson("Usuário Logado com sucesso.");
							log1.save();
							response.json(HelperJson.buildSuccessJson("Usuário Logado com sucesso.",{data:user.user.aptosys}));
						});
					}
					else{
						var log1 = new log;
							log1.action = "User.Authenticate";
							log1.params = user.user;
							log1.result = HelperJson.buildErrorJson(msgErrorLogin);
							log1.save();
						response.json(HelperJson.buildErrorJson(msgErrorLogin));
					}
				}		
			});
		}
	}

	exports.Logout = function(request,response)
	{
		request.session.reset();
		response.json(HelperJson.buildSuccessJson("Logout realizado com sucesso."));
	}

	exports.Register = function(request,response)
	{
		if(request.body.password == request.body.passwordconfirm)
		{
			var model = getUserModel(new users,request);
			model.save(function(error,user){
				if(error){
					var log1 = new log;
					log1.action = "User.Register";
					log1.params = {username:request.body.username,password:request.body.password};
					log1.result = HelperJson.buildErrorJson("Erro ao salvar usuario: "+error);
					log1.save();
					response.json(HelperJson.buildErrorJson("Erro ao salvar registro: "));
				}
				else{
					request.session.user = user;
					response.json(HelperJson.buildSuccessJson("Usuário inserido com sucesso.",{data:user.user.aptosys}));
				}
			});
		}
		else
		{
			response.json(HelperJson.buildErrorJson("Senhas não conferem"));
		}
	}

	exports.findAll = function(request,response)
	{
		request.body.showUser = true;
		var userRule = {user:{"$exists":true}};
		request.body.query = (request.body.query) ? HelperJson.concat(request.body.query,userRule) : userRule;
		funcPeople["findAll"](request,response);
	}

	function getUserModel(users,request)
	{
		users.name = request.body.name;
		// var email = new Email({
		// 	email: request.body.email,
		// 	status: "Ativo"
		// });
		// var email2 = new Email({
		// 	email: "puts@carai.com",
		// 	status: "Eita"
		// });
		// var email1 = new Email({
		// 	status: "Teste"
		// });
		var email = {email:request.body.email,status:"Ativo"};
		users.emails.push(email);
		// users.addEmail(email,consoleError);
		// users.addEmail(email1,consoleError);
		// users.addEmail(email2,consoleError);
		var hash = bcrypt.hashSync(request.body.password,bcrypt.genSaltSync(10));
		users.user.username = request.body.email;
		users.user.password = hash;
		users.user.last_access = Date.now();
		if(request.get("aphesys"))
			users.user.aphesys = request.get("aphesys");
		if(request.get("aphesys")){
			users.user.aptosys = RamdonGenerate.GetAlphaNumericRamdon(15);
		}
		console.log(users);
		return users;
	}

	function consoleError(error){
		if(error)
		console.log(error);
	}
});


