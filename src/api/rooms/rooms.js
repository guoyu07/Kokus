import resource from 'resource-router-middleware';
import roomsModel from '../../models/rooms/rooms';
import jsend from 'jsend';

export default ({ config }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'roomId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		roomsModel.read({ room_id: id }, (err, result) => {
			// Check if the result from the database has any rows.
			err = result.rowCount !== 0 ? null : jsend.error('Room with ID ' + id + ' doesnt exist!');
			callback(err, result.rows[0]);
		});
	},

	/** GET / - List all entities */
	index({ params }, res) {
		roomsModel.list((err, data) => {
			err ? res.send(jsend.error(err)) : res.send(jsend.success(data.rows));
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		// The room details is in body
		roomsModel.create(body, (err, data) => {
			err ? res.send(jsend.error(err)) : res.send(jsend.success(data));
		});
	},

	/** GET /:id - Return a given entity */
	read({ roomId }, res) {
		res.send(jsend.success(roomId));
	},

	/** PUT /:id - Update a given entity */
	update({ roomId, params, body }, res) {
		roomsModel.update({ "room_id": roomId.room_id }, (err, data) => {
			err ? res.send(jsend.error(data)) : res.status(204).send(jsend.success(data));
		});
	},

	/** DELETE /:id - Delete a given entity */
	delete({ roomId, body }, res) {
		roomsModel.delete({ "room_id": roomId.room_id }, (err, data) => {
			err ? res.send(jsend.error(data)) : res.status(204).send(jsend.success(data));
		});
	}
});
