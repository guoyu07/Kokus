import resource from 'resource-router-middleware';

export default ({ config }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'apikey',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let err = null;
		callback(err, id);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json({"blank": "blank"});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		res.json({"blank": "blank"});
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		res.json({"blank": "blank"});
	},

	/** PUT /:id - Update a given entity */
	update({ body }, res) {
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ facet }, res) {
		res.sendStatus(204);
	}
});
