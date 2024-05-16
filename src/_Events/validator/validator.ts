import { body, param, query } from 'express-validator';

class EventValidator {
	checkCreateEvent() {
		return [
			body('id')
				.optional()
				.isUUID(4)
				.withMessage('The value should be UUID v4'),
			body('start_time')
				.optional()
				.notEmpty()
				.withMessage('The start time value should not be empty'),
			body('end_time')
				.optional()
				.notEmpty()
				.withMessage('The end time value should not be empty'),
			body('title')
				.optional()
				.notEmpty()
				.withMessage('The title value should not be empty'),
			body('description')
				.optional()
				.notEmpty()
				.withMessage('The description value should not be empty'),
			body('user_id')
				.optional()
				.notEmpty()
				.withMessage('The user_id value should not be empty'),
		];
	}
}

export default new EventValidator();
