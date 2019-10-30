#! /usr/bin/env node
import livereload from 'gulp-livereload';

import { args } from './args';
import { nodemonListen } from './tasks/nodemon';
import { watchTs } from './tasks/watchTs';

export async function run() {
    if (args.typescript) {
        watchTs();
    }

    if (args.nodemon) {
        nodemonListen();
    }

    if (args.reload) {
        livereload.listen();
    }

}

const isEntryScript = require.main === module;

if (isEntryScript) {
    run();
}

export default run;
