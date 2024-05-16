import { Request, Response } from "express";
import { handleErrors, handleSuccess } from "../../helpers/helpers";
const axios = require('axios');
const qs = require('qs');

class AuthController {

	async adminToken(req: Request, res: Response) {
		let data = qs.stringify({
			'client_id': process.env.ADMIN_CLIENT_ID,
			'client_secret': process.env.ADMIN_CLIENT_SECRET,
			'grant_type': 'client_credentials'
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/realms/vitale/protocol/openid-connect/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/admin-token', response.data);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/admin-token', 'Failed to retrieve token');
			});
	}

	async defaultToken(req: Request, res: Response) {
		let data = qs.stringify({
			'client_id': process.env.USER_CLIENT_ID,
			'client_secret': process.env.USER_CLIENT_SECRET,
			'grant_type': 'password',
			'username': 'default',
			'password': '12345678'
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/realms/vitale/protocol/openid-connect/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/default-token', response.data);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/default-token', 'Failed to retrieve token');
			});
	}

	async register(req: Request, res: Response) {
		let data = JSON.stringify({
			"enabled": true,
			"username": req.body.username,
			"firstName": req.body.firstName,
			"lastName": req.body.lastName,
			"email": req.body.email,
			"credentials": [
				{
					"type": "password",
					"value": req.body.password,
					"temporary": false
				}
			],
			"requiredActions": [],
			"groups": [req.body.groups, 'Users'],
			"attributes": {
				"language": "en",
				"job_position": req.body.job_position,
				"avatar": "bear",
				"organization": req.body.organization
			}
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
			data: data
		};

		axios.request(config)
			.then(() => {
				return handleSuccess(res, '/register');
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/register', 'Failed to register');
			});
	}

	async login(req: Request, res: Response) {
		let data = qs.stringify({
			'client_id': process.env.USER_CLIENT_ID,
			'client_secret': process.env.USER_CLIENT_SECRET,
			'grant_type': 'password',
			'username': req.body.username,
			'password': req.body.password
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/realms/vitale/protocol/openid-connect/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/login', response.data);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/login', 'Failed to login');
			});
	}

	async logout(req: Request, res: Response) {
		let data = qs.stringify({
			'client_id': process.env.USER_CLIENT_ID,
			'client_secret': process.env.USER_CLIENT_SECRET,
			'refresh_token': req.body.refresh_token,
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/realms/vitale/protocol/openid-connect/logout',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/logout');
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/logout', 'Failed to logout');
			});
	}

	async introspect(req: Request, res: Response) {
		let data = qs.stringify({
			'client_id': process.env.USER_CLIENT_ID,
			'client_secret': process.env.USER_CLIENT_SECRET,
			'token': req.body.token,
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/realms/vitale/protocol/openid-connect/token/introspect',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/introspect', response.data);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/introspect', 'Failed to introspect');
			});
	}

	async refresh(req: Request, res: Response) {
		let data = qs.stringify({
			'client_id': process.env.USER_CLIENT_ID,
			'client_secret': process.env.USER_CLIENT_SECRET,
			'grant_type': 'refresh_token',
			'refresh_token': req.body.refresh_token,
		});

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/realms/vitale/protocol/openid-connect/token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/refresh', response.data);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/refresh', 'Failed to refresh');
			});
	}

	// CRUD Operations

	async update(req: Request, res: Response) {
		const { id } = req.params;
		let data = req.body;

		let config = {
			method: 'put',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users/' + id,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/update');
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/update', 'Failed to update');
			});
	}

	async forgot_password(req: Request, res: Response) {
		const { id } = req.params;
		let data = '["UPDATE_PASSWORD"]';

		let config = {
			method: 'put',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users/' + id + '/execute-actions-email',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/forgot-password');
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/forgot-password', 'Failed to send reset link');
			});
	}

	async reset_password(req: Request, res: Response) {
		const { id } = req.params;
		let data = req.body;

		let config = {
			method: 'put',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users/' + id + '/reset-password',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/reset-password');
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/reset-password', 'Failed to send reset link');
			});
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		let data = '';

		let config = {
			method: 'delete',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users/' + id,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
			data: data
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/delete');
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/delete', 'Failed to delete');
			});
	}

	async groups(req: Request, res: Response) {

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/groups',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/groups', response.data || []);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/groups', 'Failed to get groups');
			});
	}

	async getUsersByGroup(req: Request, res: Response) {
		const { name } = req.params;
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/groups?search=' + name,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				if (response) {
					let id = response.data[0].id;
					config.url = process.env.KEYCLOAK_URL + '/admin/realms/vitale/groups/' + id + '/members';
					axios.request(config)
						.then((response: any) => {
							return handleSuccess(res, '/group/name/:name', response.data || []);
						})

				}
			})
			.catch((e: any) => {
				console.log(e)
				return handleErrors(res, 404, '/group/name/:name', 'Failed to get users by group');
			});
	}

	async users(req: Request, res: Response) {

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/users', response.data || []);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/users', 'Failed to get users');
			});
	}

	async getUserByUsername(req: Request, res: Response) {
		const { username } = req.params;

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users?exact=true&username=' + username,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/user/username/:username', response.data[0]);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/user/username/:username', 'Failed to get user by username');
			});
	}

	async getUserByEmail(req: Request, res: Response) {
		const { email } = req.params;

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users?exact=true&email=' + email,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/user/email/:email', response.data[0]);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/user/email/:email', 'Failed to get user by email');
			});
	}

	async checkIfUserExistsByUsername(req: Request, res: Response) {
		const { username } = req.params;

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users?exact=true&username=' + username,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				let count = response.data;
				count = count.length;
				return handleSuccess(res, '/user/username/:username', count || []);
				return res.json({ status: 'ok', count: count });
				return res.json({ status: 'ok', count: count });
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/checkIfUserExistsByUsername', 'Failed to check if user exists by username');
			});
	}

	async checkIfUserExistsByEmail(req: Request, res: Response) {
		const { email } = req.params;

		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users?exact=true&email=' + email,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				let count = response.data;
				count = count.length;
				return res.json({ status: 'ok', count: count });
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/checkIfUserExistsByEmail', 'Failed to check if user exists by email');
			});
	}

	async sessions(req: Request, res: Response) {
		const { id } = req.params;
		let config = {
			method: 'get',
			maxBodyLength: Infinity,
			url: process.env.KEYCLOAK_URL + '/admin/realms/vitale/users/' + id + '/sessions',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': req.headers.authorization
			},
		};

		axios.request(config)
			.then((response: any) => {
				return handleSuccess(res, '/sessions', response.data);
			})
			.catch((e: any) => {
				return handleErrors(res, e.response.status, '/sessions', 'Failed get sessions');
			});
	}
}

export default new AuthController();
