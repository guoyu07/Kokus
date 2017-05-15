import { Router } from 'express';
import v1 from './v1';

export default ({ config }) => {
	let versionRouter = Router();
	
	versionRouter.use('/v1', v1({ config }));

	return versionRouter;
}
