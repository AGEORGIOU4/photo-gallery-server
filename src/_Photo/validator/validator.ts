import { body, param, query } from 'express-validator';

class PhotoValidator {
	checkCreatePhoto() {
		return [
			body('id')
				.notEmpty()
				.withMessage('The value should be UUID v4'),
			body('info')
				.notEmpty()
				.withMessage('The info is required'),
			body('userId')
				.notEmpty()
				.withMessage('The userId is required'),
		];
	}

	checkReadPhoto() {
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
			param('userId')
				.notEmpty()
				.withMessage('The value should be not empty')
		];
	}
}

export default new PhotoValidator();
