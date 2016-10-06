(function(){
	module.exports = {
		"getResultJson" : function(objResult){
			if(!objResult.statusCode){
				console.log("statusCode não informado. "+JSON.stringify(objResult));
			}
			else if(!objResult.status){
				return buildErrorJson(objResult.message,objResult.statusCode);
			}
			else if(objResult.message){
				return buildSuccessJson(objResult.message,objResult.result,objResult.statusCode);
			}
			else{
				return buildResultJson(objResult.result,objResult.statusCode);
			}
		},
		"concat" : function(obj1,obj2){
			var props = Object.keys(obj2); 
		    for (var i = 0; i < props.length; i++) {
		        obj1[props[i]] = obj2[props[i]];
		    }
		    return obj1;
		}
	}
	function buildErrorJson(message,statusCode){
		if(!statusCode)
			statusCode = 404;
		return {status:false,message:message};
	}
	function buildResultJson(result,statusCode){
		if(!statusCode)
			statusCode = 200;
		if(Object.prototype.toString.call( result ) !== '[object Array]')
		{
			var toArray = [];
			toArray.push(result);
			result = toArray;
		}
		return {status:true,result:{count:result.length,data:result}};
	}
	function buildSuccessJson(message,result,statusCode){
		if(!statusCode)
			statusCode = 200;
		if(result){
			if(Object.prototype.toString.call( result ) !== '[object Array]')
			{
				var toArray = [];
				toArray.push(result);
				result = toArray;
			}
			return {status:true,message:message,result:{count:result.length,data:result}};
		}
		else
			return {status:true,message:message};
	}
}())