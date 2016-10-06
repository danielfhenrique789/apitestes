(function(){
	const Class = require('./Class');

	const Crud = Class.name("Crud").begin(function(model){

		const self = this;
		if(model)
			self.model = model;
		else 
			console.log("Model não encontrado.");

		self.save = function(T,callback)
		{
			T.save(function(err,TReturn)
			{
				var result = null;
				if(err){
					callback({"message":"Registro não foi salvo. Erro: "+err,"status":false,"statusCode":404});
				}
				else{
					callback({"message":"Salvo com sucesso!","status":true,"result":TReturn,"statusCode":201});
				}
			});
		}

		self.update = function(T,conditions, update, options,callback)
		{
			T.update(conditions, update, options, function()
			{
				var result = null;
				if(err){
					callback({"message":"Registro não foi salvo. Erro: "+err,"status":false,"statusCode":404});
				}
				else{
					callback({"message":"Salvo com sucesso!","status":true,"result":TReturn,"statusCode":200});
				}
			});
		}

		self.findByIdAndUpdate = function(id,update,callback)
		{		
			self.model.findByIdAndUpdate(id, update, function (err, result) 
			{
			  if(err){
			  		callback({"message":"Erro ao atualizar registro. "+err,"status":false,"statusCode":404});
				}
				else{
					callback({"message":"Atualizado com sucesso.","status":true,"result":result,"statusCode":200});
				}
			});
		}

		self.find = function(query,projection,callback)
		{
			self.model.find(query,projection,function(err,data){
				var result = null;
				if(err){
					callback({"message":"Erro ao Listar. DbError: "+err,"status":false,"statusCode":404});
				}
				else{
					callback({"status":true,"result":data,"statusCode":200});
				}			
			});
		}

		self.findOne = function(query,projection,callback)
		{
			self.model.findOne(query,projection,function(err,data){
				if(err){
					callback({"message":"Erro ao buscar. "+err,"status":false,"statusCode":404});
				}
				else{
					callback({"result":data,"status":true,"statusCode":200});
				}
			});
		}

		self.remove = function(query,callback)
		{
			self.model.remove(query,function(err,result){
				if(err){
					callback({"message":"Erro ao remover registro. "+err,"status":false,"statusCode":404});
				}
				else{
					callback({"message":"Removido com sucesso.","status":true,"result":result,"statusCode":200});
				}
			});
		}

		self.findByIdAndRemove = function(id,callback)
		{
			self.model.findByIdAndRemove(id,function(err,result){
				if(err){
					callback({"message":"Erro ao remover registro. "+err,"status":false,"statusCode":404});
				}
				else{
					callback({"message":"Removido com sucesso.","status":true,"result":result,"statusCode":200});
				}
			});
		}

	});
	module.exports = Crud;
}())