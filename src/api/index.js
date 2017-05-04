import { version, name, description } from '../../package.json';
import { Router } from 'express';
import calendars from './google/calendars';
import authenticate from './authenticate';
import events from './google/events';
import calendarsAdmin from './google/calendarsAdmin';
import rooms from './rooms/rooms';
import roomEvents from './rooms/events';
import settings from './settings';
import apikeyMiddleware from '../middleware/apikeyMiddleware';
import scopeMiddleware from '../middleware/scopeMiddleware';

export default ({ config, db }) => {
	let api = Router();
	// Make sure authenticate is not a protected route
	// eg it has to be above the middleware
	api.use('/authenticate', authenticate({ config }));
	
	// check api key
	api.use(apikeyMiddleware);
	// api.use(scopeMiddleware);
	
	
	// mount the facets resource
	api.use('/calendars', calendars({ config }));
	api.use('/calendars/:calid/events', events({ config }));
	api.use('/admin/calendars', calendarsAdmin({ config }));
	api.use('/rooms', rooms({ config }));
	api.use('/rooms/:roomid/events', roomEvents({ config }));
	api.use('/settings', settings({ config }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ name, description, version });
	});

	return api;
}
