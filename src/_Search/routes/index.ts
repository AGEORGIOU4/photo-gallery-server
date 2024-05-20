import express from 'express';
import SearchValidator from '../validator/validator'
import Middleware from '../../middleware/middleware';
import SearchController from '../controllers';

const router = express.Router();
const path = '/search';

router.post(path +
	'/create',
	SearchValidator.checkCreateSearch(),
	Middleware.handleValidationError,
	SearchController.create
);

router.get(path +
	'/read/:userId',
	SearchValidator.checkIdParam(),
	Middleware.handleValidationError,
	SearchController.readByID
);

router.delete(path +
	'/delete',
	// PhotoValidator.checkDeleteParams(),
	// Middleware.handleValidationError,
	SearchController.delete
);

export default router;
