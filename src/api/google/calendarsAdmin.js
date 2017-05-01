import resource from 'resource-router-middleware';
import googleCalendarsAdmin from '../../models/google/calendarsAdmin';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'facet',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		// Get a calendar resource id
		googleCalendarsAdmin.get(id, (err, calendar) => {
			callback(err, calendar);
		});
	},

	/** GET / - List all entities */
	index({ params }, res) {
		googleCalendarsAdmin.list((err, calendars) => {
			res.json(calendars.items);
		});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		res.json({"Error": "Not supported"});
	},

	/** GET /:id - Return a given entity */
	read({ facet }, res) {
		
		res.json(facet);
	},

	// /** PUT /:id - Update a given entity */
	// update({ facet, body }, res) {
	// 	for (let key in body) {
	// 		if (key!=='id') {
	// 			facet[key] = body[key];
	// 		}
	// 	}
	// 	res.sendStatus(204);
	// },

	// /** DELETE /:id - Delete a given entity */
	// delete({ facet }, res) {
	// 	facets.splice(facets.indexOf(facet), 1);
	// 	res.sendStatus(204);
	// }
});
