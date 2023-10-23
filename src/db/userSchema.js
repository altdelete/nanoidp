import { connectToDB } from './connect';

export const findUser = async (email) => {
	const { db } = await connectToDB();
	return db.collection('users').findOne({ email });
};

export const createUser = async ({ email, password, firstName, lastName, phoneNumber, dateOfBirth, profilePicture, groups }) => {
	const { db } = await connectToDB();

	// Check if a user with the same email already exists
	const existingUser = await db.collection('users').findOne({ email });
	if (existingUser) {
		throw new Error('User already exists');
	}

	// Check if the required fields are provided
	if (!email || !password || !firstName || !lastName) {
		throw new Error('Required fields are missing');
	}

	// Create username as email and emailPrefix as part of email before @
	const username = email;
	const emailPrefix = email.split('@')[0];

	const response = await db.collection('users').insertOne({
		email,
		password,
		firstName,
		lastName,
		username,
		phoneNumber,
		dateOfBirth,
		profilePicture,
		emailPrefix,
		groups,
		createdAt: new Date()
	});

	const user = await db.collection('users').findOne({ _id: response.insertedId });
	return user; // This will return the created user
};