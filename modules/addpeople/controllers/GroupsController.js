(function(){
	const Class = require('./../../../library/framework/Class');
	const HelperJson = require('./../../general/helpers/JsonUtils');
	const Groups = require('./../../general/entities/Groups');
	const GroupsModel = require('./../models/Groups');
	const Controller = require('./../../../library/framework/controller');

	const Group = Class.name("GroupsController").extends(Controller).begin(function(constructor){
		
		const self = this;
		Controller.call(self);

		const GroupType = "groups";

		/**
		 * Rules.
		 */
		var rules = {logged:true,token:true};

		/**
		 * Add a person.
		 */
		self.add = function(request,response)
		{
			var groupModel = new Groups(request.body);
			groupModel.type = "people";
			GroupsModel.save(groupModel,function(result){	response.json(result); });
		}

		/**
		 * Update a group by Id.
		 */
		self.updateById = function(request,response)
		{
			findById(request,response,function(resJson){
				if(resJson.status){
					var groupModel = resJson.result;
					if(groupModel){
						groupModel.type = "people";
						GroupsModel.findByIdAndUpdate(groupModel,id,function(err,person)
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
		 * Find all groups.
		 */
		self.findAll = function(request,response)
		{
			var query = (request.body.query) ? request.body.query : {};
			var projection = request.body.projection ? request.body.projection : {};
			var showUser = request.body.showUser ? request.body.showUser : false;
			
			//console.log(GroupsModel);
			GroupsModel.find(query,projection,function(result){ response.json(result); });	
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

				GroupsModel.findOne(query,projection, function(result){ response.json(result); });			
				
			}
			else{
				response.json(HelperJson.buildErrorJson("Erro: _id inválido."));
			}
		}

		/**
		 * Find groups by mongo query.
		 */
		self.findByQuery = function(request,response)
		{
			findById(request,response,function(resJson){
				response.json(resJson);
			});
		}


		/**
		 * Remove groups by id.
		 */
		self.findByIdAndRemove = function(request,response)
		{
			var id = request.body._id;

			if(id){
				GroupsModel.findByIdAndRemove(id, function(result){ response.json(result); });					
			}
			else{
				response.json(HelperJson.buildErrorJson("Erro: _id inválido."));
			}
		}
	});
	module.exports = new Group;
}())