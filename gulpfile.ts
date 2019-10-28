import { watch } from 'gulp';
import livereload from 'gulp-livereload';

import { args } from './args';
import { nodemon } from './tasks/nodemon';
import { ts } from './tasks/ts';

export async function watchTs() {
    if (args.reload) {
        livereload.listen();
    }
    if (args.nodemon) {
        nodemon();
    }
    console.log('starting initial ts');
    await ts();
    console.log('finished initial ts, watching file changes');

    return watch('**/*.ts', async function watchFSChangeTsCallback(cb) {
        console.log('compiling ts');
        await ts();
        console.log('ts compiled');
        cb();
    });
}

const isEntryScript = require.main === module;

if (isEntryScript) {
    watchTs();
}

export default watchTs;
