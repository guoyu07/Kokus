import { version, name, description } from '../../package.json';
import { Router } from 'express';
import calendars from './calendars';
import events from './events';
import calendarsAdmin from './calendarsAdmin';
import rooms from './rooms';
import roomEvents from './rooms/events';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/calendars', calendars({ config }));
	api.use('/calendars/:calid/events', events({ config }));
	api.use('/admin/calendars', calendarsAdmin({ config }));
	api.use('/rooms', rooms({ config }));
	api.use('/rooms/:roomid/events', roomEvents({ config }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ name, description, version });
	});

	return api;
}
