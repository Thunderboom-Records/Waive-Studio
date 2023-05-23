const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			'white': '#ffffff',
			'black': '#010101',
			'gray': {
				400: '#cccccc',
				500: '#818181',
				600: '#333333',
				700: '#1e1e1e',
				800: '#1a1a1a',
				900: '#141414'
			},
			'red': {
				500: '#d14132',
				600: '#601c13',
			},
			'blue': {
				500: '#3484d0',
				600: '#273e60',
			},
			'purple': {
				500: '#b63efb',
				600: '#8225b8',
			},
			'orange': {
				500: '#eb7130',
				600: '#83371c',
			},
			'green': {
				500: '#54ba84',
				600: '#326e52',
			},
			'yellow': {
				500: '#dea13f',
				700: '#a16531'
			}
		},
		extend: {	
			fontFamily: {
				'sans': ['VG5000', ...defaultTheme.fontFamily.sans]
			},
			width: {
				'128': '28rem',
				'pattern': '3.75rem',
			},
			gridTemplateColumns: {
				'instrument-grid': '30rem, 11rem, repeat(4, minmax(12rem ,1fr)), 4rem'
			},
			minWidth: {
				'pattern': '3.75rem',
			},dth: {
			}
		}
	},
	daisyui: {
		themes: [],
	},
	plugins: [require("daisyui")]
};

module.exports = config;
