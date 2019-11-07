import nodemon from 'nodemon';

import { args } from '../args';
import { refresh } from './livereload';
import { logger } from './logger';

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
                    refresh();
                }
            } else {
                logger('[nodemon]', stringMsg);
            }
        })
        .on('stderr', function (msg: Buffer) {
            const stringMsg = msg.toString();
            logger('[nodemon]', stringMsg);
        })
        .on('crash', function (...err) {
            logger.error('Application has crashed!\n');
            logger(err);
            stream.emit('restart', 1);
        });
}
