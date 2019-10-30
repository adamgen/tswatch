import webpack from 'webpack';
import path from 'path';
import { refresh } from './livereload';

export const webpackListen = function webpackListen() {
    const webpackPath = path.resolve('webpack.config.js');
    const webpackConfig: webpack.Configuration = require(webpackPath);

    const compiler = webpack(webpackConfig);
    compiler.watch({
        aggregateTimeout: 300,
    }, (err, stats) => {
        refresh();
    });
}
