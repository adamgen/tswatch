#! /usr/bin/env node
import livereload from 'gulp-livereload';

import { args } from './args';
import { nodemon } from './tasks/nodemon';
import { ts } from './tasks/ts';
import { watchTs } from './tasks/watchTs';
import { tsc } from './tasks/tsc';

export async function run() {
    if (args.typescript) {
        watchTs();
    }

    if (args.nodemon) {
        nodemon();
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
