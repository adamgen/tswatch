import gulp, { src, dest, watch } from 'gulp';
import livereload from 'gulp-livereload';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import through2 from 'through2';
import { exec } from 'child_process';

const tsProject = typescript.createProject('tsconfig.json');
const tsSrc = tsProject.src();
const prependShebang = function generatePrependShebang() {
    return through2.obj(function prependShebang(file, _, cb) {
        if (file.isBuffer()) {
            file.contents = Buffer.from(`#!/usr/bin/env node\n${file.contents.toString()}`);
        }

        cb(null, file);
    });
}

export async function ts() {
    await tsSrc.pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(prependShebang())
        .pipe(dest(tsProject.options.outDir))
    livereload.reload();
    return;
}

// potentialy can run faster then gulp typescript - didn't prove itself
export async function tsc(): Promise<any> {
    return new Promise(async function tscPromiseCallback(resolve, reject) {
        const tscProcess = await exec('tsc');

        tscProcess.on('data', (data) => {
        });
        tscProcess.on('error', (data) => {
            reject(data);
        });
        tscProcess.on('close', (data) => {
            resolve(data);
        });
        tscProcess.on('end', (data) => {
            resolve(data);
        });

    });
}

export async function watchTs() {
    livereload.listen();
    console.log('starting initial ts');
    await ts();
    console.log('finished initial ts, watching file changes');
    return watch('**/*.ts', async function watchFSChangeTsCallback(cb) {
        await ts();
        cb();
    });
}

export default watchTs;

const isEntryScript = require.main === module;

if (isEntryScript) {
    watchTs();
}
