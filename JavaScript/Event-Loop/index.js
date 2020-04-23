// Question 1
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


// Question 2
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