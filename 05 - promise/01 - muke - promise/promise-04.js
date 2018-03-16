//假设在.then()的函数里面不返回新的Promise，会怎么样
console.log('here we go')
new Promise(resolve => {
  setTimeout(() => {
    resolve('hello, i am first')
  }, 2000);
}).then(value=>{
  console.log(value)
  console.log('everyone')
  (function(){
      return new Promise(resolve=>{
        setTimeout(() => {
          console.log('Mr.Gao')
          resolve('Merry Christmas')
        }, timeout);
      })
  })()
  return false
}).then(value=>{
  console.log('last one' + value)
})