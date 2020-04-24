# Object相关知识笔记

## 哪些类型可以作为对象的key？
string、symbol

## 说说toString与valueOf
https://www.cnblogs.com/liutianzeng/p/10859000.html

所有的对象都继承了toString和valueOf这两个方法：
valueOf()  - 它的作用是返回它相应的原始值；
toString() - 它的作用是返回一个反映这个对象的字符串；

### toString和valueOf哪个先执行？
对象通过toString或valueOf方法转换为原始值，JS语言核心的内置类首先尝试使用valueOf()，再尝试使用toString()

这两个方法在不同使用场景会有不同的优先级：
* 默认情况下，执行这个抽象操作时会先执行valueOf方法；
* 如果返回的不是原始值，会继续执行toString方法；
* 如果返回的还不是原始值，那么会报错；
* 如果有指定转换类型时，情况又会有所不同。