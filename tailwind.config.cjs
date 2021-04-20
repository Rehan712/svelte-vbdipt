const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');

// mode: 'aot',
// mode: 'jit',

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
 theme: {
                extend: {
                        colors: {
                                yellow: '#fbb900',
                                header: '#f1ede3',
                                red: '#C51A1B',
                                radHintergrund: '#f1ede3'
                        }
                }
        }

}
