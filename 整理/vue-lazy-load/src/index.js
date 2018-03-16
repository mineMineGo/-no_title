(function () {
   var asdfdsf = 1111
   //这是一行注释
   // 这行注释被隐藏了
   console.log(asdfdsf);
    Vue.use(VueLazyload, {
        preLoad: 1.3,
        error: './images/logo.png',
        loading: './images/logo.png',
        attempt: 1
    })
    var appVUe = new Vue({
        el: '#app',
        data: {
        },
        mounted(){
            this.getData()
        },
        methods: {
            getData(){
                axios.get('http://v.juhe.cn/toutiao/index',{
                    // headers: 'https://api.douban.com'
                }).then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    })
})()
