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