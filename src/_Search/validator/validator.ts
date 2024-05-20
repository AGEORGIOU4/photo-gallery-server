import { body, param, query } from 'express-validator';

class SearchValidator {
	checkCreateSearch() {
		return [
			body('userId')
				.notEmpty()
				.withMessage('The userId is required'),
			body('keywords')
				.notEmpty()
				.withMessage('The keyword is required'),
		];
	}

	checkIdParam() {
		return [
			param('userId')
				.notEmpty()
				.withMessage('The userId should be not empty')
		];
	}


	checkDeleteParams() {
		return [
			body('userId')
				.notEmpty()
				.withMessage('The value userId is required'),
		];
	}
}

export default new SearchValidator();
