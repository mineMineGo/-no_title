// 匿名函数的自执行函数
/*
 好处：
  
 */
// 这里拔undefined传进来，是因为直接用的话，有可能会出现
// 被赋值的情况，比如window.undefined = 10;这时候undefined是数字10,
//　不是我们想要的情况，如果通过参数传递的话就避免了这种情况

// 而传入参数window
//一方面是为了加快找寻变量的速度，找一个变量要比找window块
//一方面是为了压缩时候function(){}中的window能被压缩，
// 不当参数，函数中直接用的化就不会压缩名字

(function(window, undefined){
  "use strict"; //严格模式
  console.log(window);
    // 21-94　行定义了一些变量和函数
    var 

    // 定义一个core_strundefined,使用typeof方法判断更加准确点
    core_strundefined = typeof undefined,

    // 也是变量赋值，方便压缩
    location = window.location,
    document = window.document,
    docElem = document.documentElement,

    // 防冲突
    _jQuery = window.jQuery,
    _$ = window.$,

    // 61行 定义了 一个函数
      // Define a local copy of jQuery
      jQuery = function() {};

    //96-283 　给JQuery对象添加一些属性和方法
      jQuery.fn = jQuery.prototype = {

      };



    //285-347　extend ：jQuery的继承
      jQuery.extend = jQuery.fn.extend = function(){
　
      };
        
    //349-817　扩展一些工具方法
    jQuery.extend();
    
    //877-2856　Sizzle: 复杂选择器的实现

    //2880-3042　Callbacks :回调对象:　对函数的统一管理
    
    //3043-3183　Defereed：　延迟对象： 对异步的统一管理

    //3184-3295　Support: 　功能检测: 

    //3308-3652　data() : 数据缓存

    //3653-3797 quene() : 队列管理

    //3803-4299 attr() prop() val() add()等等对元素属性的操作

    //4300-5128 on() trigger()等等 : 事件操作的相关方法　

    //5140-6057　DOM操作：　添加、删除、获取、包装、DOM筛选等等

    //6058-6620 css(): 样式的操作

    //6621-7854 提交的数据和ajax()，ajax() load() getJson()

    //7855-8584 animate(): 运动的方法

    //8585-8792 offset() scrollTop() 等：　位置与尺寸的方法

    //8804-8821　JQuery 支持模块化的模式

    //8826行　
      window.jQuery = window.$ = jQuery;
  })(window);
  console.log(jQuery);
  console.log($);