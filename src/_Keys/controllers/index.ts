import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import Key from "../model/key";
import { handleErrors, handleSuccess } from "../../helpers/helpers";
interface CustomRequest extends Request {
	key?: string;
}

class KeyController {

	async create(req: Request, res: Response) {
		const id = uuidv4();
		try {
			const record = await Key.create({ ...req.body, id });
			return handleSuccess(res, '/create', record);
		} catch (e: any) {
			return handleErrors(res, e.response.status, '/create', 'Failed to create key');
		}
	}

	async readPagination(req: CustomRequest, res: Response) {
		try {
			const limit = (req.query.limit as number | undefined) || 10;
			const offset = req.query.offset as number | undefined;
			const records = await Key.findAll({ where: {}, limit, offset });
			return handleSuccess(res, '/read', records || []);
		} catch (e: any) {
			return handleErrors(res, e.response.status, '/read', 'Failed to read key');
		}
	}

	async readByID(req: Request, res: Response) {
		try {
			const { id } = req.params;

			await Key.findOne({ where: { id } }).then((record) => {
				if (record == null) {
					return handleErrors(res, 404, '/read/:id', 'Invalid key');
				}
				return handleSuccess(res, '/read/:id', record.dataValues);
			});
		} catch (e: any) {
			return handleErrors(res, e.response.status, '/read/:id', 'Failed to read key');

		}
	}

	async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const { type } = req.body;

			const record = await Key.findOne({ where: { id } });
			if (!record) {
				return handleErrors(res, 404, '/update/:id', 'Invalid key');
			}

			type ? record.type = type : '';

			await record.save();

			return handleSuccess(res, '/update/:id', record.dataValues);
		} catch (e: any) {
			return handleErrors(res, e.response.status, '/update/:id', 'Failed to update key');
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await Key.findOne({ where: { id } });

			if (!record) { return handleErrors(res, 404, '/delete/:id', 'Invalid key'); }

			await record.destroy();
			return handleSuccess(res, '/delete/:id');
		} catch (e: any) {
			return handleErrors(res, e.response.status, '/delete/:id', 'Failed to delete key');
		}
	}

}

export default new KeyController();
