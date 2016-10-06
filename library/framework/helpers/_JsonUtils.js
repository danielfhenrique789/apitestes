exports.buildErrorJson = function(message)
{
	return {status:false,msg:message};
}

exports.buildSuccessJson = function(message,result)
{
	if(result){
		if(Object.prototype.toString.call( result ) !== '[object Array]')
		{
			var toArray = [];
			toArray.push(result);
			result = toArray;
		}
		return {status:true,msg:message,result:{count:result.length,data:result}};
	}
	else
		return {status:true,msg:message};
}

exports.buildResultJson = function(result)
{
	if(Object.prototype.toString.call( result ) !== '[object Array]')
	{
		var toArray = [];
		toArray.push(result);
		result = toArray;
	}
	return {status:true,result:{count:result.length,data:result}};
}

exports.concat = function(obj1,obj2)
{
	var props = Object.keys(obj2); 
    for (var i = 0; i < props.length; i++) {
        obj1[props[i]] = obj2[props[i]];
    }
    return obj1;
}