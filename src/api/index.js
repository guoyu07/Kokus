import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import calendars from './calendars';
import events from './events';
import calendarsAdmin from './calendarsAdmin';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/calendars', calendars({ config, db }));
	api.use('/calendars/:calid/events', events({ config, db }));
	api.use('/admin/calendars', calendarsAdmin({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
