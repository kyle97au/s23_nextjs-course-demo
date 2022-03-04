/** @format */

import { MongoClient } from "mongodb";

//  /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;
		const { title, image, address, description } = data;
		const client = await MongoClient.connect(
			"mongodb+srv://kyle001:kyle001@cluster0.z1dic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
		);
		const db = client.db();
		const meetupsCollection = db.collection("meetupsyy");

		// const result = await meetupsCollection.insertOne(data);
		const result = await meetupsCollection.insertOne({ data });
		console.log(result);
		client.close();
		res.status(201).json({ message: "Meetup inserted!" });
	}
}

export default handler;
