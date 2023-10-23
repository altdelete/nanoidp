// navigationData.js

export const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{
		name: 'Directory',
		current: false,
		children: [
			{ name: 'Users', href: '#' },
			{ name: 'Groups', href: '#' },
			{ name: 'Devices', href: '#' },
		],
	},
	{
		name: 'Devices',
		current: false,
		children: [
			{ name: 'Mac', href: '#' },
			{ name: 'iPhone', href: '#' },
			{ name: 'iPad', href: '#' },
			{ name: 'Profiles', href: '#' },
		],
	},
	{ name: 'Applications', href: '#', current: false },
	{ name: 'Tenant Admin', href: '#', current: false },
];