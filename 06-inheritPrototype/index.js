
// 寄生式继承
function inheritPrototype(superClass, subClass) {
    // 根据父级原型创建[备用prototype对象]
    var prototype = Object(superClass.prototype);
    // 替换构造器
    prototype.constructor = subClass;
    // 添加原型
    subClass.prototype = prototype;
}


// 寄生组合式继承(最推荐使用) - 最推荐的一种方式，接近完美的继承
function Parent() {
    this.name = 'txboy';
    this.play = [1, 2, 3, 4];
}

function Child() {
    Parent.call(this);
    this.type = 'child';
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;