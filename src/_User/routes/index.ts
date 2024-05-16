import express from 'express';
import UserValidator from '../validator/validator';
import Middleware from '../../middleware/middleware';
import UserController from '../controllers';

const router = express.Router();
const path = '/user';

router.post(path +
	'/create',
	UserValidator.checkCreateUser(),
	Middleware.handleValidationError,
	UserController.create
);

router.get(path +
	'/read',
	UserValidator.checkReadUser(),
	Middleware.handleValidationError,
	UserController.readPagination
);

router.get(path +
	'/read/:id',
	UserValidator.checkIdParam(),
	Middleware.handleValidationError,
	UserController.readByID
);

router.put(path +
	'/update/:id',
	UserValidator.checkIdParam(),
	Middleware.handleValidationError,
	UserController.update
);

router.delete(path +
	'/delete/:id',
	UserValidator.checkIdParam(),
	Middleware.handleValidationError,
	UserController.delete
);

export default router;
