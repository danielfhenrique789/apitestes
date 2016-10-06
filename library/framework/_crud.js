var Class = require('./class');
var Model = require('./model');
var HelperJson = require('./helpers/JsonUtils');

Class.name("crud").extends(Model).begin(function(constructor){

	var model;

	constructor(function(Super)
	{	
		Class.setExports(Super,exports);
	});

	exports.setModel = function(value){ model = value;}

	exports.save = function(T,callback)
	{
		T.save(function(err,TReturn)
		{
			var result = null;
			if(err){
				result = HelperJson.buildErrorJson("registro não foi salvo. Erro: "+err);
			}
			else{
				result = HelperJson.buildSuccessJson("salva com sucesso!",TReturn);
			}
			callback(result);
		});
	}

	exports.update = function(T,conditions, update, options,callback)
	{
		T.update(conditions, update, options, function()
		{
			var result = null;
			if(err){
				result = HelperJson.buildErrorJson("registro não foi salvo. Erro: "+err);
			}
			else{
				result = HelperJson.buildSuccessJson("salva com sucesso!",TReturn);
			}
			callback(result);
		});
	}

	exports.findByIdAndUpdate = function(T,id,update,callback)
	{		
		T.findByIdAndUpdate(id, update, function (err, result) 
		{
		  if(err){
				callback(HelperJson.buildErrorJson("Erro ao atualizar registro. "+err));
			}
			else{
				callback(HelperJson.buildSuccessJson("atualizado com sucesso.",result));
			}
		});
	}

	exports.find = function(T,query,projection,callback)
	{
		T.find(query,projection,function(err,data){
			var result = null;
			if(err){
				result = HelperJson.buildErrorJson("Erro ao Listar. DbError: "+err);
			}
			else{
				result = HelperJson.buildResultJson(data);
			}			
			callback(result);
		});
	}

	exports.findOne = function(T,query,projection,callback)
	{
		T.findOne(query,projection,function(err,data){
			if(err){
				callback(HelperJson.buildErrorJson("Erro ao buscar. "+err));
			}
			else{
				callback(HelperJson.buildResultJson(data));
			}
		});
	}

	exports.remove = function(T,query,callback)
	{
		T.remove(query,function(err,result){
			if(err){
				callback(HelperJson.buildErrorJson("Erro ao remover registro. "+err));
			}
			else{
				callback(HelperJson.buildSuccessJson("removido com sucesso.",result));
			}
		});
	}

	exports.findByIdAndRemove = function(T,id,callback)
	{
		T.findByIdAndRemove(id,function(err,result){
			if(err){
				callback(HelperJson.buildErrorJson("Erro ao remover registro. "+err));
			}
			else{
				callback(HelperJson.buildSuccessJson("removido com sucesso.",result));
			}
		});
	}

});