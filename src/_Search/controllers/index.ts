import { Request, Response } from "express";
import Search from "../model/search"; // Import the Search model

class SearchController {

	async create(req: Request, res: Response) {
		try {
			const { userId } = req.body;
			const existingRecord = await Search.findOne({ where: { userId } });

			if (existingRecord) {
				let tmp_arr = existingRecord.keywords;
				tmp_arr.push({ word: req.body.keywords })
				existingRecord.keywords = []
				for (let i = 0; i < tmp_arr.length; i++) {
					existingRecord.keywords.push(tmp_arr[i])
				}

				await existingRecord.save();
				return res.status(200).json({ record: existingRecord, status: 'ok', msg: "Record updated successfully" });
			} else {
				// Create a new record
				let userId = req.body.userId;
				let arr = [];
				arr.push({ word: req.body.keywords })
				const newRecord = await Search.create({ userId: userId, keywords: arr });
				return res.status(201).json({ record: newRecord, status: 'ok', msg: "Record created successfully" });
			}
		} catch (error) {
			console.error(error);
			return res.status(500).json({ msg: "Failed to create/update record", status: 500, route: "/create" });
		}
	}

	async readByID(req: Request, res: Response) {
		try {
			const { userId } = req.params;

			const records = await Search.findAll({ where: { userId } }); // Use Search model for finding by userId
			if (!records || records.length === 0) {
				return res.status(404).json({ msg: "Searches not found for the provided userId", status: 404, route: `/read/${userId}` });
			}
			return res.json({ records, status: 'ok', msg: "Searches successfully retrieved" });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ msg: "Failed to read searches", status: 500, route: `/read/search` });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { userId } = req.body;

			if (!userId) {
				return res.status(400).json({ msg: "User ID is required" });
			}

			const record = await Search.findOne({ where: { userId: userId } });

			if (!record) {
				return res.status(404).json({ msg: "Cannot find existing record or unauthorized" });
			}

			const deletedRecord = await record.destroy();
			return res.json({ record: deletedRecord });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ msg: "Failed to delete", status: 500, route: "/delete" });
		}
	}

}

export default new SearchController();
