console.log("here we go")
new Promise(resolve => {
  setTimeout(() => {
    resolve('第一个resolve')
  }, 2000)
}).then(value => {
  console.log("走到then中了");
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('第二个resolve')
    }, 2000)
  })
}).then(value => {
  console.log("2" + value)
})