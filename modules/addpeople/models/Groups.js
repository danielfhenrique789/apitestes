(function(){
	const Class = require('./../../../library/framework/Class');
	const Crud = require('./../../../library/framework/Crud');
	const Groups = require('./../../general/entities/Groups');

	const Group = Class.name("Groups").extends(Crud).begin(function(){
		const self = this;
		Crud.call(self,Groups);
	});
	module.exports = Group;
}())