import { dest } from 'gulp';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';
import livereload from 'gulp-livereload';

import { prependString } from '../tasks/prependString';
import { args } from '../args';

const tsProject = typescript.createProject('tsconfig.json', typescript.reporter.longReporter());

export async function ts() {
    const promise = await tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(prependString('#!/usr/bin/env node\n'))
        .pipe(dest(tsProject.options.outDir));
    return promise;
}