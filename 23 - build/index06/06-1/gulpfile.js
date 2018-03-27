var gulp = require('gulp');

var cleanCss = require('gulp-clean-css');

var sequence = require('run-sequence');

gulp.task('default', function(){
  sequence('minify-css','cssWatch');
});

gulp.task('minify-css', function(){
  gulp.src('assets/css/*.css')
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('cssWatch', function(){
  gulp.watch("assets/css/*.css", function(){
    sequence('minify-css');
  });
});