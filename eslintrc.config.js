export default [
	{
		files: ['**/*.{ts,tsx}'],
		rules: {
			'unused-imports/no-unused-imports': 'error',
			'no-unused-vars': 'off',
			'no-undef': 'error',
		},
	},
];
