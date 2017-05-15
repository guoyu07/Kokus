import { Router } from 'express';
import events from './events';
export default ({ config }) => {
	let eventsRouter = Router();

	eventsRouter.use('/', events({ config }));

	return eventsRouter;
};