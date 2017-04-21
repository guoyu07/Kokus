import resource from 'resource-router-middleware';
import eventsModel from '../models/events';


export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'event',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, eventId, callback) {
		// Get a calendar resource id
		let calendarId = req.baseUrl.split("/")[3];
		eventsModel.get(calendarId, eventId, (err, event) => {
			callback(err, event);
		});
	},

	/** GET / - List all entities */
	index({ params, baseUrl }, res) {
		let calendarId = baseUrl.split("/")[3];
		eventsModel.list(calendarId, (err, events) => {
			res.json(events);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.calendarId = baseUrl.split("/")[3]; 		
		eventsModel.create(body, (err, event) => {
			event ? res.json(event) : res.json(err);
		});
	},

	/** GET /:id - Return a given entity */
	read({ event }, res) {
		res.json(event);
	},

	/** PUT /:id - Update a given entity */
	update({ facet, body }, res) {
		console.log("update");
		for (let key in body) {
			if (key!=='id') {
				facet[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete(id, res) {
		console.log(body);
		res.sendStatus(204);
	}
});
