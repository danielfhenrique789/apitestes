(function(){
	const Class = require('./../../../library/framework/Class');
	const Crud = require('./../../../library/framework/Crud');
	const Applications = require('./../entities/Applications');

	const App = Class.name("Applications").extends(Crud).begin(function(constructor){
		const self = this;
		Crud.call(self,Applications);
	});
	module.exports = App;
}())