module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-mixins'),
    require('postcss-nesting'),
    require('postcss-preset-env')({
      stage: 1,
      browsers: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'not IE 11'
      ],
      autoprefixer: {
        grid: true,
        flexbox: 'no-2009'
      }
    })
  ]
};