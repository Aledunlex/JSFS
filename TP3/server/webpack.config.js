const path = require('path');

module.exports = {
  entry: './src/scripts/main.js',
  mode : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/bundle.js'
  }
};