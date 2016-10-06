
const assert = require('assert');


var JsonUtils = require('../library/framework/helpers/JsonUtils');

describe('Testes classe JsonUtils.', function(){

	// it('Método buildErrorJson deve retornar false e mensagem.', function(){
	// 	const buildErrorJson = JsonUtils.buildErrorJson('teste');
	//     assert.equal(buildErrorJson.status, false);
	//     assert.equal(buildErrorJson.msg, "teste");
	//     assert.equal(Object.keys(buildErrorJson).length, 2);
	// });

	// it('Método buildSuccessJson sem result deve retornar status true e mensagem.', function(){
	// 	const buildSuccessJson = JsonUtils.buildSuccessJson('teste Suss');
	//     assert.equal(buildSuccessJson.status, true);
	//     assert.equal(buildSuccessJson.msg, "teste Suss");
	//     assert.equal(Object.keys(buildSuccessJson).length, 2);
	// });

	// it('Método buildSuccessJson com result deve retornar status true, mensagem e result.', function(){
	// 	const buildSuccessJson = JsonUtils.buildSuccessJson('teste Success',{teste:"test"});
	//     assert.equal(buildSuccessJson.status, true);
	//     assert.equal(buildSuccessJson.msg, "teste Success");
	//     assert.equal(Object.prototype.toString.call( buildSuccessJson.result.data ),'[object Array]');
	//     assert.equal(buildSuccessJson.result.count, 1);
	//     assert.equal(buildSuccessJson.result.data[0].teste, "test");
	//     assert.equal(Object.keys(buildSuccessJson).length, 3);
	// });

	// it('Método buildResultJson deve retornar status true, mensagem e result.', function(){
	// 	const buildResultJson = JsonUtils.buildResultJson([{teste:"teste"},{teste:"vai"}]);
	//     assert.equal(buildResultJson.status, true);
	//     assert.equal(Object.prototype.toString.call( buildResultJson.result.data ),'[object Array]');
	//     assert.equal(buildResultJson.result.count, 2);
	//     assert.equal(buildResultJson.result.data[1].teste, "vai");
	//     assert.equal(Object.keys(buildResultJson).length, 2);
	// });	

	it('Método concat deve retornar dois jsons concatenados.', function(){
		const concat = JsonUtils.concat({teste:"teste"},{teste1:"teste1"});
	    assert.equal(concat.teste, "teste");
	    assert.equal(concat.teste1, "teste1");	    
	});
});