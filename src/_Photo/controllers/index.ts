import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Photo from "../model/photo"; // Import the Photo model

// interface CustomRequest2 extends Request {
// 	info?: object; // Change 'json' to 'object' for TypeScript compatibility
// }

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


	// async update(req: CustomRequest2, res: Response) {
	// 	try {
	// 		const { id } = req.params;
	// 		const { info } = req.body; // Update photo info

	// 		const record = await Photo.findOne({ where: { id } });
	// 		if (!record) {
	// 			return res.status(404).json({ msg: "Can not find existing record" });
	// 		}

	// 		if (info) {
	// 			record.info = info;
	// 		}

	// 		await record.save();

	// 		return res.json({ record });
	// 	} catch (e) {
	// 		console.error(e);
	// 		return res.status(500).json({ msg: "Failed to update", status: 500, route: "/update/:id" });
	// 	}
	// }

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
