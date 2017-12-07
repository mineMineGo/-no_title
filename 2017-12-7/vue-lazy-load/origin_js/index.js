(function () {
    var asdfdsf = 1111;
    //这是一行注释
    // 这行注释被隐藏了
    console.log(asdfdsf);
    console.log(VueLazyload);
    Vue.use(VueLazyload, {
        // preLoad: 1.0,
        error: './images/logo.png',
        loading: './images/logo.png',
        // attempt: 1
    });
    var appVUe = new Vue({
        el: '#app',
        data: {
          items: [
            'http://upload.iiifood.cn/upload/goods/6/0/1/60192e3dbc1b0d8cc18216d7576d9b61.png?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',
            'http://upload.iiifood.cn/upload/goods/c/0/8/c08f510e87ac356b3077934e2d01b648.JPG?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',
            'http://upload.iiifood.cn/upload/goods/e/7/2/e7243a25617094694072659636d0a6c0.jpg?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',
            'http://upload.iiifood.cn/upload/goods/b/9/4/b9407565911b475c1b638acce6d5e9e4.jpg?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',
            'http://upload.iiifood.cn/upload/goods/4/a/d/4ade6828565d090368cafa259d741a46.jpg?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',
            'http://upload.iiifood.cn/upload/goods/4/a/d/4ade6828565d090368cafa259d741a46.jpg?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',

            'http://upload.iiifood.cn/upload/goods/4/a/d/4ade6828565d090368cafa259d741a46.jpg?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',

            'http://upload.iiifood.cn/upload/goods/4/a/d/4ade6828565d090368cafa259d741a46.jpg?x-oss-process=image/resize,limit_0,m_fill,w_320,h_230/auto-orient,0',
            'http://upload.iiifood.cn/upload/goods/a/4/2/a42a0fb51cdb38f957eb4a46f73a31da.jpg?x-oss-process=image/resize,limit_0,m_fill,w_300,h_300/auto-orient,0',
            'http://upload.iiifood.cn/upload/goods/a/d/4/ad45094722ab2dc2600a3793983f2d67.jpg?x-oss-process=image/resize,limit_0,m_fill,w_300,h_300/auto-orient,0'
          ]
        },
        mounted: function() {
            // this.getData();
        },
        methods: {
            // getData() {
            //     axios.get('https://api.douban.com/v2/book/1220562', {
            //         // headers: 'https://api.douban.com'
            //     }).then(function (response) {
            //         console.log(response);
            //     }).catch(function (error) {
            //         console.log(error);
            //     });
            // }
        }
    });
})();
