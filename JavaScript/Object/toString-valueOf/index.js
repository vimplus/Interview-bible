// a输出什么？
var a = {};
var b = {};
a[b] = 2;

console.log(a);     // {"[object Object]": 2}

// 为什么？
// 因为b是一个对象，当它试图作为一个对象的key时，
// 由于对象的key只能是字符串，所以在进行隐式转换时会调用toString()


// toString和valueOf哪个先执行？
// 分情况，一般toString先执行，有运算操作符的情况下valueOf()的优先级高于toString()