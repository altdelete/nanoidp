// navigationData.js

export const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{
		name: 'Teams',
		current: false,
		children: [
			{ name: 'Engineering', href: '#' },
			{ name: 'Human Resources', href: '#' },
			{ name: 'Customer Success', href: '#' },
		],
	},
	{
		name: 'Projects',
		current: false,
		children: [
			{ name: 'GraphQL API', href: '#' },
			{ name: 'iOS App', href: '#' },
			{ name: 'Android App', href: '#' },
			{ name: 'New Customer Portal', href: '#' },
		],
	},
	{ name: 'Calendar', href: '#', current: false },
	{ name: 'Documents', href: '#', current: false },
	{ name: 'Reports', href: '#', current: false },
];