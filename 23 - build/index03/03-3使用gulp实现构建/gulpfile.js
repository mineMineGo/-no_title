var gulp = require('gulp')
var shellJs = require('shelljs')

var browserify = require('browserify')


gulp.task("default", function(){
  // shellJs.exec('browserify  js/add-todo-controller.js  js/todo-controller.js  js/todos-controller.js  js/index.js  -o js/main.js')
  browserify().add('js/index.js').bundle()
    .pipe()
})