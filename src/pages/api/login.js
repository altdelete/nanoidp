import { findUser } from '../../db/userSchema';
import { comparePassword } from '../../auth/helpers';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async (req, res) => {
	if (req.method === 'POST') {
		const { email, password } = req.body;
		const user = await findUser(email);

		if (!user || !comparePassword(password, user.password)) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// Generate JWT
		const token = jwt.sign(
			{
				userId: user._id,
				username: user.username,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				phoneNumber: user.phoneNumber,
				dateOfBirth: user.dateOfBirth,
				profilePicture: user.profilePicture,
				emailPrefix: user.emailPrefix,
			},
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
		res.status(200).json({ message: 'Logged in successfully' });
	}
};
