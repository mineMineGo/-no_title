var gulp = require('gulp');

var browserify = require('browserify');

var sequence = require("run-sequence");

var watchify = require('watchify');

// fs属于node核心模块之一
var fs = require('fs');

gulp.task("default", function(){
  sequence('vendorjs','mainjs');
});
gulp.task('mainjs', function(){
  var b = browserify({
    entries: ['assets/js/index.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  }).external('angular').external('lodash');
  var bundle = function(){
    b.bundle()
    // 这里不能自动创建文件夹，所以指定的文件夹必须存在
    .pipe(fs.createWriteStream('assets/dist/main.js'));
  };
  bundle();
  b.on("update", bundle);
});

gulp.task('vendorjs', function(){
  var b = browserify().require('./bower_components/angular/angular.js',{
    expose: 'angular'
  }).require('./bower_components/lodash/dist/lodash.js',{
    expose: 'lodash'　
  }).bundle().pipe(fs.createWriteStream('./assets/dist/vendor.js'));
});