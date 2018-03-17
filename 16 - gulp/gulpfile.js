var gulp = require('gulp');

var browserify = require('browserify');

var babelify = require('babelify');

var source = require("vinyl-source-stream");

var buffer = require('vinyl-buffer');

var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');

var liverload = require('gulp-livereload')

gulp.task('build', function () {
    return browserify({entries: './es6/js/index.js', debug: true})
        .transform('babelify',{presets: ["es2015"]})
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./js/js'))
        .pipe(liverload())
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./es6/js/*js', ['build']);
});

gulp.task('default', ['build', 'watch']);