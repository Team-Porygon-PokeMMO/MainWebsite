import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                red: {
                    100: '#FF0000',
                    200: '#FF0000',
                }
            }
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
        },
    },
    content: [
        'docs/content/**/*.md'
    ]
}
