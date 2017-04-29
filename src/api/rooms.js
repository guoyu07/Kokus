import resource from 'resource-router-middleware';
import roomsModel from '../models/rooms';


export default ({ config }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'roomId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		roomsModel.read({ room_id: id }, (err, result) => {
			err = result ? null : { 'error' : 'Not found' };
			callback(err, result);
		});
	},

	/** GET / - List all entities */
	index({ params }, res) {
		roomsModel.list((err, data) => {
			data = err ? err : data;
			res.json(data);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		// The room details is in body
		roomsModel.create(body, (err, data) => {
			data = err ? err : data;
			res.json(data);
		});
	},

	/** GET /:id - Return a given entity */
	read({ roomId }, res) {
		res.json(roomId);
	},

	/** PUT /:id - Update a given entity */
	update({ roomId, params, body }, res) {		
		if(roomId.rowCount > 0){
			roomsModel.update({ "room_id": params.roomId }, body, (err, data) => {
				err ? res.json(err) : res.sendStatus(204);
			});
		} else {
			res.json({"Error": "Room " + params.roomId + " doesnt exist!"});
		}
	},

	/** DELETE /:id - Delete a given entity */
	delete({ roomId, params, body }, res) {
		if(roomId.rowCount > 0){
			roomsModel.delete({ "room_id": params.roomId }, (err, data) => {
				err ? res.json(err) : res.sendStatus(204);
			});
		} else {
			res.json({"Error": "Room " + params.roomId + " doesnt exist!"});
		}
	}
});
