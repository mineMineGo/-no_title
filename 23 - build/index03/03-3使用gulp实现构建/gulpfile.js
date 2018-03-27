var gulp = require('gulp');
var shellJs = require('shelljs');

var browserify = require('browserify');

// fs属于node核心模块之一
var fs = require('fs');

gulp.task("default", function(){
  // shellJs.exec('browserify  js/index.js  -o js/main.js')
  browserify().add('js/index.js').bundle()
    .pipe(fs.createWriteStream('js/main.js'));
})