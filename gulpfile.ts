import { src, dest, watch } from 'gulp';
import livereload from 'gulp-livereload';
import typescript from 'gulp-typescript';
import sourcemaps from 'gulp-sourcemaps';

const tsProject = typescript.createProject('tsconfig.json');

async function ts() {
    return src('*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(dest('dist'))
        .pipe(livereload());
}

async function watchTs() {
    livereload.listen();
    return watch('*.ts', async function watchFSChangeTsCallback(cb) {
        await ts();
        cb();
    });
}


export default watchTs;
