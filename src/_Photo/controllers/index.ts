import { Request, Response } from "express";
import Photo from "../model/photo"; // Import the Photo model

class PhotoController {

	async create(req: Request, res: Response) {
		try {
			const record = await Photo.create({ ...req.body }); // Use Photo model for creation
			return res.status(201).json({ record, status: 'ok', msg: "Successfully created" });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ msg: "Failed to create", status: 500, route: "/create" });
		}
	}

	async readByID(req: Request, res: Response) {
		try {
			const { userId } = req.params;

			const records = await Photo.findAll({ where: { userId } }); // Use Photo model for finding by userId
			if (!records || records.length === 0) {
				return res.status(404).json({ msg: "Photos not found for the provided userId", status: 404, route: `/read/${userId}` });
			}
			return res.json({ records, status: 'ok', msg: "Photos successfully retrieved" });
		} catch (e) {
			console.error(e);
			return res.status(500).json({ msg: "Failed to read photos", status: 500, route: `/read/photo` });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const { id, userId } = req.body;

			if (!id || !userId) {
				return res.status(400).json({ msg: "Photo ID and User ID are required" });
			}

			const record = await Photo.findOne({ where: { id: id, userId: userId } });

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

export default new PhotoController();
