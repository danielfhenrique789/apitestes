(function(){
const _extend = require('./Extend');

const vClass = function(){}

var gExt=null;
vClass.prototype.className;

vClass.prototype.name = function(name){
	vClass.className = name;
	return {
		extends:fextends,
		begin:fbegin
	}
}

var fextends = function(ext){
	gExt = ext;
	var objExt = {
		begin:fbegin
	}
	return objExt;
}

var fbegin = function(begin){
	if(gExt!=null)
		_extend(begin,gExt);
	return begin;
}

var constructor = function(Super){
	var t = fConstructor();
	Super(t);
}

module.exports = new vClass;
}())