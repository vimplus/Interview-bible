
// Example 1
function Foo() {
    getName = function () { console.log(1); }
    return this;
}

Foo.getName = function () { console.log(2); }
Foo.prototype.getName = function () { console.log(3); }
getName = function () { console.log(4); }

// 请给出下列输出结果
Foo.getName();
getName();

Foo().getName();
getName();

Foo.getName();
new Foo().getName();

// 2 4 1 1 2 3


// Example 2
// 以下代码输出什么？为什么？严格模式下输出有变化吗？为什么？
var a = function () {this.b = 3;}
var c = new a();
a.prototype.b = 9;
var b = 7;
a();

console.log(b);
console.log(c.b);