module.exports = ({ env }) => ({
  plugins: [
    require('tailwindcss')({
      config: './src/css/tailwind.config.js'
    }),
    require('autoprefixer')()
  ],
})