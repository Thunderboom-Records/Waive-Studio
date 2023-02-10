const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
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
					500: '#601c13',
					600: '#d14132',
				},
				'blue': {
					500: '#273e60',
					600: '#3484d0',
				},
				'purple': {
					500: '#818181',
					600: '#9052cc',
				},
				'orange': {
					500: '#eb7130',
					600: '#83371c',
				},
				'green': {
					500: '#54ba84',
					600: '#326e52',
				}
			},
			width: {
				'128': '28rem'
			},
			gridTemplateColumns: {
				'instrument-grid': '4rem, 24rem, 18rem, repeat(4, minmax(12rem ,1fr)), 4rem'
			},
		}
	},

	plugins: []
};

module.exports = config;
