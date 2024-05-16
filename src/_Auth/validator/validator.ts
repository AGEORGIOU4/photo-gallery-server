import { body, param, query } from 'express-validator';

class AuthValidator {
	checkRegisterUser() {
		return [
			body('job_position')
				.notEmpty()
				.withMessage({ error: 'The job position value should not be empty', status: 406 }),
			body('firstName')
				.notEmpty()
				.withMessage({ error: 'The first name value should not be empty', status: 406 }),
			body('lastName')
				.notEmpty()
				.withMessage({ error: 'The last name value should not be empty', status: 406 }),
			body('email')
				.notEmpty()
				.withMessage({ error: 'The email value should not be empty', status: 406 }),
			body('username')
				.notEmpty()
				.withMessage({ error: 'The username value should not be empty', status: 406 }),
			body('password')
				.notEmpty()
				.withMessage({ error: 'The password value should not be empty', status: 406 }),
			body('organization')
				.notEmpty()
				.withMessage({ error: 'The organization value should not be empty', status: 406 }),
		];
	}

	checkLoginUser() {
		return [
			body('username')
				.notEmpty()
				.withMessage({ error: 'The username value should not be empty', status: 406 }),
			body('password')
				.notEmpty()
				.withMessage({ error: 'The password value should not be empty', status: 406 }),
		];
	}

	checkLogoutUser() {
		return [
			body('refresh_token')
				.notEmpty()
				.withMessage({ error: 'The refresh token value should not be empty', status: 406 }),
		];
	}

	checkToken() {
		return [
			body('token')
				.notEmpty()
				.withMessage({ error: 'The token value should not be empty', status: 406 }),
		];
	}

	checkRefreshToken() {
		return [
			body('refresh_token')
				.notEmpty()
				.withMessage({ error: 'The refresh token value should not be empty', status: 406 }),
		];
	}

	checkID() {
		return [
			param('id')
				.notEmpty()
				.withMessage({ error: 'The id value should not be empty', status: 406 }),
		];
	}

	checkResetPassword() {
		return [
			body('type')
				.notEmpty()
				.withMessage({ error: 'The type value should not be empty', status: 406 }),
			body('value')
				.notEmpty()
				.withMessage({ error: 'The value should not be empty', status: 406 }),
			body('temporary')
				.notEmpty()
				.withMessage({ error: 'The temporary value should not be empty', status: 406 }),
			param('id')
				.notEmpty()
				.withMessage({ error: 'The id value should not be empty', status: 406 }),
		];
	}

	checkGetUserByUsername() {
		return [
			param('username')
				.notEmpty()
				.withMessage({ error: 'The username value should not be empty', status: 406 }),
		];
	}

	checkGetUserByEmail() {
		return [
			param('email')
				.notEmpty()
				.withMessage({ error: 'The email value should not be empty', status: 406 }),
		];
	}
}

export default new AuthValidator();
