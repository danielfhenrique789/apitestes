
const assert = require('assert');


var Class = require('../library/framework/class');

describe('Testes objeto class.', function(){

	it('Método name deve retornar um json com duas funções, "extends" e "begin".', function(){
		const objClass = Class.name("testeClass");
		assert.equal(Object.prototype.toString.call( objClass),'[object Object]');
		assert.equal(Object.keys(objClass).length,2);
		assert.equal(typeof objClass.extends,'function');
		assert.equal(typeof objClass.begin,'function');
	});


	
});