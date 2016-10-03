const gulp = require('gulp');
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const fs = require('fs');
const tsUniversal = require("ts-universal");
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");


let project = ts.createProject('src/tsconfig.json');

gulp.task('watch', ['build'], function() {
    runSequence("es5-build");
    gulp.watch(['src/**/*.ts'], () => {
        runSequence('build', "es5-build");
    });
});


gulp.task("es5-build", function() {
    return gulp.src("build/universal-dom.js")
        .pipe(babel({ presets: ["es2015"], plugins: ["nofn"] }))
        .pipe(rename("universal-dom-es5.js"))
        .pipe(replace(/exports : undefined,/, "exports : this,"))
        // .pipe(uglify())
        .pipe(gulp.dest("build/"))
})
gulp.task('build', function() {
    let result = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(project());
    result.dts.pipe(gulp.dest('build/definitions'));
    return result.js.pipe(tsUniversal('build/', {
            expose: 'index',
            expose2window: true,
            name: 'universal-dom'
        }))
        .pipe(rename('universal-dom.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('test', ['dist'], function() {
    runSequence('run-mocha')
});