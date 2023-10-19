// UserContext.js
import { useEffect } from 'react';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const value = { user, setUser };

	useEffect(() => {
		console.log("Current user in context:", user);
	}, [user]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};