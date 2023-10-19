import { serialize } from 'cookie';

export default async (req, res) => {
	if (req.method === 'POST') {
		// Clear HttpOnly cookie
		const cookie = serialize('auth', '', {
			httpOnly: true,
			secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: -1, // this will trigger the cookie to be removed
			path: '/',
		});

		res.setHeader('Set-Cookie', cookie);
		res.status(200).json({ message: 'Logged out successfully' });
	}
};