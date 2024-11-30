module.exports = {
	extends: ['expo'],
	plugins: ['unused-imports'],
	env: {
		browser: true, // Ensures that browser globals like Blob are available
		node: true, // If you're working with Node.js too, you can keep this
	},
	rules: {
		'unused-imports/no-unused-imports': 'error',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '^_',
				argsIgnorePattern: '^_',
			},
		],
		'no-undef': [
			'error',
			{
				// This will ignore global objects like Blob
				typeof: true,
			},
		],
	},
};
