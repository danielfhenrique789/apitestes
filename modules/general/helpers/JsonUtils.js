exports.buildErrorJson = function(message)
{
	return {status:false,msg:message};
}

exports.buildSuccessJson = function(message,result)
{
	if(result)
		return {status:true,msg:message,result:result};
	else
		return {status:true,msg:message};
}

exports.buildResultJson = function(result)
{
	return {status:true,count:result.length,result:result};
}

exports.concat = function(obj1,obj2)
{
	var props = Object.keys(obj2); 
    for (var i = 0; i < props.length; i++) {
        obj1[props[i]] = obj2[props[i]];
    }
    return obj1;
}