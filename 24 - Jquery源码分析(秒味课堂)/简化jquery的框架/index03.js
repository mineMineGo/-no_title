
// 针对的$选择器

if(!selector ){
// 
//  先过滤不符合要求的选择器
// $('') $(null) $(undefined) $(false)

}


if(typeof selector === "string"){
  // 选择器有  $('#div') $('.box') $('div) $('#div p.box')等等
  // 当然也可以创建　$('<li>')　$('<li>11</li><li>2</li>')等等


  // 判断选择器是不是　标签
  if (
    selector.charAt(0) === "<" &&
    selector.charAt(selector.length - 1) === ">" &&
    selector.length >= 3
  ) {
    // 匹配的是这些
    // $('<li>')　$('<li>11</li><li>2</li>')
    
    match = [null, selector, null];

    // 最终match变成了什么呢
    //如果是单标签的话就是　match = [null, '<li>', null]
    // 如果是多标签的话就是 match = [null, '<li>11</li><li>2</li>', null]


  } else {

    // 匹配的就是 $('#div') $('.box') $('div) $('#div p.box')等等
    // 还有类似于$('<li>hello')

    // 当然其实　$('<li>hello') 和$('<li>')效果是一致的，可见else内部也是做了处理的

    // 这里的match利用了　rquickExpr，　他匹配到的是标签加上数子　或者　#id名字
    // match = null;  $('.box') , $('div'), $('#div1 div.box')
    
    // match = ['#div1', undefined, 'div1'];   匹配id的话　　$('#div1')

    // match = ['<li>hello', '<li>', undefined]

    match = rquickExpr.exec(selector);
  }


  // Match html or make sure no context is specified for #id
  if ( match && (match[1] || !context) ) {
    //符合这个条件的有　$('<li>') $('#div1')

    // 进一步判断
    if(match[1]){
      // $('<li>')
      context = context instanceof jQuery ? context[0] : context;
      
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


    } else {
      // $('#div1')
    }
  }





} 
else if(selector.nodeType){
  // 类似于　$(this) $(document)
} else if(jQuery.isFunction(selector)){
  // 传递函数处理
  // 例如　$(function(){   })
}


// 最后主要处理例如传递数组或者json形式的参数
//   $([])  $({})
return jQuery.makeArray(selector, this);


  