const { mix } = require('wp-mix');


mix.sass('resources/styles/app.scss', 'assets/css');
mix.js('resources/scripts/app.js', 'assets/js');


mix.options({
    processCssUrls: false,
    publicPath: './'
});

mix.webpackConfig({
    node: {
      fs: "empty"
    },
});
