
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // context: '', 上下文。默认是根目录
    // entry: ['./src/script/main.js','./src/script/test.js'],
    entry: {
        my_main: './src/script/main.js',
        my_a: './src/script/test.js',
        my_b: './src/script/b.js',
        my_c: './src/script/c.js'
    },
    output: {
        path: '/home/gaoyuan/Documents/www/no_title/webpack-demo/dist',
        // filename: '[name]-[hash]-[chunkhash].js'
        filename: 'js/[name]-[chunkhash].js',
        publicPath: 'http://mine.com', // 定义js编译出的文件的前缀路径
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html', // 根目录下的模板
            filename: 'a-[hash].html', // 指定文件名字
            inject: 'body', // 所产生的index-[hash].html中的body(也可以写成head)标签包裹script
            title: 'this is a file',
            date: new Date(),
            chunks: ['my_main','my_a'], // 规定只加载指定的chunks
            //excludeChunks: [],// 跳过（不加载）指定的chunks
            // minify: {
            //     removeComments: true, // 删除注释
            //     collapseWhitespace: true, // 删除所有的空格
            // }
        }),
        new HtmlWebpackPlugin({
            template: 'index.html', // 根目录下的模板
            filename: 'b-[hash].html', // 指定文件名字
            inject: 'body', // 所产生的index-[hash].html中的body(也可以写成head)标签包裹script
            title: 'this is b file',
            chunks: ['my_b'],
            date: new Date(),
            // minify: {
            //     removeComments: true, // 删除注释
            //     collapseWhitespace: true, // 删除所有的空格
            // }
        }),
        new HtmlWebpackPlugin({
            template: 'index.html', // 根目录下的模板
            filename: 'c-[hash].html', // 指定文件名字
            inject: 'body', // 所产生的index-[hash].html中的body(也可以写成head)标签包裹script
            title: 'this is c file',
            chunks: ['my_c'],
            date: new Date(),
            // minify: {
            //     removeComments: true, // 删除注释
            //     collapseWhitespace: true, // 删除所有的空格
            // }
        })
    ]
}