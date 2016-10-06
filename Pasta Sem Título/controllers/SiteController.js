
exports.Index = function(request,response)
{
	if(!isLogged(request)){
		response.render("index",{error:null});
	}
	else{
		response.json({status: false, msg: "Busca não trouxe nenhum resultado."});
	}
}
exports.Register = function(request,response)
{

	var os = require("os");
	var hostname = os.hostname();
	//console.log("Hostname: "+hostname);
	response.render("register",{"host":hostname});
}
function isLogged(req){
	return req.session && req.session.user;
}