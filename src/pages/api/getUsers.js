import { connectToDB } from '@/db/connect';

export default async (req, res) => {
	const { db } = await connectToDB();
	const users = await db.collection('users').find({}).toArray();
	res.status(200).json(users);
};
