
// 这里的script需要加一个转移字符\否则会和他临近的script匹配一对
var str = '<li>1</li><li>2</li><li>3</li><script>alert(444)<\/script>';

console.log(jQuery); 

// jQuery.parseHTML第三个参数
//  为false时文档中不会添加script
//  为true 时文档中会添加script
var arr　= jQuery.parseHTML(str,document, false);
$.each(arr, function(i){
  $('ul').append(arr[i]);
});



// jQuery的merge()方法的作用是修改第一个数组，使得它末尾加上第二个数组。其实，允许第二个参数不为数组

/*
jQuery的merge()源码如下：

merge: function( first, second ) {  
    var l = second.length, i = first.length, j = 0;  
    // second可以是一个对象  
    if (typeof l === "number" ) { // 如果second是数组  
        for (; j < l; j++)   
            first[i++] = second[j];  
    }   
    else { // 如果second不是数组  
        // 如second = {}; second[0] = 1; second[1] = 2; second[2] = 3;  
        while (second[j] !== undefined)   
            first[i++] = second[j++];  
    }  
    first.length = i;  
    return first;  
},  


*/



var arr1 = ['a','b'];
var arr2 = {
  0: 'a',
  1: 'b',
  length: 2
};
var arr3 = ['c','d'];


console.log( jQuery.merge(arr1, arr3));

// console.log( jQuery.merge(arr1, arr2));

console.log( jQuery.merge(arr2, arr3));
