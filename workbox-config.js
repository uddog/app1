module.exports = {
	globDirectory: 'assets/',
	globPatterns: [
		'**/*.png'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};