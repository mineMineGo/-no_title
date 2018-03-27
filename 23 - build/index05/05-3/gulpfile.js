var gulp = require('gulp');

var browserify = require('browserify');

var sequence = require("run-sequence");

var watchify = require('watchify');

var uglify = require("gulp-uglify");

var source = require("vinyl-source-stream");

var buffer = require("vinyl-buffer");

var gif = require('gulp-if');

var coffee = require("gulp-coffee");

var gulpBabel = require("gulp-babel");

var isProduction = process.env.ENV　=== "prod"; 
// fs属于node核心模块之一
var fs = require('fs');

gulp.task("default", function(){
  sequence("babel","babelWatch",'mainjs');
});
gulp.task('mainjs', function(){
  var b = browserify({
    entries: ['assets/build/js/index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });
  var bundle = function(){
    b.bundle()
     .pipe(source('main.js'))
     .pipe(buffer())
     .pipe(gif(!isProduction, uglify()))
    // 这里不能自动创建文件夹，所以指定的文件夹必须存在
    .pipe(gulp.dest('assets/dist/'));
  };
  bundle();
  b.on("update", bundle);
});

gulp.task("coffee", function(){
  gulp.src("./assets/js/*.coffee")
    .pipe(coffee())
    .pipe(gulp.dest("./assets/build/js/"));
});

gulp.task("coffeeWatch", function(){
  gulp.watch("assets/js/*.coffee", function(){
    sequence("coffee");
  });
});

gulp.task('babel', function(){
  gulp.src('./assets/js/*.js')
    .pipe(gulpBabel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest('./assets/build/js/'));
});

gulp.task('babelWatch', function(){
  gulp.src('assets/js/*.js', function(){
    gulp.watch('assets/js/*.js', function(){
      sequence('babel');
    });
  });
});