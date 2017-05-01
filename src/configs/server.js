export default {
    "port": 5000,
	"bodyLimit": "100kb",
	"corsHeaders": ["Link"],
	"authorizeMethod":{
		"google": "jwt",
		"postgres": ""
	},
	"jwt": {
		"expire": 1440
	},
	"databaseSettings": {
		"databaseType": "pg",
		"host": "151.80.57.19",
		"port": "5432",
		"database": "admin_honeybase"
	},
	"googleInfo": {
		"subject": "ss@coworkingplus.dk",
		"credentials": "/home/thesinding/code/bookingBackend/src/credentials/moobook-d04d72b7dca7.json",
		"scopes": [
			"https://www.googleapis.com/auth/admin.directory.resource.calendar",
			"https://www.googleapis.com/auth/calendar"
			]
	} 
};