import resource from 'resource-router-middleware';
import roomEventsModel from '../../models/rooms/roomEvents';
import jsend from 'jsend';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'eventId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, eventId, callback) {
		// Get the room id from urls TODO: research a better way!
		let roomId = req.baseUrl.split("/")[3];
		roomEventsModel.read({ 'id': eventId, 'room_id': roomId }, (err, result) => {
			err = result.rowCount !== 0 ? null : jsend.error('Event with ID ' + eventId + ' doesnt exist!');
			callback(err, result.rows[0]);
		});
	},

	/** GET / - List all entities */
	index({ baseUrl }, res) {
		let roomId = baseUrl.split("/")[3];
		roomEventsModel.list({ 'room_id': roomId }, (err, data) => {
			err ? res.send(jsend.error(err)) : res.send(jsend.success(data.rows));
		});
	},

	/** POST / - Create a new entity */
	create({ body, baseUrl }, res) {
		body.room_id = baseUrl.split("/")[3]; 		
		roomEventsModel.create(body, (err, data) => {
			data = err ? jsend.error(err) : jsend.success(data);
			res.json(data);
		});
	},

	/** GET /:id - Return a given entity */
	read({ eventId }, res) {
		res.json(eventId);
	},

	/** PUT /:id - Update a given entity */
	update({ body, params }, res) {
		roomEventsModel.update({ 'id': params.eventId } , body, (err, data) => {
			err ? res.send(jsend.error(data)) : res.status(204).send(jsend.success(data));
		});
	},

	/** DELETE /:id - Delete a given entity */
	delete({ params }, res) {
		roomEventsModel.delete({'id': params.eventId }, (err, data) => {
			err ? res.send(jsend.error(data)) : res.status(204).send(jsend.success(data));
		});
	}
});
