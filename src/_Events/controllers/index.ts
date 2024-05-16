import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import Event from "../model/event";


class EventController {

	async create(req: Request, res: Response) {
		const id = uuidv4();
		try {
			const record = await Event.create({ ...req.body, id });
			return res.json({ record, status: 'ok', msg: "Successfully created" });
		} catch (e) {
			return res.json({ msg: "Failed to create", status: 500, route: "/create" });
		}
	}

	async readPagination(req: Request, res: Response) {
		try {
			const limit = (req.query.limit as number | undefined) || 10;
			const offset = req.query.offset as number | undefined;

			const records = await Event.findAll({ where: {}, limit, offset });
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/read" });
		}
	}


}

export default new EventController();
