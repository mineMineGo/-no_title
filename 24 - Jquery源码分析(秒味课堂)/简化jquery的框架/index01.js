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
      for (name in obj) {
        return false;
      }
      return true;
    },

    error: function (msg) {
      throw new Error(msg);
    },

    parseHTML: function (data, context, keepScripts) {
      if (!data || typeof data !== 'string') {
        return null;
      }
      if (typeof context === 'bollean') {
        keepScripts = context;
        context = false;
      }
      context = context || document;
      var parsed = rsingleTag.exec(data),
        scripts = !keepScripts && [];

      // Single tag 如果是单标签,例如 <li></li>
      if (parsed) {
        return [context.createElement(parsed[1])];
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
      if (!data || typeof data !== "string") {
        return null;
      }
      // 支持ie9
      try {
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, "text/xml");
      } catch (e) {
        xml = undefined;
      }
      if (!xml || xml.getElementsByTagName("parsererror").length) {
        jQuery.error('Invalid XML' + data);
      }
      return xml;
    },
    // 一个空函数
    noop: function () {
    },

    // 全局解析js
    globalEval: function (code) {
      var script,
        // 这里的eval也进行了赋值，否则就会局部生效，而不是全局生效
        indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        //严格模式下不支持eval解析的
        if (code.indexOf("use strict") === 1) {
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

      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            // 当某个循环中的返回值为false 就立即停止循环
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.vall(obj[i], i, obj[i]);
            if (value === false) {
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
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          core_push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : core_indexOf.call(arr, elem, i);
    },

    merge: function (first, second) {
      var l = second.length,
        i = first.length,
        j = 0;
      if (typeof l === "number") {
        for (; j < l; j++) {
          first[i++] = second[j];
        }
      } else {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
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
        if (inv !== retVal) {
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

      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);

          if (value !== null) {
            ret[ret.length] = value;
          }

        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value !== null) {
            ret[ret.length] = value;
          }
        }
      }

      // 防止变为复合数组 , 复合数组： [[1], [2]]
      return core_concat.apply([], ret);
    },

    guid: 1,
    // 改变this指向
    proxy: function (fn, context) {
      var tmp, args, proxy;

      //对应的是简化写法
      if (typeof context === "string") {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      // fn必须是一个函数
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      // 截取参数，返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
      args = core_slice.call(arguments, 2);

      proxy = function () {
        //更改this指向，并组合参数
        return fn.apply(context || this, args.concat(core_slice.call(arguments)));
      };

      proxy.guid = fn.guid = fn.guid || jQuery.guid++;

      return proxy;
    },
    // 多功能值操作(内部)
    // elems可能是个集合
    // fn是个回调函数
    // key 就是类似设置属性的属性名字
    // value 就是类似于设置属性的属性值
    // chainable 如果为真就代表要设置，为假就是获取

    access: function (elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0,
        length = elems.length,
        bulk = key == null;

      //  设置多个值
      if (jQuery.type(key) === 'object') {
        chainable = true;
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
        }
      } else if (value !== undefined) {
        // 设置单个值
        chainable = true;

        if (!jQuery.isFunction(value)) {
          raw = true;
        }

        if (bulk) {
          if (raw) {
            fn.call(elems, value);
            fn = null;
          } else {
            bulk = fn;
            fn = function (elem, key, value) {
              return bulk.call(jQuery(elem), value);
            }
          }
        }
        if (fn) {
          for (; i < length; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)))
          }
        }
      }
      return chainable ?
        elems :
        // gets
        bulk ?
          fn.call(elems) :
          length ? fn(elems[0], key) : emptyGet;
    },

    now: Date.now,
    // css交换
    swap: function (elem, options, callback, args) {
      var ret, name, old = {};

      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }

      ret = callback.apply(elem, args || []);

      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    }
  });

  jQuery.ready.promise = function (obj) {
    if (!readyList) {

      readyList = jQuery.Deferred();
      if (document.readyState === "complete") {
        setTimeout(jQuery.ready)
      } else {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", completed, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", completed, false);
      }

    }
    return readyList.promise(obj);
  };


  // 844
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

  function isArrayLike(obj) {
    var length = obj.length,
      type = jQuery.type(obj);
    if (jQuery.isWindow(obj)) {
      return false;
    }
    if (obj.nodeType === 1 && length) {
      return true
    }
    return type === 'array' || type !== 'function' &&
      (length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj)
  }

  rootjQuery = jQuery(document);

  //877-2856　Sizzle: 复杂选择器的实现







  // String to Object options format cache
  var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
  function createOptions( options ) {
    var object = optionsCache[ options ] = {};
    jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
      object[ flag ] = true;
    });
    return object;
  }

  //2880-3042　Callbacks :回调对象:　对函数的统一管理
  jQuery.Callbacks = function (options) {
    options = typeof options === "string" ?
      (optionsCache[options] || createOptions(options)) :
      jQuery.extend({}, options);

    var memory,
      fired,
      firing,
      firingStart,
      firingLength,
      firingIndex,
      list = [],
      stack = !options.once && [],
      fire = function (data) {
        // for 循环 list
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for(;list && firingIndex < firingLength; firingIndex++){
          if(list[firingIndex].apply(data[0], data[1]) == false && options.stopOnFalse){
            memory = false;
            break;
          }
        }
        firing = false;
        if(list){
          if(stack){
            if(stack.length){
              fire(stack.shift());
            }
          }else if(memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      },
      self = {
        add: function () {
          if(list){
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function (_,arg) {
                var type = jQuery.type(arg);
                if(type === "function"){
                  // 数组要不要进行去重操作
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && type !== 'string') {
                  add(arg);
                }

              });
            })(arguments);
          }
        },
        remove: function f() {
          if(list){
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index == jQuery.inArray(arg, list, index )) > -1) {
                list.splice(index, 1);
                if(firing){
                  if(index <= firingLength ){
                    firingLength--;
                  }　
                  if(index <= firingIndex) {
                    firingIndex--;
                  }
                }
              }
            });
          }
        },
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) >-1 : !!(list && list.length);
        },
        empty: function(){
          list = [];
          firingLength = 0;
          return this;
        },
        disable: function () {
          list = stack = memory = undefined;
          return this;
        },
        // Is it disabled?
        disabled: function () {
          return !list;
        },
        lock: function () {
          stack = undefined;
          if(memory){
            self.disable()
          }
          return this;
        },
        // is it locked
        locked: function () {
          return !stack;
        },
        fireWith: function (context, args) {
          if(list && (!fired || stack)){
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            if (firing) {
              stack.push(args);
            } else {
              fire(args); //　最终调用上面的局部函数fire
            }
          }
          return this;
        },
        fire: function () {
          self.fireWith( this, arguments );
          return this;
        },
        fired: function () {
          return !!fired;
        }
      };
    return self;
  };


  //3043-3183　Deferred：　延迟对象： 对异步的统一管理

  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          // action, listener,  listener list, final state
          // 这里可以看出 成功和失败里面有once，只会执行一次，而notify没有once
          // 因为成功和失败就代表状态的结束了，所以执行一次就好了。而进度notify需要连续触发，可以做一个进度条之类的
          ['resolve', 'done', jQuery.Callbacks("once memory"), "resolved"],
          ['reject', 'fail', jQuery.Callbacks('once memory'), 'rejected'],
          ['notify', 'progress', jQuery.Callbacks('memory')]
      ],
          state = "pending",
          promise = {
            state: function(){
              return state;
            },
            always: function () {
              deferred.done(arguments).fail(arguments)
            },
            then: function (/* fnDone, fnFail, fnProgress */) {
              var fns = arguments;
              return jQuery.Deferred(function (newDefer) {
                jQuery.each(tuples, function (i, tuple) {
                  var action = tuple[0],
                    fn = jQuery.isFunction(fns[i]) && fns[i];
                  deferred[tuple[1]](function () {
                    var returned = fn && fn.apply(this, arguments);
                    if(returned && jQuery.isFunction(returned.promise)){
                      returned.promise()
                        .done(newDefer.resolve)
                        .fail(newDefer.reject)
                        .progress(newDefer.notify);
                    } else {
                      newDefer[action + 'With'](this === "promise" ? newDefer.promise() :this, fn ? [returned] : arguments);
                    }
                  })
                });
                fns = null;
              }).promise();
            },
            promise: function (obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          },
          deferred= {};
      promise.pipe = promise.then;

      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
            stateString = tuple[3];

        // promise [done | fail | progress] = list.add
        promise[tuple[1]] = list.add;

        // 只有完成和未完成才会走入　if　中,　进行中的是没有这个状态的
        if(stateString){
          list.add(function () {
            state  = stateString;
          },
            // 位运算元素符号　
            /*
                0^1 1
                1^1 0
                2^1 3
                3^1 2
             */
            tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        // deferred[resolve | reject | notify ]
        deferred[tuple[0]] = function () {
          deferred[ tuple[0] + "With"](this === deferred ? promise: this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });

      // make the deferred a promise
      promise.promise(deferred);

      if ( func ) {
        func.call( deferred, deferred );
      }

      return deferred;

    },
    when: function (subordinate /*, .... subordinateN */) {
      var i =0,
        // 把arguments变为一个数组
        resolveValues = core_slice.call(arguments),
        // 不传递参数length就是0
        // 传递一个参数时候, length = 1
        // 传递多个参数 比如 两个函数，两个数字  length = 4
        length = resolveValues.length,
        // 不传递参数时候length就是0, remaining 就是length,(计数器 )，就是0
        /* 传递一个参数时候length=1， remaining 就是 看(subordinate && jQuery.isFunction(subordinate.promise))，
            这时候subordinate是真(因为有第一个参数)
            假如jQuery.isFunction(subordinate.promise)是真 这时候 remaining 就是length 就是 1
            假如jQuery.isFunction(subordinate.promise)是假 这时候 remaining 就是0
          */
        /*
        此时length就是4， remaining = 4
        */

        remaining = length !== 1 || (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

        // length是0时候 deferred 就是 jQuery.Deferred()
        // length是1时候 deferred 就是 subordinate 就是传递的函数参数
        // length是4时候 deferred 就是 jQuery.Deferred()
        deferred = remaining ===1 ? subordinate : jQuery.Deferred(),

        updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? core_slice.call(arguments) :value;
            if(values === progressValues){
              deferred.notifyWith(contexts, values);
            } else if (!(--remaining)) {
              deferred.resolveWith(contexts, values);
            }
          }
        },
        progressValues, progressContexts, resolveContexts;
      // 不传递参数时候length== 0，不进入if判断
      // length为1时候仍然跳过这个if
      // length是4,所以进入
      if(length > 1){
        // new Array[4]   =>   形成一个长度为 4 的空数组
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);

        for (;i<length; i++) {
          // 这里循环参数，如果有函数参数并且返回延迟对象，就进入if
          // 否则就进去else ，remaining进行自减1
          // 由此得到，当两个函数参数(并且返回延迟队象)和两个数字 四个参数时候，　remaining最终是符合要求的函数参数的长度2
          if(resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)){
            resolveValues[i].promise()
                //
                .done(updateFunc(i, resolveContexts, resolveValues))
                // 只要又一个失败,就会触发下面的fail函数中的deferred的reject最终结果是触发when后面的跟着的fail函数
                .fail(deferred.reject)
                .progress(updateFunc(i, progressContexts, progressContexts))
          } else {
            --remaining;
          }
        }
      }
      // 不传递参数时候remaining就是 0, 就会走入
      // remaining是1时候, 会跳过
      // remaining是2时候, 会跳过

      if(!remaining){
        deferred.resolveWith(resolveContexts, resolveValues);
      }

      // 返回一个延迟对象，不能在外部更改状态
      return deferred.promise();
    }
  });

  //3184-3295　Support: 　功能检测:
  // 这个方法只支持检测，具体的抹平浏览器兼容性是在执行其他相关代码时候实现的
  jQuery.support = (function () {
    // 通过创建一系列元素，来判断元素的兼容性来实行功能检测
    var input = document.createElement('input'),
      fragment = document.createDocumentFragment(),
      div = document.createElement('div'),
      select = document.createElement('select'),
      opt = select.appendChild(document.createElement('option'));

    // 在受限制的空间提前结束
    // 基本上所有的浏览器都有默认值，是text，最经版本中的已经去掉了这个判断
    if(!input.type){
      return support;
    }

    input.type = 'checkbox';
    //　support: safari5.1 ios5.1 android4.x　android2.3
    // check the default checkbox/radio value ("" on old webkit; "on" elsewhere)
    // 老版本webkit中value值是　""   其余的基本上都是"on"
    support.checkOn = input.value !== "";
    // option默认选中
    support.optSelected = opt.selected;

    // 稍候将被定义（只是定义一个初始值）
    support.reliableMarginRight = true;
    support.boxSizingReliable = true;
    support.pixelPosition = false;

    //检测元素被克隆时候保留原来的属性状态
    input.checked = true;
    support.onCloneChecked = input.cloneNode(true).checked;

    //保证那些被禁用的selects中的子项options不被标记为不可用　
    // webkit中是被标记为禁用的
    select.disabled = true;
    support.optDisabled = !opt.disabled;

    input = document.createElement('input');
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";

    input.setAttribute('checked', 't');
    input.setAttribute('name', 't');

    fragment.appendChild(input);
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;

    support.focusinBubbles = "onfocusin" in window;

    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip　=　"";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";

    //以上就是手动创建元素并检验相关功能

    //有些需要dom加载完毕后才能检测的
    jQuery(function () {
      var container, marginDiv,
        divReset = "padding: 0;margin: 0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing: content-box;" +
          "box-sizing: content-box",
        body = document.getElementsByTagName("body")[0];
      if(!body){
        return;
      }
      container = document.createElement('div');
      container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

      // 检查box-sizing 和　margin　行为
      body.appendChild(container).appendChild(div);
      div.innerHTML = "";
      div.style.cssText = "-webkit-box-sizing:border- box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;" +
        "display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

      jQuery.swap(body, body.style.zoom != null ? {zoom: 1} :{}, function () {
        support.boxSizing = div.offsetWidth === 4;
      });
      // node.js下就没有window.getComputedStyle
      if(window.getComputedStyle){
        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== '1%';
        support.boxSizingReliable = (window.getComputedStyle(div, null) || {width: '4px'}).width === '4px';


        marginDiv = div.appendChild(document.createElement("div"));
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = "0";
        div.style.width = "1px";

        support.reliableMarginRight =
          !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
      }

      body.removeChild(container);

    });
    return support;
  })({});
  //3308-3652　data() : 数据缓存
  var data_user, data_priv,
    rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    rmultiDash = /([A-Z])/g;
  function Data(){

  }
  Data.uid =1;

  Data.accepts = function(){

  };

  Data.prototype = {
    key: function () {
      
    },
    set: function () {

    },
    get: function(){

    },
    access: function(){

    },
    hasData: function(){

    },
    remove: function () {

    },
    discard: function () {

    }
  };

  // These may be used throughout the jQuery core codebase
  data_user = new Data(); // 对外
  data_priv = new Data(); // 对内

  jQuery.extend({
    acceptData: Data.accepts,
    
    hasData: function (elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem);
    },
    
    data: function (elem, name, data) {
      return data_user.access(elem, name, data);
    },
    
    removeData: function (elem, name) {
      data_user.remove(elem, name);
    },
    
    _data: function (elem, name, data) {
      return data_priv.access(elem, name, data);
    },
    
    _removeData: function (elem, name) {
      data_priv.remove(elem, name);
    }
  });

  jQuery.fn.extend({
    data :function () {
      
    },
    removeData: function () {
      
    }
  });

  function dataAttr(){

  }

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
