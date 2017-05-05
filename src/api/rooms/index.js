import { Router } from 'express';
import rooms from './rooms';
import events from '../events/events';

export default ({ config }) => {
	let roomsRouter = Router();
	roomsRouter.use('/', rooms());
	roomsRouter.use('/:roomId/events', events());

	return roomsRouter;
};