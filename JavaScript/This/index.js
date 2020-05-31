// Example 1
var a = 1;
var obj = {
    a: 2,
    fn: function () {
        (() => {
            console.log(this.a);
        })()
    }
}
obj.fn();   // 2


// Example 2
var x = 10;
var o = {
    x: 20,
    func: () => {
        console.log(this.x);
    }
}
o.func();   // 10



var name = 'Windows';
var object = {
    name: 'Mac',
    getName: function () {
        return function () {
            return this.name;
        }
    }
}

object.getName()()