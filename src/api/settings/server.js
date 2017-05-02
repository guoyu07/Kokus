import resource from 'resource-router-middleware';
import { serverSettingsModel } from '../../models/settings';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'setting',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		serverSettingsModel.find(id, (err, setting) => {
			callback(err, setting);
        });
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.jsend.success(serverSettingsModel.getAll());
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		res.status(404).jsend.error('POST Not supported!');
	},

	/** GET /:id - Return a given entity */
	read({ setting }, res) {
		res.jsend.success(setting);
	},

	/** PUT /:id - Update a given entity */
	update({ body }, res) {
        // serverSettingsModel.set(body.setting, body.value);
		res.status(404).jsend.error('PUT Not supported yet!');
        
		// res.status(204).jsend.success({ messsage: 'Setting updated!' });
	},

	/** DELETE /:id - Delete a given entity */
	delete({ setting }, res) {
		res.status(404).jsend.error('DELETE Not supported!');
	}
});
