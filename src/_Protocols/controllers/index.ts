import { Request, Response } from "express";

import { v4 as uuidv4 } from "uuid";
import Protocol from "../model/protocol";
import { Op, Sequelize } from "sequelize";


class ProtocolController {

	async create(req: Request, res: Response) {
		const id = uuidv4();
		try {
			const record = await Protocol.create({ ...req.body, id });
			return res.json({ record, status: 'ok', msg: "Successfully created" });
		} catch (e) {
			return res.json({ msg: "Failed to create", status: 500, route: "/create", error: e });
		}
	}

	async readPagination(req: Request, res: Response) {
		try {
			const limit = (req.query.limit as number | undefined) || 10;
			const offset = req.query.offset as number | undefined;

			const records = await Protocol.findAll({ where: {}, limit, offset });
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/read", error: e });
		}
	}

	async readByID(req: Request, res: Response) {
		try {
			const { id } = req.params;

			await Protocol.findOne({ where: { id } }).then((record) => {
				if (record == null) {
					return res.json({ msg: "Not found", status: 404, route: "/read/:id" });
				}
				return res.json({ record, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/read/:id", error: e });
		}
	}

	async readCategories(req: Request, res: Response) {
		try {
			await Protocol.findAll({
				// attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']],
				attributes: ['category'], // Select the 'category' column
				group: ['category'],      // Group by 'category' to get distinct values
				order: [['category', 'ASC']], // Sort by 'category' in ascending order
			}).then((records) => {
				if (records === null) {
					return res.json({ msg: "Not found", status: 404, route: "/read/categories" });
				}
				else {

				}
				return res.json({ records, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/read/:id", error: e });
		}
	}

	async readAuthors(req: Request, res: Response) {
		try {
			await Protocol.findAll({
				// attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']],
				attributes: ['author'], // Select the 'category' column
				group: ['author'],      // Group by 'category' to get distinct values
				order: [['author', 'ASC']], // Sort by 'category' in ascending order
			}).then((records) => {
				if (records === null) {
					return res.json({ msg: "Not found", status: 404, route: "/read/authors" });
				}
				else {

				}
				return res.json({ records, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/read/authors", error: e });
		}
	}

	async filterByCategory(req: Request, res: Response) {
		const { category } = req.params;

		try {
			await Protocol.findAll({
				where: {
					category: category
				},
				order: [
					['category', 'ASC'],
					['name', 'ASC'],
				],
			}).then((records) => {
				if (records === null) {
					return res.json({ msg: "Not found", status: 404, route: "/filter/category/:category" });
				}
				else {

				}
				return res.json({ records, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/filter/category/:category", error: e });
		}
	}

	async filterByAuthor(req: Request, res: Response) {
		const { author } = req.params;

		try {
			await Protocol.findAll({
				where: {
					author: author
				},
				order: [
					['author', 'ASC'],
					['name', 'ASC'],
				],
			}).then((records) => {
				if (records === null) {
					return res.json({ msg: "Not found", status: 404, route: "/filter/author/:author" });
				}
				else {

				}
				return res.json({ records, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/filter/author/:author", error: e });
		}
	}

	async filterByDate(req: Request, res: Response) {
		const { from, to } = req.params;

		try {
			await Protocol.findAll({
				where: {
					createdAt: {
						[Op.between]: [from, to],
					}
				},
				order: [
					['createdAt', 'ASC'],
					['name', 'ASC'],
				],
			}).then((records) => {
				if (records === null) {
					return res.json({ msg: "Not found", status: 404, route: "/filter/date/:from/:to" });
				}
				else {

				}
				return res.json({ records, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/filter/date/:from/:to", error: e });
		}
	}

	async filterByRating(req: Request, res: Response) {
		const { from, to } = req.params;

		try {
			await Protocol.findAll({
				where: {
					rating: {
						[Op.between]: [from, to],
					}
				},
				order: [
					['rating', 'ASC'],
					['name', 'ASC'],
				],
			}).then((records) => {
				if (records === null) {
					return res.json({ msg: "Not found", status: 404, route: "/filter/rating/:from/:to" });
				}
				else {

				}
				return res.json({ records, status: 'ok', msg: "Successfully retrieved" });
			});
		} catch (e) {
			return res.json({ msg: "Failed to read", status: 500, route: "/filter/rating/:from/:to", error: e });
		}
	}
}

export default new ProtocolController();
