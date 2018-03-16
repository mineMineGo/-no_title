'use strict';

// 载入gulp核心包
const gulp = require('gulp');
const less = require('gulp-less');

// gulp是用来帮我们执行一些重复操作的，
// 一般我们将这些重复操作画的呢为不同的任务


//　如何定义一个任务
// 第一个参数是任务名字
// 第二个参数是任务的执行体
gulp.task('hello', function () {
    // console.log('hello gulp')
    //　这里编写一些重复性的流程

});


// 命令行让任务运行，gulp hello

//　拷贝文件路径
gulp.task('dest', function () {
    //　获取文件
    gulp.src('src/**/*.*')
        .pipe(gulp.dest('dist/'))
})

gulp.task('style',function () {
    gulp.src('src/**/*.less')
        // 让less转换为css
        .pipe(less())
        .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.less', ['style'])
})


gulp.task('default', function () {
    console.log('这是默认任务');
    //　当src目录文件发生变化时候,自动执行后面的任务
    gulp.watch('src/**/*.*', ['style'])
})

//　定义一个http服务器
const connect = require('gulp-connect');
gulp.task('serve', function () {
    //　创建一个服务器，默认监听8080
    connect.server({
        root: 'public', //从哪个目录开启server
        livereload: true
    })
    gulp.watch('public/**/*.*', ['reload1'])
})

gulp.task('reload1', function () {
    gulp.src('public／**/*.*')
        .pipe(connect.reload());
})

//　gulp 原生不支持任何功能，只支持最基础的api，
// 需要依赖其他插件

//插件使用过程
    // +先有一个需求
    // +根据需求找到相应插件
//　编译less: gulp-less
//　编译jade: gulp-jade
//　创建本地服务器 gulp-connect
// 合并文件 gulp-concat
//　压缩js　gulp-uglify
//　重命名文件　gulp-rename
//　最小化css文件　gulp-minify-css