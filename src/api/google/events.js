import resource from 'resource-router-middleware';
import googleEventsModel from '../../models/google/events';


export default ({ config }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'eventId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, eventId, callback) {
		// Get a calendar resource id
		let calendarId = req.baseUrl.split("/")[3];
		googleEventsModel.get(calendarId, eventId, (err, event) => {
			callback(err, event);
		});
	},

	/** GET / - List all entities */
	index({ params, baseUrl }, res) {
		let calendarId = baseUrl.split("/")[3];
		googleEventsModel.list(calendarId, (err, events) => {
			events ? res.json(events) : res.json(err);
		});
	},

	/** POST / - Create a new entity */
	create({ body, baseUrl }, res) {
		body.calendarId = baseUrl.split("/")[3]; 		
		googleEventsModel.create(body, (err, event) => {
			event ? res.json(event) : res.json(err);
		});
	},

	/** GET /:id - Return a given entity */
	read({ eventId }, res) {
		res.json(eventId);
	},

	/** PUT /:id - Update a given entity */
	update({ body, params, baseUrl }, res) {
		body.calendarId = baseUrl.split("/")[3];
		body.eventId = params.eventId;	
		googleEventsModel.update(body, (err, event) => {
			event ? res.json(event) : res.json(err);
		});
	},

	/** DELETE /:id - Delete a given entity */
	delete({ params, baseUrl }, res) {
		let calendarId = baseUrl.split("/")[3];
		let event = {
			calendarId,
			eventId: params.eventId
		};
		googleEventsModel.delete(event, (err, event) => {
			err ? res.json(err) : res.sendStatus(204);
		});
	}
});
