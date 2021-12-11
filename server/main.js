import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	// code to run on server at startup
});

// Listen to incoming HTTP requests, can only be used on the server
WebApp.rawConnectHandlers.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type');
	return next();
});
