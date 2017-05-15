import { version, name, description } from '../../../package.json';
import { Router } from 'express';
import auth from './auth';
import events from './events';
import rooms from './rooms';
import settings from './settings';
import apikeyMiddleware from '../../middleware/apikeyMiddleware';
import scopeMiddleware from '../../middleware/scopeMiddleware';

export default ({ config }) => {
	let api = Router();
	// Make sure authenticate is not a protected route
	// eg it has to be above the middleware

	api.use('/auth', auth({ config }));

	// check api key
	api.use(apikeyMiddleware);
	
	// api.use(scopeMiddleware);
	
	api.use('/rooms', rooms({ config }));
	api.use('/settings', settings({ config }));
	api.use('/events', events({ config }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ name, description, version });
	});

	return api;
}
