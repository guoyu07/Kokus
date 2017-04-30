import resource from 'resource-router-middleware';
import authorizer from '../auth';

export default ({ config, db }) => resource({
	/** GET / - List all entities */
	index({ body }, res) {
        res.json({
            'status': 'error',
            'message': 'This route does not support GET'
        });
	},
	/** POST / - Create a new entity */
	create({ body }, res) {
        authorizer.authorizeApi(body.key, (err, token) => {
            if(token){
                res.json({
                   success: true,
                   message: 'Token will expire in ' + config.jwt.expire + ' minutes',
                   token
                });
            } else {
                res.json(err);
            }
        });
	},
	/** PUT /:id - Update a given entity */
	update({ body }, res) {
        res.json({
            'status': 'error',
            'message': 'This route does not support GET'
        });
	},
	/** DELETE /:id - Delete a given entity */
	delete({ body }, res) {
        res.json({
            'status': 'error',
            'message': 'This route does not support GET'
        });
	}
});
