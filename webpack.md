
# webpack相关考点

## 介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的？
1.当修改了一个或多个文件；
2.文件系统接收更改并通知webpack；
3.webpack重新编译构建一个或多个模块，并通知HMR服务器进行更新；
4.HMR Server 使用webSocket通知HMR runtime 需要更新，HMR运行时通过HTTP请求更新jsonp；
5.HMR运行时替换更新中的模块，如果确定这些模块无法更新，则触发整个页面刷新。

## webpack中loader和plugin的区别
对于loader，它就是一个转换器，将A文件进行编译形成B文件，这里操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程；

对于plugin，它就是一个扩展器，它丰富了wepack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，例如：

* run：开始编译
* make：从entry开始递归分析依赖并对依赖进行build
* build-moodule：使用loader加载文件并build模块
* normal-module-loader：对loader加载的文件用acorn编译，生成抽象语法树AST
* program：开始对AST进行遍历，当遇到require时触发call require事件
* seal：所有依赖build完成，开始对chunk进行优化（抽取公共模块、加hash等）
* optimize-chunk-assets：压缩代码
* emit：把各个chunk输出到结果文件


## webpack优化
* CommonsChunkPlugin - 抽离第三方库单独打js；
* DLLPlugin 和 DllReferencePlugin - 把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。通过 DllReferencePlugin 关联 vendor-manifest.json映射文件读取第三方库；

## babel中preset和plugin的区别
preset是plugin的集合。

## babel将ES6转化成ES5的代码遵循什么规范？
> https://blog.csdn.net/a250758092/article/details/78543440

babel转换后的代码是遵循commonJS规范的，而这个规范，浏览器并不能识别，而nodeJS是commonJS的实现者，因此在node中是可以运行的。
完整的转换流程为：ES6->ES5(commonJS规范)->浏览器可执行代码


## Less和Sass有什么区别？
* Less环境较Sass简单：Less基于JavaScript，Sass基于Ruby；
* Less使用较Sass简单：Less只是 CSS 语法的基础上，为 CSS 加入程序式语言的特性；
* 从功能出发，Sass较Less略强大一些；
    - sass有函数的概念；
    - Sass支持条件语句，而Less不支持；
    - Sass支持输出设置，Less没有输出设置，Sass提供4种输出选项：nested, compact, compressed 和 expanded；
* 语法上的一些区别，比如定义变量：LESS 采用`@`符号，SCSS 采用`$`符号。

### 共同点
1、混入(Mixins)：class中的class；
2、参数混入：可以传递参数的class，就像函数一样；
3、嵌套规则：Class中嵌套class，从而减少重复的代码；
4、运算：CSS中用上数学；
5、颜色功能：可以编辑颜色；
6、名字空间(namespace)：分组样式，从而可以被调用；
7、作用域：局部修改样式；
8、JavaScript 赋值：在CSS中使用JavaScript表达式赋值。


## 你知道source-map的原理是什么吗？
生成map文件记录打包前后的信息，mappings字段通过VLQ编码规则记录源码打包前后的位置信息。

关键就是map文件的mappings属性，这是一个很长的字符串，它分成三层：
```
第一层是行对应，以分号（;）表示，每个分号对应转换后源码的一行。所以，第一个分号前的内容，就对应源码的第一行，以此类推。
第二层是位置对应，以逗号（,）表示，每个逗号对应转换后源码的一个位置。所以，第一个逗号前的内容，就对应该行源码的第一个位置，以此类推。
第三层是位置转换，以VLQ编码表示，代表该位置对应的转换前的源码位置。
```

### 位置对应的原理
- 第一位，表示这个位置在（转换后的代码的）的第几列。
- 第二位，表示这个位置属于sources属性中的哪一个文件。
- 第三位，表示这个位置属于转换前代码的第几行。
- 第四位，表示这个位置属于转换前代码的第几列。
- 第五位，表示这个位置属于names属性中的哪一个变量。