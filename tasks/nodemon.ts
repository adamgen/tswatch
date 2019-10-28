import gulpNodemon from 'gulp-nodemon';
import { args } from '../args';

export function nodemon() {
    const stream = gulpNodemon({
        script: args.nodemon,
    });

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function () {
            console.error('Application has crashed!\n')
            stream.emit('restart', 1)
        });
}
