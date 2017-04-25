import resource from 'resource-router-middleware';
import roomsModel from '../models/rooms';


export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'roomId',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		console.log(id);
		roomsModel.read({ id: id }, (err, result) => {
			err = result ? null : { 'error' : 'Not found' };
			callback(err, result);
		});
	},

	/** GET / - List all entities */
	index({ params }, res) {
		roomsModel.list((err, data) => {
			res.json(data);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		res.json({"error": "Not supported yet"});
	},

	/** GET /:id - Return a given entity */
	read({ roomId }, res) {
		res.json(roomId);
	},

	/** PUT /:id - Update a given entity */
	update({ roomId, body }, res) {
		// res.sendStatus(204);
		res.json({"error": "Not supported yet"});
	},

	/** DELETE /:id - Delete a given entity */
	delete({ roomId }, res) {
		// res.sendStatus(204);
		res.json({"error": "Not supported yet"});
	}
});
