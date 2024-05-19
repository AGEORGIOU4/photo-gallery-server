import express from 'express';
import PhotoValidator from '../validator/validator'
import Middleware from '../../middleware/middleware';
import PhotoController from '../controllers';

const router = express.Router();
const path = '/photo';

router.post(path +
	'/create',
	PhotoValidator.checkCreatePhoto(),
	Middleware.handleValidationError,
	PhotoController.create
);

router.get(path +
	'/read/:userId',
	PhotoValidator.checkIdParam(),
	Middleware.handleValidationError,
	PhotoController.readByID
);

router.delete(path +
	'/delete',
	// PhotoValidator.checkDeleteParams(),
	// Middleware.handleValidationError,
	PhotoController.delete
);

export default router;
