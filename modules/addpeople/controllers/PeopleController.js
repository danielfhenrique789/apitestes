(function(){
	const Class = require('./../../../library/framework/Class');
	const HelperJson = require('./../../general/helpers/JsonUtils');
	const People = require('./../entities/People');
	const PeopleModel = require('./../models/People');
	const Controller = require('./../../../library/framework/controller');
	
	const Person = Class.name("PeopleController").extends(Controller).begin(function(constructor){

		const self = this;
		Controller.call(self);

		/**
		 * Rules.
		 */
		var rules = {logged:true,token:true};

		/**
		 * Add a person.
		 */
		self.add = function(request,response)
		{
			var personModel = new People(request.body);
			PeopleModel.save(personModel,function(result){	response.json(result); });
					
		}

		/**
		 * Update a person by Id.
		 */
		self.updateById = function(request,response)
		{
			findById(request,response,function(resJson){
				if(resJson.status){
					var personModel = resJson.result;
					if(personModel){
						personModel.save(function(err,person)
						{
							var res;
							if(err){
								res = HelperJson.buildErrorJson("Erro ao atualizar pessoa. Erro: "+err);
							}
							else{
								res = HelperJson.buildSuccessJson("Atualizado com sucesso!");
							}
							response.json(res);
						});
					}
				}
			});	
		}

		/**
		 * Find all people.
		 */
		self.findAll = function(request,response)
		{
			var query = (request.body.query) ? request.body.query : {};
			var projection = request.body.projection ? request.body.projection : {};
			var showUser = request.body.showUser ? request.body.showUser : false;
			var projection = getProjection(projection,showUser);
			peopleModel = new PeopleModel;
			peopleModel.find(query,projection,function(result){ response.json(result);	});	
		}

		/**
		 * Find person by Id.
		 */
		self.findById = function(request,response)
		{
			var id = request.body._id;

			if(id){
				var query = {'_id':id};
				var projection = request.body.projection ? request.body.projection : {};
				var showUser = request.body.showUser ? request.body.showUser : false;

				PeopleModel.findOne(query,getProjection(projection,showUser), function(result){ response.json(result); });			
			}
			else{
				response.json(HelperJson.buildErrorJson("Erro: _id inválido."));
			}
		}

		/**
		 * Find people by mongo query.
		 */
		self.findByQuery = function(request,response)
		{
			findById(people,request,response,function(resJson){
				response.json(resJson);
			});
		}


		/**
		 * Remove people by id.
		 */
		self.findByIdAndRemove = function(request,response)
		{
			var id = request.body._id;

			if(id){
				PeopleModel.findByIdAndRemove(id, function(result){ response.json(result); });					
			}
			else{
				response.json(HelperJson.buildErrorJson("Erro: _id inválido."));
			}
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
	module.exports = new Person;
}())
