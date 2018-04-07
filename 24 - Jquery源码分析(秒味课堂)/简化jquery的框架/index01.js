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

(function (window, undefined) {
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
    jQuery = function (selector, context) {
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
    fcamelCase = function (all, letter) {
      return letter.toUpperCase();
    },
    // DOM加载成功回调函数
    completed = function () {
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
      pushStack():  JQ对象的入栈,
      each(): 遍历集合,
      ready(): DOM加载的集合，
      silce(): 集合的截取,
      first(): 集合的第一项,
      last(): 集合的最后一项,
      eq(): 集合的指定项,
      map(): 返回新集合,
      end(): 返回集合前一个状态,
      push(): 内部使用，
      sort(): 内部使用,
      splice(): 内部使用


      */
    //  指向版本变量号
    jquery: core_version,

    constructor: jQuery,

    //
    init: function (selector, context, rootjQuery) {
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
            // match = ['#div1', null, 'div1'];类似于这样的结构
            elem = document.getElementById(match[2]);

            // Check parentNode to catch when Blackberry 4.6 returns
            // nodes that are no longer in the document #6963

            //　兼容黑莓4.6中的一个问题
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
        //　进入判断的是类似于$(this) $(docuemnt)之类的
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;

        // HANDLE: $(function)
        // Shortcut for document ready
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }

      // 剩下类似于　$([]) $({}) $($('#div1'))
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
    // 转数组　
    toArray: function () {
      return core_slice.call(this);
    },
    //  转　原生集合
    get: function (num) {
      console.log(this)
      return num == null ?

        // Return a 'clean' array
        this.toArray() :

        // Return just the object
        (num < 0 ? this[this.length + num] : this[num]);
    },
    // JQ对象入栈处理
    pushStack: function (elems) {

      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems);

      // Add the old object onto the stack (as a reference)
      ret.prevObject = this;
      ret.context = this.context;

      // Return the newly-formed element set
      return ret;
    },

    each: function (callback, args) {
      return jQuery.each(this, callback, args);
    },

    ready: function (fn) {
      // Add the callback
      jQuery.ready.promise().done(fn);

      return this;
    },

    slice: function () {
      return this.pushStack(core_slice.apply(this, arguments));
    },

    first: function () {
      return this.eq(0);
    },

    last: function () {
      return this.eq(-1);
    },

    eq: function (i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },

    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },

    end: function () {
      return this.prevObject || this.constructor(null);
    },

    push: core_push,
    sort: [].sort,
    splice: [].splice
  };

  // Give the init function the jQuery prototype for later instantiation
  jQuery.fn.init.prototype = jQuery.fn;

  //285-347　extend ：jQuery的继承
  jQuery.extend = jQuery.fn.extend = function () {

    /*
      定义一些变量
      if(){}　看看是不是深拷贝情况
      if(){}  看看参数正确不
      if(){}  看是不是插件情况
      for(){　可能有多个对象情况
        if(){} 防止循环引用
        if(){} 深拷贝
          else if(){} 浅拷贝
      }
    */
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // 看看是不是深拷贝
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    //看看参数正确不
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {};
    }
    //　看看是不是插件情况
    if (length === i) {
      target = this;
      --i;
    }

    // 可能有多个对象
    for (; i < length; i++) {

      if (options = arguments[i] !== null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
// 防止循环引用  
          if (target === copy) {
            continue;
          }
        }

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : [];
          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }

          target[name] = jQuery.extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
    return target;
  };

  //349-817　扩展一些工具方法
  jQuery.extend({
    /*
      expando: 生成唯一JQ字符串(内部)
      noConflict():　防止冲突
      isReady: DOM是否加载完成(内部)
      readyWait: 等待多少文件的计数器(内部)
      holdReady(): 推迟DOM触发
      ready(): 准备DOM触发
      isFunction(): 是否为函数
      isArray(): 是否为数组
      isWindow(): 是否是window
      isNumberic(): 是否为数字
      type(): 判断数据类型
      isPlainObject(): 是否位对象自变量
      isEmptyObject(): 是否位空的对象
      error(): 抛出异常
      parseHTML(): 解析节点
      parseJSON(): 解析JSON
      parseXML(): 解析XML
      noop(): 空函数
      globalEval()：　全局解析JS
      camelCase(): 转驼峰
      nodeName(): 是否位指定节点名(内部)
      each():　遍历集合
      trim(): 去除前后空格
      makeArray(): 类数组转为真数组
      inArray(): 数组版indexOf
      merge(): 合并数组
      grep(): 过滤新数组
      map(): 映射新数组
      guid：　唯一标识符(内部)
      proxy(): 改this指向
      access(): 多功能值操作(内部)
      now(): 当前时间
      swap()：　css交换(内部)
    */
    expando: "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),

    noConflict: function (deep) {
      if (window.$ === jQuery) {
        window.$ = _$; //如果已经定义了$，这里时候jq已经放弃了$,因为30,31行已经把$赋值给了_$,这里有又重新赋值了
      }

      if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery;
      }

      return jQuery;
    },

    isReady: false,

    readyWait: '',

    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },

    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;

      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.trigger) {
        jQuery(document).trigger("ready").off("ready");
      }
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === "function";
    },

    isArray: Array.isArray,

    isWindow: function (obj) {
      // undefined == null  //true
      // null == null //true
      //其他的例如false 等　false == null均为false
      return obj != null && obj === obj.window;
    },

    isNumeric: function (obj) {
      // isFinite() 函数用于检查其参数是否是无穷大
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },

    type: function (obj) {
      if (obj == null) {
        return String(obj);
      }
      return typeof obj === 'object' || typeof obj === 'function' ?
        //   844行又写了函数
        /*
        // Populate the class2type map
                jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
                    class2type[ "[object " + name + "]" ] = name.toLowerCase();
                });
         */
        //这里匹配class2type中的某个属性值
        class2type[core_toString.call(obj)] || 'object' : typeof  obj;
    },
    // 判断是否为对象自变量
    isPlainObject: function (obj) {
      // !== object 必然不是兑对象自变量，比如number, string, boolean等
      // dom节点用$.type()判断的话会返回object
      // window用$.type()也是返回object
      if (jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor &&
          !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
      } catch (e) {
        return false
      }
      // If the function hasn't returned already, we're confident that
      // |obj| is a plain object, created by {} or constructed with new Object
      return true;
    },
    isEmptyObject: function (obj) {
      var name;
      for(name in obj){
        return false;
      }
      return true;
    },

    error: function (msg) {
      throw new Error(msg);
    },

    parseHTML: function (data, context, keepScripts ) {
      if(!data || typeof data !== 'string' ){
        return null;
      }
      if(typeof context === 'bollean'){
        keepScripts = context;
        context = false;
      }
      context = context || document;
      var parsed = rsingleTag.exec(data),
          scripts = !keepScripts && [];

      // Single tag 如果是单标签,例如 <li></li>
      if ( parsed ) {
        return [ context.createElement( parsed[1] ) ];
      }
      // 多标签的话 <li></li><div></div><li></li>

      //通过文档碎片形式创建节点
      parsed = jQuery.buildFragment([data], context, scripts);

      if (scripts) {
        jQuery(scripts).remove();
      }
      return jQuery.merge([], parsed.childNodes);
    },
    // 解析json
    parseJSON: JSON.parse,
    //解析xml
    parseXML: function (data) {
      var xml, tmp;
      // 只有字符串类型的才可以被解析
      if(!data || typeof data !== "string"){
        return null;
      }
      // 支持ie9
      try{
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, "text/xml");
      }catch (e){
        xml = undefined;
      }
      if(!xml || xml.getElementsByTagName("parsererror").length){
        jQuery.error('Invalid XML' + data);
      }
      return xml;
    },
    // 一个空函数
    noop: function() {},

    // 全局解析js
    globalEval: function (code) {
      var script,
          // 这里的eval也进行了赋值，否则就会局部生效，而不是全局生效
          indirect = eval;
      code = jQuery.trim(code);
      if(code){
        //严格模式下不支持eval解析的
        if(code.indexOf("use strict") === 1){
          script = document.createElement("script");
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    // 转驼峰
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
    },
    //是否为指定节点(内部使用)
    codeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    // args仅限于内部使用
    each: function (obj, callback, args) {
      var value,
          i = 0,
          length = obj.length,
          isArray = isArrayLike(obj);

      if(args){
        if(isArray){
          for( ;i<length;i++){
            value = callback.apply(obj[i], args);
            if(value === false){break}
          }
        }else {
          for(i in obj){
            value = callback.apply(obj[i],args);
            if(value === false){break}
          }
        }
      } else {
        if(isArray){
          for(;i<length;i++){
            // 当某个循环中的返回值为false 就立即停止循环
            value = callback.call(obj[i], i, obj[i]);
            if(value === false){
              break;
            }
          }
        } else {
          for(i in obj){
            value = callback.vall(obj[i],i,obj[i]);
            if(value === false){
              break
            }
          }
        }
      }
      return obj;
    },
    
    trim: function (text) {
      return text == null ? '' : core_trim.call(text)
    },

    makeArray: function (arr, results) {
      var ret = results || [];
      if(arr != null){
        if(isArrayLike(Object(arr))){
          jQuery.merge(ret, typeof arr === "string" ? [arr] :arr);
        }else {
          core_push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : core_indexOf.call(arr,elem, i);
    },
    
    merge: function (first, second) {
      var l = second.length,
          i = first.length,
          j = 0;
      if(typeof l === "number"){
        for (;j<l;j++){
          first[i++] = second[j];
        }
      } else {
        while (second[j] !== undefined){
          first[ i++ ] = second[ j++ ];
        }
      }
      first.length = i;

      return first;
    },
    // 过滤新数组
    grep: function (elems, callback, inv) {
       var retVal,
           ret = [],
           i = 0,
           length = elems.length;

       inv = !!inv; //当不才传递第三个参数时候是undefined, !!undefined就是false

      for (; i < length; i++) {
        retVal = !!callback(elems[i], i);
        if(inv !== retVal){
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    // arg参数限于内部使用
    map: function (elems, callback, arg) {
      var value,
          i = 0,
          length = elems.length,
          isArray = isArrayLike(elems),
          ret = [];

      if(isArray){
        for ( ;i < length; i++) {
          value = callback(elems[i], i, arg);

          if(value !== null){
            ret[ret.length] = value;
          }

        }
      } else {
        for(i in elems){
          value = callback(elems[i], i, arg);
          if(value !== null){
            ret[ret.length] = value;
          }
        }
      }

      // 防止变为复合数组 , 复合数组： [[1], [2]]
      return core_concat.apply([], ret);
    }


  });
  // 844
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function isArrayLike(obj){
    var length = obj.length,
        type = jQuery.type(obj);
    if(jQuery.isWindow(obj)){
      return false;
    }
    if(obj.nodeType === 1 && length){
      return true
    }
    return type === 'array' || type !== 'function' &&
        (length === 0 || typeof length === "number"  && length > 0 && ( length - 1 ) in obj )
  }

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
