var getConfig = require('hjs-webpack')
var path = require('path');

var config = getConfig({
  // entry point for the app
  isDev: true,
  in: './app.js',

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
  clearBeforeBuild: false
})


//module.exports = {
  //entry: './app.js',
  //output: {
    //path: path.join(__dirname, 'dist'),
    //filename: 'bundle.js'
  //},
  //module: {
    //loaders: [{
      //test: /\.js$/,
      //loaders: ['babel?presets[]=react,presets[]=es2015'],
      //exclude: /node_modules/,
      //include: __dirname
    //}]
  //}
//}



// This will make the redux-simpler-router module resolve to the
// latest src instead of using it from npm. Remove this if running
// outside of the source.
var src = path.join(__dirname, '..', '..', 'src')
var fs = require('fs')
if (fs.existsSync(src)) {
  // Use the latest src
  config.resolve = { alias: { 'formantify-react': src } }
  config.module.loaders.push({
    test: /\.js$/,
    loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0,plugins[]=transform-decorators,plugins[]=syntax-decorators'],
    include: src
  });
}


module.exports = config
