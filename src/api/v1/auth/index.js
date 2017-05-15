import apiAuth from './apiAuth';
import licenseAuth from './licenseAuth';
import { Router } from 'express';

export default ({ config }) => {
	let authRouter = Router();

	authRouter.use('/tablet', licenseAuth({ config }));
	authRouter.use('/api', apiAuth({ config }));


	return authRouter;
};