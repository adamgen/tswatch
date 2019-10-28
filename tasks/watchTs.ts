import { watch } from 'gulp';
import { ts } from './ts';

export async function watchTs() {
    watch('**/*.ts', async function watchFSChangeTsCallback(cb) {
        await ts();
        cb();
    });
};
