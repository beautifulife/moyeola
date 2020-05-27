const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const withSourceMaps = require('@zeit/next-source-maps')({
  devtool:
    process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'source-map',
});
// const {parsed: localEnv} = require('dotenv').config();
// const configFile = require('./config.json');
// const packageJson = require('./package.json');

const config = {
  target: 'serverless',
  webpack(config, { dev }) {
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    return config;
  },
};

module.exports = withSourceMaps(config);
