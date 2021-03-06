module.exports = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				IBM: ['IBM Plex Sans KR', 'sans-serif']
			},
			screens: { 'sm-max': { max: '640px' } }
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
