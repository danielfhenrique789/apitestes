(function(){
	const Class = require('./Class');

	const FController = Class.name("FController").begin(function(){

		const self = this;

		self.setPermissions = function(permissions){
			if(permissions){
				self.permissions = permissions;
			}
		}

		self.setMethods = function(methods){
			self.methods = methods;
		}

		self.action = function(actionName){
			if(self.permissions){
				obj
			}
		}

		self.callMethod = function(methodName){
			self.methods[methodName]();
		}

	});

	module.exports = FController;
}())