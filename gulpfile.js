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
const browserify = require('gulp-browserify');
const webpack = require('webpack-stream');
let projectTypings = ts.createProject('src/tsconfig.json');
let projectCommonjs = ts.createProject('src/tsconfig.json');
const LIBRARY_NAME = 'universal-dom';
gulp.task("dist-typings", () => {
    let result = gulp.src('src/**/*.ts')
        .pipe(projectTypings());
    return result.dts.pipe(gulp.dest('dist/typings'));
});

gulp.task("dist-commonjs", () => {
    let result = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(projectCommonjs());
    return result.js.pipe(gulp.dest('dist/commonjs'));
});

gulp.task("webpack", () => {
    let result = gulp.src('build/commonjs/index.js')
        .pipe(webpack({
            output: {
                filename: 'index.js',
                libraryTarget: "var",
                library: "uDom"
            }
        }))
        .pipe(rename("universal-dom.js"))
        .pipe(babel({ presets: ["es2015"] }))
        .pipe(gulp.dest('build/browser'));
});



gulp.task('build', function() {
    let result = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(projectCommonjs());
    return result.js.pipe(gulp.dest('build/commonjs'));
});

gulp.task('watch', ['build'], function() {
    runSequence("es5-build");
    gulp.watch(['src/**/*.ts'], () => {
        runSequence('build', "es5-build");
    });
});

gulp.task("es5-build", function() {
    return gulp.src("build/" + LIBRARY_NAME + ".js")
        .pipe(babel({ presets: ["es2015"], plugins: ["nofn"] }))
        .pipe(rename(LIBRARY_NAME + "-es5.js"))
        .pipe(gulp.dest("build/"))
})

gulp.task("es5-uglify", function() {
    return gulp.src("build/" + LIBRARY_NAME + "-es5.js")
        .pipe(rename("universal-dom.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("build/"))
});

gulp.task("build-universal", ["build"], (done) => {
    return runSequence("es5-build", "es5-uglify", done);
});


gulp.task('dist', ['dist-typings', 'dist-commonjs'], function() {

});