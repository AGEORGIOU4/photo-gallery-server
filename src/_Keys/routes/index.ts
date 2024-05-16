import express from 'express';
import KeyValidator from '../validator/validator';
import Middleware from '../../middleware/middleware';
import KeyController from '../controllers';

const router = express.Router();
const path = '/keys';

router.post(path +
	'/create',
	KeyValidator.checkCreateKey(),
	Middleware.handleValidationError,
	KeyController.create
);

router.get(path +
	'/read',
	KeyValidator.checkReadKey(),
	Middleware.handleValidationError,
	KeyController.readPagination
);

router.get(path +
	'/read/:id',
	KeyValidator.checkIdParam(),
	Middleware.handleValidationError,
	KeyController.readByID
);

router.put(path +
	'/update/:id',
	KeyValidator.checkIdParam(),
	Middleware.handleValidationError,
	KeyController.update
);

router.delete(path +
	'/delete/:id',
	KeyValidator.checkIdParam(),
	Middleware.handleValidationError,
	KeyController.delete
);

export default router;
