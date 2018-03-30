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

(function(window, undefined) {
  "use strict"; //严格模式
  console.log(window);
  // 21-94　行定义了一些变量和函数
  var // A central reference to the root jQuery(document)
    rootjQuery,
    // The deferred used on DOM ready
    readyList,
    // 定义一个core_strundefined,使用typeof方法判断更加准确点
    core_strundefined = typeof undefined,
    // 也是变量赋值，方便压缩
    location = window.location,
    document = window.document,
    docElem = document.documentElement,
    // 防冲突
    _jQuery = window.jQuery,
    _$ = window.$,
    // 这个变量是用到$.type()时候用到的，是获得某个变量或者元素的类型(类型判断)
    // 最终呈现的一个结果是
    // ｛
    //   '[Object String]': 'string',
    //   '[Object Array]': 'array'
    // ｝
    class2type = {},
    // 跟缓存数据有关，
    core_deletedIds = [],
    // 版本号码
    core_version = "2.0.3",
    // Save a reference to some core methods
    core_concat = core_deletedIds.concat,
    core_push = core_deletedIds.push,
    core_slice = core_deletedIds.slice,
    core_indexOf = core_deletedIds.indexOf,
    core_toString = class2type.toString,
    core_hasOwn = class2type.hasOwnProperty,
    core_trim = core_version.trim,
    // 61行 定义了 一个函数
    // Define a local copy of jQuery
    jQuery = function(selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    },
    // Used for matching numbers
    // 根据正则表达式匹配数字
    core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    // 匹配空格来分割出单词
    core_rnotwhite = /\S+/g,
    // 前半部分匹配标签
    // 后半部分匹配 id (相比以前版本增加了防注入哈希功能，请百度继续了解更多)

    // 了解之一
    // https://segmentfault.com/q/1010000002976169
    // [^#<]...[^>]是用来排除像#<tagName ...>这种情况。
    // jquery 1.6.3以下版本，quickExpr没有#，有可能被攻击中利用进行XSS攻击，
    // 例如：将地址栏中的hash修改为
    // #<img src='/' onerror=(function(){//恶意代码}())。
    // 如果代码中有$(location.hash)这种写法，就会触发恶意代码。

    // 匹配的是类似　<p>aaa 或者 #div等等
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    // 匹配独立的一个标签，例如<p></p>  <div></div>
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    // 匹配浏览器的前缀　-ms-
    // 有些转换时候是驼峰命名，有些则不是
    // 　margin-left : marginLeft
    //  -webkit-margin-left: webkitMarginLeft
    //  -ms-margin-left: MsMarginLeft
    rmsPrefix = /^-ms-/,
    // 大小写,把-l(一个字符)变为L
    rdashAlpha = /-([\da-z])/gi,
    // 转驼峰的回调函数
    fcamelCase = function(all, letter) {
      return letter.toUpperCase();
    },
    // DOM加载成功回调函数
    completed = function() {
      document.removeEventListener("DOMContentLoaded", completed, false);
      window.removeEventListener("load", completed, false);
      jQuery.ready();
    };

  //96-283 　给JQuery对象添加一些属性和方法
  jQuery.fn = jQuery.prototype = {
    // 大致结构
    /*
      加上()代表是方法

      jquery: "版本",
      constructor: '版本指向问题',
      init(): '初始化和参数管理',
      selector: "存储选择字符串",
      length: 'this对象的长度',
      toArray(): '转为数组',
      get(): '转原生集合',


      */
    //  指向版本变量号
    jquery: core_version,

    constructor: jQuery,

    // 
    init: function(selector, context, rootjQuery) {
      var match, elem;
  
      // HANDLE: $(""), $(null), $(undefined), $(false)
      if (!selector) {
        return this;
      }

      // Handle HTML strings
      if (typeof selector === "string") {
        if (
          selector.charAt(0) === "<" &&
          selector.charAt(selector.length - 1) === ">" &&
          selector.length >= 3
        ) {
          // Assume that strings that start and end with <> are HTML and skip the regex check
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }

        // Match html or make sure no context is specified for #id
        if (match && (match[1] || !context)) {
          // HANDLE: $(html) -> $(array)
          if (match[1]) { 
            context = context instanceof jQuery ? context[0] : context;

            // scripts is true for back-compat
            jQuery.merge(
              this,
              jQuery.parseHTML(
                match[1],
                context && context.nodeType
                  ? context.ownerDocument || context
                  : document,
                true
              )
            );

            // HANDLE: $(html, props)
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                // Properties of context are called as methods if possible
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);

                  // ...and otherwise set as attributes
                } else {
                  this.attr(match, context[match]);
                }
              }
            }　　

            return this;

            // HANDLE: $(#id)
          } else {
            elem = document.getElementById(match[2]);

            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963
            if (elem && elem.parentNode) {
              // Inject the element directly into the jQuery object
              this.length = 1;
              this[0] = elem;
            }

            this.context = document;
            this.selector = selector;
            return this;
          }

          // HANDLE: $(expr, $(...))
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);

          // HANDLE: $(expr, context)
          // (which is just equivalent to: $(context).find(expr)
        } else {
          return this.constructor(context).find(selector);
        }

        // HANDLE: $(DOMElement)
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;

        // HANDLE: $(function)
        // Shortcut for document ready
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }

      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }

      return jQuery.makeArray(selector, this);
    },

    // 选择器
    selector: "",

    // this的长度，默认是0
    length: 0,
  };

  //285-347　extend ：jQuery的继承
  jQuery.extend = jQuery.fn.extend = function() {};

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
// console.log($().jquery)
