import resource from 'resource-router-middleware';
import roomsModel from '../../models/rooms/rooms';

export default ({ config }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'roomId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		roomsModel.read({ room_id: id }, (err, result) => {
			// Check if the result from the database has any rows.
			err = result.rowCount !== 0 ? null :  {'status': 'error', 'message': 'Room with ID ' + id + ' doesnt exist!'};
			callback(err, result.rows[0]);
		});
	},

	/** GET / - List all entities */
	index({ params }, res) {
		roomsModel.list((err, data) => {
			if(err) return res.status(404).jsend.error(err);
			res.jsend.success(data);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		// The room details is in body
		roomsModel.create(body, (err, data) => {
			if(err) return res.jsend.status(404).error(err);
			res.jsend.success(data);
		});
	},

	/** GET /:id - Return a given entity */
	read({ roomId }, res) {
		res.jsend.success(roomId);
	},

	/** PUT /:id - Update a given entity */
	update({ roomId, params, body }, res) {
		roomsModel.update({ "room_id": roomId.room_id }, (err, data) => {
			if(err) return res.status(404).jsend.error(err);
			res.status(204).jsend.success(data);
		});
	},

	/** DELETE /:id - Delete a given entity */
	delete({ roomId, body }, res) {
		roomsModel.delete({ "room_id": roomId.room_id }, (err, data) => {
			if(err) return res.status(404).jsend.error(err);
			res.status(204).jsend.success(data);
		});
	}
});
