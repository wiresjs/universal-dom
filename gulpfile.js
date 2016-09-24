const gulp = require('gulp');
const rename = require("gulp-rename");
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const fs = require('fs');
const tsUniversal = require("ts-universal");
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');

let project = ts.createProject('src/tsconfig.json');

gulp.task('watch', ['build'], function() {
    gulp.watch(['src/**/*.ts'], () => {
        runSequence('build');
    });
});


gulp.task('build', function() {
    let result = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(project));
    result.dts.pipe(gulp.dest('build/definitions'));
    return result.js.pipe(tsUniversal('build/', {
            base: 'build/',
            expose: 'index',
            npm: 'universal-dom'
        }))
        .pipe(rename('universal-dom.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('test', ['dist'], function() {
    runSequence('run-mocha')
});