'use strict';

const gulp = require('gulp');

// const clean = require('gulp-clean');
// gulp.task('clean', () => {
//     return gulp
//         .src('build', {
//             read: false,
//         })
//         .pipe(clean());
// });

//===================================================================//

gulp.task('png:copy', () => {
    return gulp
        .src(['./src/**/*.png'])
        .pipe(gulp.dest('./build'));
});

gulp.task('html:copy', () => {
    return gulp
        .src(['./src/**/*.html'])
        .pipe(gulp.dest('./build'));
});

gulp.task('js:copy', () => {
    return gulp
        .src(['./src/**/*.js'])
        .pipe(gulp.dest('./build'));
});

//===================================================================//

const uglifyCss = require('gulp-uglifycss');
gulp.task('css:compress', function () {
    gulp.src('./src/bundle.css')
        .pipe(uglifyCss({
            'maxLineLen': 80,
            'uglyComments': true
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task('copy', ['html:copy', 'png:copy', 'js:copy', 'css:compress']);

//===================================================================//

const sass = require('gulp-sass');
gulp.task('sass:compile', function () {
    return gulp.src(['./src/sass/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'));
});

const concatCss = require('gulp-concat-css');
gulp.task('css:concat', function () {
    return gulp.src('./src/css/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('./src'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/**/*.scss', ['sass:compile', 'css:concat']);
});

//===================================================================//

const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');

gulp.task('ts:final', ['copy'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build'));
});

//===================================================================//

const watchify = require('watchify');
const gutil = require('gulp-util');

const watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'));
}

gulp.task('ts:watch', bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);
