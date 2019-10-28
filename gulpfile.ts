import gulp, { src, dest, watch } from 'gulp';
import livereload from 'gulp-livereload';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import gulpNodemon from 'gulp-nodemon';
import through2 from 'through2';
import { exec } from 'child_process';
import yargs from 'yargs';

const args: {
    reload: boolean,
    nodemon: string,
} = yargs
    .options({
        reload: {
            boolean: true,
            default: true,
        },
        nodemon: {
            string: true,
        }
    })
        .argv;


const tsProject = typescript.createProject('tsconfig.json', typescript.reporter.longReporter());
const prependShebang = function generatePrependShebang() {
    return through2.obj(function prependShebang(file, _, cb) {
        if (file.isBuffer()) {
            file.contents = Buffer.from(`#!/usr/bin/env node\n${file.contents.toString()}`);
        }

        cb(null, file);
    });
}

export async function ts() {
    const promise = await tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(prependShebang())
        .pipe(dest(tsProject.options.outDir));
    if (args.reload) {
        livereload.reload();
        console.log('reloaded')
    }
    return promise;
}

// potentialy can run faster then gulp typescript - tho it didn't prove itself lets keep it here for now
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

export function nodemon() {
    const stream = gulpNodemon({
        script: args.nodemon,
    });

    stream
        .on('restart', function () {
            console.log('restarted!')
        })
        .on('crash', function () {
            console.error('Application has crashed!\n')
            stream.emit('restart', 1)
        });
}

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

export default watchTs;

const isEntryScript = require.main === module;

if (isEntryScript) {
    watchTs();
}
