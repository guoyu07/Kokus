import resource from 'resource-router-middleware';
import authorizer from '../auth';

export default ({ config, db }) => resource({
	/** GET / - List all entities */
	index({ body }, res) {
        res.jsend.error({'message': 'This route does not support GET'});
	},
	/** POST / - Create a new entity */
	create({ body }, res) {
        if(!body.key) return res.jsend.error("No API key in body");
        authorizer.authorizeApi(body.key, (err, token) => {
            if(!token) return res.jsend.error(err);
            res.jsend.success({
            // TODO: Fix this.. it will not send with config.jwt.expire, suspect its because of config change
            // expires:  config.jwt.expire,
            token: token
            });
        });
	},
	/** PUT /:id - Update a given entity */
	update({ body }, res) {
        res.jsend.error({'message': 'This route does not support PUT'});
	},
	/** DELETE /:id - Delete a given entity */
	delete({ body }, res) {
        res.jsend.error({'message': 'This route does not support DELETE'});
	}
});
