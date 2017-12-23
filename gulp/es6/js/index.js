const name = 11111;

import  {mine, minemine} from  './index2.js';
const [a,b] = [1,2,2];
console.log(mine(),minemine)

// 对象的解构赋值
const {log,sin,cos} = Math;

console.log(sin(30), cos(60))


// 此时字符串被转换成了一个类似数组的对象
const [h,i,g,k,l] = 'hello';
console.log(h,i,g,k,l);

let {toString:  s} = 134;
console.log(s)


// es６中的字符串拼接运用``类进行
let str = 'return '  + '`hello ${name}`';
let func  = new Function('name', str);
console.log(func('gy'));

