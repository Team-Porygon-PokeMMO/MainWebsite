import type { Config } from 'tailwindcss'
const colors = require('tailwindcss/colors')
const srcDir = 'src'


export default <Partial<Config>>{
    darkMode: ['selector', '[data-mode="dark"]'],
    content: [
        `${srcDir}/components/**/*.{vue,js,ts}`,
        `${srcDir}/layouts/**/*.vue`,
        `${srcDir}/pages/**/*.vue`,
        `${srcDir}/composables/**/*.{js,ts}`,
        `${srcDir}/plugins/**/*.{js,ts}`,
        `${srcDir}/utils/**/*.{js,ts}`,
        `${srcDir}/App.{js,ts,vue}`,
        `${srcDir}/app.{js,ts,vue}`,
        `${srcDir}/Error.{js,ts,vue}`,
        `${srcDir}/error.{js,ts,vue}`,
        `${srcDir}/app.config.{js,ts}`
    ],
}
