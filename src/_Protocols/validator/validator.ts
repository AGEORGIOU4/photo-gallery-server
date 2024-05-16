import { body, param, query } from 'express-validator';

class ProtocolValidator {
	checkCreateProtocol() {
		return [
			body('id')
				.optional()
				.isUUID(4)
				.withMessage('The value should be UUID v4'),
			body('name')
				.notEmpty()
				.withMessage('The name value should not be empty'),
			body('category')
				.notEmpty()
				.withMessage('The category value should not be empty'),
			body('author')
				.optional()
				.notEmpty()
				.withMessage('The author value should not be empty'),
			body('rating')
				.notEmpty()
				.withMessage('The rating value should not be empty'),
			body('json')
				.notEmpty()
				.withMessage('The json value should not be empty'),
		];
	}
	checkRead() {
		return [
			query('limit')
				.optional()
				.isInt({ min: 1, max: 10 })
				.withMessage('The limit value should be number and between 1-10'),
			query('offset')
				.optional()
				.isNumeric()
				.withMessage('The value should be number'),
		];
	}
	checkIdParam() {
		return [
			param('id')
				.notEmpty()
				.withMessage('The value should be not empty')
				.isUUID(4)
				.withMessage('The value should be uuid v4'),
		];
	}
}

export default new ProtocolValidator();
