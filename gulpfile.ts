#! /usr/bin/env node
import { args } from './args';
import { nodemonListen } from './tasks/nodemon';
import { watchTs } from './tasks/watchTs';
import { webpackListen } from './tasks/webpack';
import { createServer } from './tasks/livereload';

export async function run() {
    if (args.typescript) {
        watchTs();
    }

    if (args.nodemon) {
        nodemonListen();
    }

    if (args.reload) {
        createServer();
    }

    if (args.webpack) {
        webpackListen();
    }
}

const isEntryScript = require.main === module;

if (isEntryScript) {
    run();
}

export default run;
