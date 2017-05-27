'use strict';

const gulp = require('gulp');

const clean = require('gulp-clean');
gulp.task('clean', () => {
    return gulp
        .src('build', {
            read: false,
        })
        .pipe(clean());
});

gulp.task('html:copy', () => {
    return gulp
        .src(['./public/**/*.html', '!./public/bower_components/**/'])
        .pipe(gulp.dest('./build'));
});

const uglifyCss = require('gulp-uglifycss');
gulp.task('css:compress', function () {
    gulp.src('./public/bundle.css')
        .pipe(uglifyCss({
            'maxLineLen': 80,
            'uglyComments': true
        }))
        .pipe(gulp.dest('./build'))
});

gulp.task("final", ['clean', 'html:copy', 'css:compress']);

//===================================================================//

const sass = require('gulp-sass');
gulp.task('sass:compile', function () {
    return gulp.src(['./public/sass/**/*.scss', '!./public/bower_components/**/'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

const concatCss = require('gulp-concat-css');
gulp.task('css:concat', function () {
    return gulp.src('./public/css/**/*.css')
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('./public'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public/**/*.scss', ['sass:compile', 'css:concat']);
});

//===================================================================//

const tsc = require('gulp-typescript-compiler');

gulp.task('ts:compile', function () {
    return gulp
        .src('./public/**/*.ts')
        .pipe(tsc({
            module: '',
            target: 'ES3',
            sourcemap: false,
            logErrors: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('ts:watch', function () {
    gulp.watch('./public/**/*.ts', ['ts:compile']);
});