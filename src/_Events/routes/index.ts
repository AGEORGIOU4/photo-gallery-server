import express from 'express';
import UserValidator from '../validator/validator';
import Middleware from '../../middleware/middleware';
import EventController from '../controllers';

const router = express.Router();
const path = '/event';

router.post(path + '/create',
	UserValidator.checkCreateEvent(),
	Middleware.handleValidationError,
	EventController.create
);

router.get(path + '/read',
	Middleware.handleValidationError,
	EventController.readPagination
);

export default router;
