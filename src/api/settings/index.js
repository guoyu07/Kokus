import { Router } from 'express';
import { version, name, description } from '../../../package.json';
import keys from './keys';
import database from './database';

export default ({ config, db }) => {
	let settingsRouter = Router();

	settingsRouter.use('/keys', keys({ config }));
	settingsRouter.use('/database', database({ config }));

	// perhaps expose some API metadata at the root
	settingsRouter.get('/', (req, res) => {
		res.json({ name, description, version });
	});

	return settingsRouter;
};