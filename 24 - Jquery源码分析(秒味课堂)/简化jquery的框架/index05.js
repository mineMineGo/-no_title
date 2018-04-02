// ----------------------------------------------------------------------------
$.extend();

$.fn.extend();

// 当只写一个对象自变量的时候，jq中扩展插件的形式

$.extend({
  // 扩展工具方法
  aaa: function(){
    alert(1);
  },
  bbb: function(){
    alert(2);
  }
});


// 扩展jq实例方法
$.fn.extend({
  aaa: function(){
    alert(3);
  },
  bbb: function(){
    alert(4);
  }
});



$.aaa(); // alert(1)
$.bbb(); // alert(2)


$().aaa(); // alert(3)
$().bbb(); // alert(4)


$.extend(); //其中的this -> 其实就是$,  this下扩展aaaa，调用就是$.aaa()

$.fn.extend();// 其中的this -> 其实就是$.fn 在this下面扩展aaa，调用就是$().aaa()


// 当写多个对象自变量的时候，后面的对象都是扩展到第一个对象身上
var a  = {};

$.extend(a, { name: 'hello'}, {age: 30}, {});

console.log(a); // {age: 30, name: 'hello'};


// 还可以做深拷贝或者浅拷贝
var a = {};
var b = {name: 'hello'};

$.extend(a,b);
a.name = "hi";
console.log(b.name); //不会受到影响，仍然是 hello

var a = {};
var b = {name: {age: 30}};

$.extend(a,b);
a.name.age = 20;
console.log(b.name);// 此时已经受到影响，结果是20
//　这是为什么呢？
// 　jq默认是浅拷贝,而b的形式是浅拷贝所不能完成的，会完成影响,如果不想受到影响，需要进行深拷贝
// 只需要增加一个参数true

var a = {};
var b = {name: {age: 30}};

$.extend(true,a,b);
a.name.age = 20;
console.log(b.name); // 这时候就是深拷贝,结果不受影响，仍然是30
