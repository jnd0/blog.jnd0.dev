/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    darkSelector: '.dark-mode',
    sepiaSelector: '.sepia-mode',
    extend: {
      colors: {
        nuxt: {
          gray: '#243746',
          lightgreen: '#41B38A',
          green: '#158876'
        }
      },
      fill: theme => ({
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-lightgreen': theme('colors.nuxt.lightgreen'),
        'nuxt-green': theme('colors.nuxt.green')
      }),
      stroke: theme => ({
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-lightgreen': theme('colors.nuxt.lightgreen'),
        'nuxt-green': theme('colors.nuxt.green')
      })
    }
  },
  variants: {
    margin: ['responsive', 'last'],
    backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'dark-focus', 'dark-hover', 'sepia', 'sepia-focus', 'sepia-hover'],
    textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover', 'dark-focus', 'sepia', 'sepia-hover', 'sepia-focus'],
    borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-focus', 'sepia', 'sepia-focus'],
    borderWidth: ['responsive', 'first', 'last']
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('tailwindcss-sepia-mode')()
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'content/**/*.md',
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      whitelist: ['light-mode', 'dark-mode', 'sepia-mode']
    }
  }
}
