import { createUser } from '../../db/userSchema';
import { hashPassword } from '../../auth/helpers';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { email, password, firstName, lastName, phoneNumber, dateOfBirth, profilePicture } = req.body;
			const hashedPassword = hashPassword(password);
			const user = await createUser({ email, password: hashedPassword, firstName, lastName, phoneNumber, dateOfBirth, profilePicture });

			// Remove password from user object
			delete user.password;

			// Generate JWT
			const token = jwt.sign(
				{ userId: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
				process.env.SECRET_KEY,
				{
					expiresIn: '1d', // token will expire in 1 day
				}
			);

			// Set HttpOnly cookie
			const cookie = serialize('auth', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24, // 1 day
				path: '/',
			});

			res.setHeader('Set-Cookie', cookie);
			res.status(201).json({ message: 'User created' });
		} catch (error) {
			console.error(error);
			if (error.message === 'User already exists') {
				res.status(409).json({ message: 'User already exists' }); // HTTP status code 409 indicates a conflict
			} else {
				res.status(500).json({ message: 'Error creating user' });
			}
		}
	}
};