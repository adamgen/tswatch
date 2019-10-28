import livereload from 'gulp-livereload';
import gulpNodemon from 'gulp-nodemon';

import { args } from '../args';

export function nodemon() {
    const stream = gulpNodemon({
        script: args.nodemon,
        watch: [
            'dist',
        ],
        ext: 'js',
        stdout: false,
    });

    stream
        .on('stdout', function (msg: Buffer) {
            const stringMsg = msg.toString();
            
            if (stringMsg.includes('RESTART_SUCCESS')) {
                if (args.reload) {
                    livereload.reload();
                    console.log('nodemon reloaded ');
                }
            } else {
                console.log(stringMsg);
            }
        })
        .on('crash', function () {
            console.error('Application has crashed!\n')
            stream.emit('restart', 1)
        });
}
