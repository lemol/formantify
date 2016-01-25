import getConfig from 'hjs-webpack'

var config = getConfig({
  // entry point for the app
  in: 'src/app.js',

  // Name or full path of output directory
  // commonly named `www` or `public`. This
  // is where your fully static site should
  // end up for simple deployment.
  out: 'dist',

  // This will destroy and re-create your
  // `out` folder before building so you always
  // get a fresh folder. Usually you want this
  // but since it's destructive we make it
  // false by default
  clearBeforeBuild: true
})

var src6 = path.join(__dirname, '..', '..', '..', 'formsy-react-es6', 'src')
var fs = require('fs')
if (fs.existsSync(src6)) {
  // Use the latest src
  config.resolve = { alias: { 'formsy-react': src6 } }
  config.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators,plugins[]=syntax-decorators'],
    include: src
  });
}

export default config
