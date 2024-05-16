import express from 'express';
import ProtocolValidator from '../validator/validator';
import Middleware from '../../middleware/middleware';
import ProtocolController from '../controllers';

const router = express.Router();
const path = '/protocols';

router.post(path + '/create',
	ProtocolValidator.checkCreateProtocol(),
	Middleware.handleValidationError,
	ProtocolController.create
);

router.get(path + '/read',
	ProtocolValidator.checkRead(),
	Middleware.handleValidationError,
	ProtocolController.readPagination
);

router.get(path + '/read/id/:id',
	ProtocolValidator.checkIdParam(),
	Middleware.handleValidationError,
	ProtocolController.readByID
);

router.get(path + '/read/categories',
	Middleware.handleValidationError,
	ProtocolController.readCategories
);

router.get(path + '/read/authors',
	Middleware.handleValidationError,
	ProtocolController.readAuthors
);

router.get(path + '/filter/category/:category',
	Middleware.handleValidationError,
	ProtocolController.filterByCategory
);

router.get(path + '/filter/author/:author',
	Middleware.handleValidationError,
	ProtocolController.filterByAuthor
);

router.get(path + '/filter/date/from/:from/to/:to',
	Middleware.handleValidationError,
	ProtocolController.filterByDate
);

router.get(path + '/filter/rating/from/:from/to/:to',
	Middleware.handleValidationError,
	ProtocolController.filterByRating
);



export default router;
