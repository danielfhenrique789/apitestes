
const assert = require('assert');
const mongoose = require("mongoose");
mongoose.connect('mongodb://Mac-mini-de-Daniel.local/add_people'); 

var Users = require('../modules/addpeople/entities/People');
var UsersModel = require('../modules/addpeople/models/Users');


var user1;
describe('Testes model addpeople/users.', function(){

	var user2;
	var user3;
	var usersModel;
	before(function(){
		user1 = new Users({
    "name": "Daniedeessl",
    "surname":"Fernanddes Henrique",
    "user": {
        "aptosys": "tBHWLiAgWZpm9oB",
        "aphesys": "852147",
        "last_access": "2016-06-23T05:25:27.881Z",
        "username": "danielfhenrique1@teste14s.com",
        "password": "123123456"
      },
    "emails":[
        {
            "email":"danielfhendrsdasdfe@teste45.com",
            "status":"Inativo"
        },
        {
            "email":"danielfhesnrsssa@ig.com.br",
            "status":"Ativdddo"
        }
    ],
    "nacionalities":[
        {
            "name":"Brasil",
            "capital":"Brasilia",
            "nationality":"Brasileira",
            "currency":"real",
            "currency_symbol":"R$"
        }    
    ],
    "phones":[
        {
            "number":"982281300",
            "city_code":"11",
            "country_code":"55",
            "is_mobile":true
        },
        {
            "number":"29191349",
            "city_code":"11",
            "country_code":"55",
            "is_mobile":false
        }
    ],
    "address":[
        {
            "street":"Rua Benito Silveira",
            "number":"46",
            "neibourhood":"Jd. Sapopemba",
            "postal_code":"03929-280",
            "city":"São Paulo",
            "State":"SP",
            "country":{
                "name":"Brasil",
                "capital":"Brasilia",
                "nationality":"Brasileira",
                "currency":"real",
                "currency_symbol":"R$"
            }
        }
    ]
});
		// user2 = new Users({
		// 	"nome":"Daniel Fernandes",
		//     "email":"danielfernandes@teste2.com",
		//     "senha":"teste123"
		// });
		// user3 = new Users({
		// 	"nome": "string", 
		// 	"email": "string", 
		// 	"senha": "senha", 
		// 	"telefones": [ { "numero": "123456789", "ddd": "11" } ] 
		// })
		usersModel = new UsersModel;
  	});

	it('Teste inserir usuario1. Deve inserir.', function(done){
		var usersModel = new UsersModel;
		usersModel.register(user1,function(result){
			assert.equal(201,result.statusCode);
			assert.equal(true,result.status);
			user1._id = result.result._id;
			done();
		});
	});

	it('Teste inserir usuario1 novamente. Não deve inserir.', function(done){
		var usersModel = new UsersModel;
		usersModel.register(user1,function(result){
			assert.equal(result.status, false);
			done();
		});
	});

	
});

describe('Testes authenticate users.', function(){

	//var user1;
	var user2;
	var user3;
	var usersModel;
	before(function(){
		// user1 = new Users({
		//     "name": "Daniedeessl",
		//     "user": {
		//         "aptosys": "tBHWLiAgWZpm9oB",
		//         "aphesys": "852147",
		//         "last_access": "2016-06-23T05:25:27.881Z",
		//         "username": "danielfhenrique1@teste14s.com",
  //       		"password": "123123456"		        
		//     }
		// });
  	});

	it('Teste autenticar usuario1. Deve autenticar.', function(done){
		var usersModel = new UsersModel;
		//user1.user.password = "123123456";
		var user1 = {username:"danielfhenrique1@teste14s.com",password:"123123456"};
		usersModel.authenticate(user1,function(result){
			assert.equal(200,result.statusCode);
			assert.equal(true,result.status);
			done();
		});
	});

	// it('Teste autenticar usuario1. Não deve autenticar.', function(done){
	// 	var usersModel = new UsersModel;
	// 	user1.senha = "152454";
	// 	usersModel.authenticate(user1,function(result){
	// 		assert.equal(result.status, false);
	// 		done();
	// 	});
	// });

	after(function(done){
		var usersModel = new UsersModel;
		usersModel.findByIdAndRemove(user1._id,function(result){	
			assert.equal(true,result.status);
			done();
		});
  	});

	
});