import cookie from 'cookie';
import { verifyToken } from '../../utils/auth';

export default async function handler(req, res) {
	console.log("Incoming Request Headers: ", req.headers);

	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	try {
		// Parse cookies from the request headers
		const parsedCookies = cookie.parse(req.headers.cookie || '');

		// Check for absence of token in cookies
		if (!parsedCookies || !parsedCookies.auth) { // Note the change here
			console.error('No token provided');
			return res.status(401).json({ error: 'Unauthorized' });
		}

		// Log for debugging purposes
		console.log('Received token:', parsedCookies.auth); // And here

		// Verify the token
		const decoded = verifyToken(parsedCookies.auth); // And here

		// Check if the token was not decoded
		if (!decoded) {
			console.error('Token could not be verified');
			return res.status(401).json({ error: 'Unauthorized' });
		}

		// Send the decoded user data as JSON response
		res.status(200).json(decoded);
	} catch (error) {
		// If verification fails, respond with 401 Unauthorized
		console.error('Error in verification:', error);
		res.status(401).json({ error: 'Unauthorized' });
	}
}
