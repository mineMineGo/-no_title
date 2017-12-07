module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',//添加banner
                beautify: false,
                footer:'\n/*! 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */',
                output: {
                // comment:  false  | 'all' | 'some''(三者选一个)
                }
            },
            buildall:{
                files: [{
                    expand:true,
                    cwd:'origin_js',//js目录下
                    src:'**/*.js',//所有js文件
                    dest: 'js'//输出到此目录下
                }]
            }
        },
        //watch监听
         watch: {  // grunt-contrib-watch的事务定义
          all: {
            // files: ['origin_stylesheets/**/*.css','origin_js/**/*.js'],
             // tasks: ['newer:uglify','newer:cssmin']
           files: ['origin_js/**/*.js'],
           tasks: ['newer:uglify','newer:babel']
          }
        },
        babel: {
          options: {
               sourceMap: true,
               presets: ['env']
           },
           dist: {
               'origin_js/**/*.js': 'js/'
           }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks("grunt-babel");
    grunt.registerTask('default',['uglify','babel','watch']);
};
