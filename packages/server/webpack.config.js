const path = require('path');
const nodeExternals = require('webpack-node-externals');

const configuration = (webpackConfig) => {
    return {
        ...webpackConfig,
        externals: [
            nodeExternals({
                modulesDir: path.resolve(__dirname, '../../node_modules'),
            }),
        ],
    };
}

module.exports = configuration
