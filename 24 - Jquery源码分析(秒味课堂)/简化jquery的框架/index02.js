function Aaa(){

}

// 当一个函数创建时候会自动添加一个constructor属性
// haha.prototype.constructor = haha;

// 这样写是往原型中添加属性并不会更改constructor属性
Aaa.prototype.name = 'hello';
Aaa.prototype.age = 30;

var a1 = new Aaa();

alert(a1.constructor);// 这时候弹出的function Aaa(){}






function Abb(){

}

// 这样写就是赋值覆盖了，所以constructor属性更改了
// Abb.prototype = {
//   name: 'hello',
//   age: 30
// };
// 所以正确的写法应该是
Abb.prototype = {
  constructor: Aaa,
  name: 'hello',
  age: 30
};

var b1 = new Abb();

alert(b1.constructor);// 这是弹出的　function Object(){ [native code] }