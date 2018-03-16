// .then()里面再有.then()的话
// 因为 .then()返回的还是promise实例
// 会等到里面的.then()执行完，在执行外边的
// 对于我们来说，此时最好将其展开，会更好读些

console.log('here we go')

new Promise(resolve=>{
  console.log('Step 1')
  setTimeout(()=>{
    resolve(100)
  },2000)
}).then(value => {
  return new Promise(resolve => {
    console.log('Step 1-1')
    setTimeout(() => {
      resolve(110)
    }, 1000);
  }).then(value => {
    console.log('Step 1-2');
    return value
  }).then(value => {
    console.log('Step 1-3');
    return value;
  })
}).then(value=>{
  console.log(value);
  console.log('Step 2')
})