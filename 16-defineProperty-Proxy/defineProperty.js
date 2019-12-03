let obj = {}
obj.name = 'txboy';
// 等同于
Object.defineProperty(obj, 'name', {
    value: 'txboy',
    configurable: true,     // 是否可以配置（默认false），如删除属性等
    writable: true,         // 是否可以改变（默认false）
    enumerable: true        // 是否可以被枚举（默认false），如是否会出现在for in 或者 Object.keys()的遍历中
})


// ---------------------
Object.defineProperty(obj, 'name', {
    value: 'txboy'
})
// 等同于
Object.defineProperty(obj, 'name', {
    value: 'txboy',
    configurable: false,
    writable: false,
    enumerable: false
})

/** ----------------------------------------------------- **/

/**
 * writable
 */
var person = {}
Object.defineProperty(person, 'name', {
    value: 'txboy',
    writable: false     // 是否可以改变（默认false）
})

person.name = 'jack';   // 改变无效（严格模式下报错）
console.log(person.name);   // txboy


/**
 * configurable 与 writable
 */
var person = {}
Object.defineProperty(person, 'name', {
    value: 'txboy',
    configurable: false     // 是否可以配置（默认false）
})

delete person.name;   // 删除无效（严格模式下报错）
console.log(person.name);   // txboy


var person = {}
Object.defineProperty(person, 'name', {
    value: 'txboy',
    configurable: false,     // 是否可以配置（默认false）
    writable: true,     // 是否可以改变（默认false）
})

person.name = 'Tom';
console.log(person.name);   // Tom

/**
 * enumerable
 */
var person = {}
Object.defineProperty(person, 'name', {
    value: 'txboy',
    enumerable: false     // 是否可以枚举
})
person.gender = 'male';
Object.keys(person);    // ["gender"]   name没有被枚举出来


/**
 * 常量对象（创建一个真正意义上的常量对象）
 */
var person = {}
Object.defineProperty(person, 'name', {
    value: 'txboy',
    configurable: false,     // 是否可以配置（默认false）
    writable: false,     // 是否可以改变（默认false）
})

person.name = 'Tom';    // 不可改变（严格模式下报错）
console.log(person.name);   // txboy


/**
 * 禁止扩展
 * 如果你想禁止一个对象添加新属性并且保留已有属性
 */
var person = {name: 'txboy'}
Object.preventExtensions(person);
person.gender = 'male';     // 不能扩展属性（严格模式下报错）
// 仍然可以再次配置
Object.defineProperty(person, 'name', {
    value: 'Tom',
    configurable: false,
    writable: false
})

/**
 * 密封 - Object.seal()
 * Object.seal()会创建一个密封的对象
 * 这个方法实际上会在一个现有对象上调用object.preventExtensions(...)
 * 并把所有现有属性标记为configurable:false
 */
var person = {name: 'txboy'}
Object.seal(person);
person.age = 27;     // 不能扩展属性（严格模式下报错）
console.log(person.age) // undefined

// （严格模式下）不可再次配置
Object.defineProperty(person, 'name', {
    value: 'Tom',
    configurable: false
})


/**
 * 冻结 - Object.freeze()
 * Object.freeze()会创建一个冻结对象，
 * 这个方法实际上会在一个现有对象上调用Object.seal(),
 * 并把所有现有属性标记为 writable: false,这样就无法修改它们的值。
 */
var person = {name: 'txboy'}
Object.freeze(person);
person.age = 27;     // 不能扩展属性
console.log(person.age) // undefined

person.name = 'Tom'; // 不可修改已有属性的值

// （严格模式下）不可再次配置
Object.defineProperty(person, 'name', {
    value: 'Tom',
    configurable: true,
    writable: true
})