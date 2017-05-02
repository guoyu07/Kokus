import { Router } from 'express';
import jsend from 'jsend';
export default ({ config, db }) => {
	let routes = Router();
	// add middleware here
	routes.use(jsend.middleware);

	return routes;
}
