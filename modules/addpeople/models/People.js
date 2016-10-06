(function(){
	const Class = require('./../../../library/framework/Class');
	const Crud = require('./../../../library/framework/Crud');
	const People = require('./../entities/People');

	const Person = Class.name("People").extends(Crud).begin(function(){
		const self = this;
		Crud.call(self,People);
	});
	module.exports = Person;
}())