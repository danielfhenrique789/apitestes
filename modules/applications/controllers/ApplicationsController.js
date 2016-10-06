(function(){
	const Class = require('./../../../library/framework/Class');
	const HelperJson = require('./../../general/helpers/JsonUtils');
	const RamdonGenerate = require('./../../general/utils/RamdonGenerate');
	const Applications = require('./../entities/Applications');
	const ApplicationsModel = require('./../models/Applications');
	const Controller = require('./../../../library/framework/controller');

	const App = Class.name("ApplicationsController").extends(Controller).begin(function(){
		
		const self = this;
		Controller.call(self);

		/**
		 * Rules.
		 */
		var rules = {logged:true,token:true};

		/**
		 * Add a person.
		 */
		self.index = function(request,response)
		{
			response.render("../modules/applications/views/index");
		}

		/**
		 * Add a person.
		 */
		self.add = function(request,response)
		{
			var applicationModel = new Applications(request.body);
			applicationModel.token = RamdonGenerate.GetAlphaNumericRamdon(23);
			applicationModel.active = true;
			ApplicationsModel.save(applicationModel,function(result){	response.json(result); });
		}

		/**
		 * Update a application by Id.
		 */
		self.updateById = function(request,response)
		{
			findById(request,response,function(resJson){
				if(resJson.status){
					var applicationModel = resJson.result;
					if(applicationModel){
						ApplicationsModel.findByIdAndUpdate(applicationModel,id,function(err,person)
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
		 * Find all applications.
		 */
		self.findAll = function(request,response)
		{
			var query = (request.body.query) ? request.body.query : {};
			var projection = request.body.projection ? request.body.projection : {};
			var showUser = request.body.showUser ? request.body.showUser : false;
			
			//console.log(applicationsModel);
			ApplicationsModel.find(query,projection,function(result){ response.json(result); });	
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

				ApplicationsModel.findOne(query,projection, function(result){ response.json(result); });			
				
			}
			else{
				response.json(HelperJson.buildErrorJson("Erro: _id inválido."));
			}
		}

		/**
		 * Find applications by mongo query.
		 */
		self.findByQuery = function(request,response)
		{
			findById(request,response,function(resJson){
				response.json(resJson);
			});
		}


		/**
		 * Remove applications by id.
		 */
		self.findByIdAndRemove = function(request,response)
		{
			var id = request.body._id;

			if(id){
				ApplicationsModel.findByIdAndRemove(id, function(result){ response.json(result); });					
			}
			else{
				response.json(HelperJson.buildErrorJson("Erro: _id inválido."));
			}
		}
	});
	module.exports = new App;
}())