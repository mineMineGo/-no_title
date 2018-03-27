var gulp = require('gulp');

var gulpCss = require('gulp-clean-css');

var sequence = require('run-sequence');

var gulpConcat = require('gulp-concat');

gulp.task('default', function(){
  sequence('minify-css', 'watchCss');
});

gulp.task('minify-css', function(){
  gulp.src('./assets/css/*.css')
    .pipe(gulpConcat('main.css'))
    .pipe(gulpCss())
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('watchCss', function(){
  // gulp.watch('./assets/css/*.css', function(){
  //   sequence('minify-css');
  // });
  gulp.watch('./assets/css/*.css',['minify-css']);
});