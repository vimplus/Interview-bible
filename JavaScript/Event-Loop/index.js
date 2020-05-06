// Example 1
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');


// Example 2
async function async1() {
    await async2();
    console.log(1);
}
async function async2() {
    console.log(2);
}
console.log(3);
setTimeout(function () {
    console.log(4);
})
async1();
console.log(5);


// Example 3
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')


// Example 4
setTimeout(() => console.log("a"), 0)

var p = new Promise(function (resolve, reject) {
    resolve()
});

p.then(() => {
  var begin = Date.now();
  while (Date.now() - begin < 1000);
  console.log("b")
  
  new Promise(function (resolve, reject) {
      resolve()
  }).then(() => console.log("c"))
});