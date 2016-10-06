(function(){
	const Site = require("./controllers/SiteController");
	const User = require("./modules/addpeople/controllers/UserController");
	const People = require("./modules/addpeople/controllers/PeopleController");
	const Groups = require("./modules/addpeople/controllers/GroupsController");
	const Applications = require("./modules/applications/controllers/ApplicationsController");
	//var appp = new Applications;
	module.exports = function(app){
		app.get('/',Site.Index);

		//Applications
		app.get('/api/applications',Applications.index);
		app.post('/api/applications/add',Applications.add);

		//Users
		app.get('/register',Site.Register);	
		app.post('/register',User.Register);
		app.post('/api/login/register',User.Register);
		app.get('/authenticate',Site.Index);
		app.post('/authenticate',User.Authenticate);
		app.post('/api/login/authenticate',User.Authenticate);
		app.get('/logout',User.Logout);

		//People
		app.post('/api/people/add',People.add);
		app.get('/api/user/find/all',User.findAll);
		app.post('/api/user/find/all',User.findAll);
		app.get('/api/people/find/all',People.findAll);
		app.post('/api/people/find/all',People.findAll);
		app.post('/api/people/find/id',People.findById);
		app.post('/api/people/remove/id',People.findByIdAndRemove);

		//People Groups
		app.post('/api/people/groups/add',Groups.add);
		app.get('/api/people/groups/find/all',Groups.findAll);
		app.post('/api/people/groups/find/all',Groups.findAll);
	}
}())