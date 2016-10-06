//(function(){
var gExt;

var vClass = function(){}

vClass.prototype.name = function(name){
	exports.ClassName = name;
	var obj = {
		extends:fextends,
		begin:fbegin
	}
	return obj;
}

vClass.prototype.setExports = function(Super,exports){
	for(i in Super) exports[i] = Super[i];
}

var fConstructor = function(){	
	for(i in gExt){
		exports[i] = gExt[i];
	}
	return exports;
}

var fextends = function(ext){
	gExt = ext;
	var objExt = {
		begin:fbegin
	}
	return objExt;
}

var fbegin = function(begin){	
	if(begin)				
		begin(constructor);
	else
		begin();
}

var constructor = function(Super){
	var t = fConstructor();
	Super(t);
}

module.exports = new vClass;
//}());