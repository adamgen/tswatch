import webpack from 'webpack';
import path from 'path';
import gulp_livereload from 'gulp-livereload';

export const webpackListen = function webpackListen() {
    const webpackPath = path.resolve('webpack.config.js');
    const webpackConfig = require(webpackPath);

    const compiler = webpack(webpackConfig);
    compiler.watch({
        // Example watchOptions
        aggregateTimeout: 300,
        poll: undefined
    }, (err, stats) => { // Stats Object
        // Print watch/build result here...
        // console.log(stats);
        gulp_livereload.reload();
    });
}
