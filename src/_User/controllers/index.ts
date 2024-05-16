import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import User from "../model/user";
import Key from "../../_Keys/model/key";

interface CustomRequest extends Request {
	user?: string;
}

class UserController {

	async create(req: Request, res: Response) {
		const id = uuidv4();
		try {
			const record = await User.create({ ...req.body, id });
			return res.json({ record, status: 'ok', msg: "Successfully created" });
		} catch (e) {
			return res.json({ msg: "Failed to create", status: 500, route: "/create" });
		}
	}

	async readPagination(req: CustomRequest, res: Response) {
		try {
			const limit = (req.query.limit as number | undefined) || 10;
			const offset = req.query.offset as number | undefined;

			const records = await User.findAll({ where: {}, limit, offset });
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/read" });
		}
	}

	async readByID(req: Request, res: Response) {
		try {
			const { id } = req.params;

			await User.findOne({ where: { id } }).then((record) => {
				if (record == null) {
					return res.json({ msg: "Not found", status: 404, route: "/read/:id" });
				}
				return res.json({ record, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/read/:id" });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { first_name, last_name, email, phone, role_id } = req.body;

			const record = await User.findOne({ where: { id } });
			if (!record) {
				return res.json({ msg: "Can not find existing record" });
			}

			first_name ? record.first_name = first_name : '';
			last_name ? record.last_name = last_name : '';
			email ? record.email = email : '';
			phone ? record.phone = phone : '';
			role_id ? record.role_id = role_id : '';

			await record.save();

			return res.json({ record: record });
		} catch (e) {
			return res.json({
				msg: "fail to read", status: 500, route: "/update/:id",
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await User.findOne({ where: { id } });

			if (!record) {
				return res.json({ msg: "Can not find existing record" });
			}

			const deletedRecord = await record.destroy();
			return res.json({ record: deletedRecord });
		} catch (e) {
			return res.json({
				msg: "fail to read",
				status: 500,
				route: "/delete/:id",
			});
		}
	}
}

export default new UserController();
