import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import serverConfig from './configs/server';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: serverConfig.corsHeaders
}));

app.use(bodyParser.json({
	limit : serverConfig.bodyLimit
}));

// connect to db
initializeDb( db => {

	// internal middleware
	app.use(middleware({ serverConfig, db }));
	
	// api router
	app.use('/api', api({ serverConfig, db }));

	app.server.listen(process.env.PORT || serverConfig.port);

	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
