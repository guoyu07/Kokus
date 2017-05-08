import resource from 'resource-router-middleware';
import eventsModel from '../../models/events/events';

export default () => resource({
	mergeParams: true,
	/** Property name to store preloaded entity on `request`. */
	id : 'eventId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, eventId, callback) {
		let data = { 'id': eventId };
		if(req.params.roomId){
			// Get roomid from parent router parameters
			data.room_id = req.params.room_id;
		}
		eventsModel.read(data, (err, result) => {
			if(err) callback(err, null);
			err = result.rowCount !== 0 ? null : {'status': 'error', 'message': 'Event with ID ' + eventId + ' doesnt exist!'};
			callback(err, result.rows[0]);
		});
	},

	/** GET / - List all entities */
	index({ query, params }, res) {
		let data = {};
		if(params.roomId){
			data.room_id = params.roomId;
		}
		eventsModel.list(data, query, (err, data) => {
			if(err) return res.status(404).jsend.error(err);
			res.jsend.success(data.rows);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		eventsModel.create(body, (err, data) => {
			if(err) return res.status(404).jsend.error(err);
			res.jsend.success(data.rows);
		});
	},

	/** GET /:id - Return a given entity */
	read({ eventId }, res) {
		res.jsend.success(eventId);
	},

	/** PUT /:id - Update a given entity */
	update({ body, params }, res) {
		eventsModel.update({ 'id': params.eventId } , body, (err, data) => {
			if(err) return res.status(404).jsend.error(err);
			res.jsend.success(data.rows);
		});
	},

	/** DELETE /:id - Delete a given entity */
	delete({ params }, res) {
		eventsModel.delete({'id': params.eventId }, (err, data) => {
			if(err) return res.status(404).jsend.error(err);
			res.jsend.success(data);
		});
	}
});
