const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/bloggrs/influencer-platform/client.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'src/public/js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  }
}; 