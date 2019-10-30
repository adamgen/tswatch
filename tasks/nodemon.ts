import livereload from 'gulp-livereload';
import nodemon from 'nodemon';

import { args } from '../args';

export function nodemonListen() {
    const stream = nodemon({
        script: args.nodemon,
        watch: [
            'dist',
        ],
        ext: 'js',
        stdout: false,
        env: {

        },
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
        .on('crash', function (err) {
            console.error('Application has crashed!\n', err)
            stream.emit('restart', 1)
        });
}
