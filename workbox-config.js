module.exports = {
	globDirectory: './',
	globPatterns: [
		'**/*.{html,css,ttf,js}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};