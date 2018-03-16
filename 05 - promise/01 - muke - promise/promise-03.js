console.log("here we go")

let myPromise = new Promise(resolve => {
  setTimeout(() => {
    console.log("这个promise已经执行了");
    resolve("hello it is me ")
  },1000)
})

setTimeout(() => {
  myPromise.then(value => {
    console.log("1111")
    console.log(value) 
  })
},4000)