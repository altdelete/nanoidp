import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (token) => {
	try {
		const payload = jwt.verify(token, SECRET_KEY);
		console.log('Token verified successfully:', payload);  // Debugging line

		return payload;
	} catch (err) {
		console.error('Token verification failed:', err);
		return null;
	}
};
