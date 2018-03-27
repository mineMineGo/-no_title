var gulp = require('gulp');
var shellJs = require('shelljs');

var browserify = require('browserify');

var sequence = require("run-sequence");

// fs属于node核心模块之一
var fs = require('fs');

gulp.task("default", function(){
  sequence('mainjs', 'watch');
});
gulp.task('mainjs', function(){
  browserify().add('assets/js/index.js').bundle()
  // 这里不能自动创建文件夹，所以指定的文件夹必须存在
  .pipe(fs.createWriteStream('assets/dist/main.js'));
});
gulp.task("watch", function(){
  gulp.watch(['assets/js/*.js'], function(){
    sequence('mainjs');
  });
});
