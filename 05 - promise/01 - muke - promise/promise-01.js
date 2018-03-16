console.log("here we go");
new Promise( resolve => {
  setTimeout(() => {
    resolve('hello')
  },2000)
}).then(value => {
  console.log('then执行了' + value)
})