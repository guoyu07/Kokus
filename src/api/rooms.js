import resource from 'resource-router-middleware';
import roomsModel from '../models/rooms';
import jsend from 'jsend';

export default ({ config }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'roomId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		roomsModel.read({ room_id: id }, (err, result) => {
			err = result ? null : jsend.error('Not found!');
			if(result.rowCount > 0){
				callback(err, result.rows[0]);
			} else {
				callback(err, jsend.error("Room " + id + " doesnt exist!"));
			}
		});
	},

	/** GET / - List all entities */
	index({ params }, res) {
		roomsModel.list((err, data) => {
			data = err ? jsend.error(err) : jsend.success(data.rows);
			res.json(data);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		// The room details is in body
		roomsModel.create(body, (err, data) => {
			data = err ? jsend.error(err) : jsend.success(data);
			res.json(data);
		});
	},

	/** GET /:id - Return a given entity */
	read({ roomId }, res) {
		res.json(roomId);
	},

	/** PUT /:id - Update a given entity */
	update({ roomId, params, body }, res) {	
		if(roomId.status == 'error'){
			res.send(roomId);
		} else {	
			roomsModel.update({ "room_id": roomId.room_id }, (err, data) => {
				err ? res.send(jsend.error(data)) : res.status(204).send(jsend.success(data));
			});
		}
	},

	/** DELETE /:id - Delete a given entity */
	delete({ roomId, body }, res) {
		if(roomId.status == 'error'){
			res.send(roomId);
		} else {
			roomsModel.delete({ "room_id": roomId.room_id }, (err, data) => {
				err ? res.send(jsend.error(data)) : res.status(204).send(jsend.success(data));
			});
		}
	}
});
