import livereload from 'gulp-livereload';

import { args } from './args';
import { nodemon } from './tasks/nodemon';
import { ts } from './tasks/ts';
import { watchTs } from './tasks/watchTs';

export async function run() {
    if (args.reload) {
        livereload.listen();
    }

    if (args.nodemon) {
        nodemon();
    }

    if (args.typescript) {
        ts();
        watchTs();
    }
}

const isEntryScript = require.main === module;

if (isEntryScript) {
    run();
}

export default run;
