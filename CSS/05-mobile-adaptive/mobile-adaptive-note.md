# 移动端的几种适配方法
开发移动端网站，我们都离不开页面适配这个问题，今天我们来总结一下移动端有哪几种实现方案，以及分别的实现原理。

## 页面适配主要解决的问题
1. 元素自适应问题
2. 文字rem问题
3. 高清图问题
4. 1像素问题
5. 横竖屏显示问题
6. 手机字体缩放问题

## 适配方案总结
* 通过媒体查询(`media query`)的方式，即：CSS3的`@media + rem`;
* 以天猫首页为代表的 flex 弹性布局;
* 以淘宝首页为代表的 `rem + viewport`方案(`flexible.js`);
* `vw/vh`方案

## @media + rem
**Media Query**的方式主要是通过查询设备的宽度来执行不同的`css`代码，最终达到界面的适配。
结合`rem`的原理，核心代码如下：

```css
@media screen and (min-width:1280px){
    html{font-size: 62.5%;}
}
```

为什么设置`font-size`就可以达到适配效果呢？这里我们来复习一下rem的原理：

`rem`是`CSS3`的一个相对长度单位。既然是相对长度，那就有一个参照体了，`rem`就是相对于**html元素**的`font-size`计算值的倍数。
> 即: **1rem 等于`1`倍的html元素的`font-size`值。**

一般浏览器默认的`font-size`值为`16px`, 如果设置某个盒子的宽为`1rem`, 那转化成实际显示的像素宽度为`16px`。
再来看看上面的代码，我们设置`font-size: 62.5%;`的目的是什么呢？

> 为了方便计算，我们以`font-size:10px`为基准单位，即：`16*62.5%=10`。

因此，基于media + rem的原理，我们可以通过媒体查询(`media query`)根据不同设备的像素范围分别定义不同的`font-size`来实现移动端的适配效果。

### 这种方案有什么优缺点呢？
#### 优点

* media query可以做到设备像素比的判断，方法简单，成本低，特别是对移动端和PC端维护同一套代码的时候；（Bootstrap等框架的使用方案）
* 图片便于修改，只需修改css文件；
* 调整屏幕宽度的时候不用刷新页面即可响应式展示；

#### 缺点

* 针对不同的手机分辨率，需要写多套 @media 查询语句，多一种机型就需要多写一套查询语句，而且随着现在手机的层出不穷，这个页面很有可能在一些新出的机型上有问题。
* 代码量比较大，维护不方便;
* 为了兼顾大屏幕或高清设备，会造成其他设备资源浪费，特别是加载图片资源；
* 为了兼顾移动端和PC端各自响应式的展示效果，难免会损失各自特有的交互方式；

## Flex弹性布局
以天猫的实现方式进行说明：

它的`viewport`是固定的：

```html
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
```

高度定死，宽度自适应，元素都采用`px`做单位。

随着屏幕宽度变化，页面也会跟着变化，效果就和PC页面的流体布局差不多，在哪个宽度需要调整的时候使用响应式布局调调就行（比如网易新闻），这样就实现了『适配』。


## rem + viewport方案
根据不同屏幕动态写入`font-size`和`viewport`，以`rem`作为宽度单位。

手淘的`flexible.js`也是`rem`适配的，它是将设备分成`10`份，`1rem`等于`1/10`。分析其中部分代码：

```JavaScript
var dpr = 0;
var scale = 0;
var isIPhone = window.navigator.appVersion.match(/iphone/gi);
var devicePixelRatio = window.devicePixelRatio;
if (isIPhone) {
    // iOS下，对于2和3的屏，用2 or 3倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
        dpr = 3;
    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
        dpr = 2;
    } else {
        dpr = 1;
    }
} else {
    // 其他(Android)设备下，仍旧使用1倍的方案
    dpr = 1;
}
scale = 1 / dpr;

var doc = window.document;
var docEl = doc.documentElement;
var metaEl = doc.querySelector('meta[name="viewport"]');
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
```
以上代码当`dpr`(设备物理像素和设备独立像素比)为`3`时候，页面缩入`1/3,` `dpr`为`2`时，页面绽放`1/2`。

```JavaScript
function refreshRem(){
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
        width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
}
refreshRem();
```

以上代码将`1rem`设置成了设备真实宽度的1/10，因此html根元素的fontSize也就是设备真实宽度的1/10，假如设计老铁们给的漂亮稿子是750px宽的，写scss时1rem也就应该等于75px,那边我么的scss文件可以这样写：

```scss
@function px2rem($px, $base: 75) {
    @return ($px / $base) * 1rem;
}
/* 稿子上量得某按钮宽60px,高20px */
.btn{
    width:px2rem(60);
    height:px2rem(20);
}
```

## vw/vh方案

vw: `viewport width(可视窗口宽度)`
vh: `viewport height(可视窗口高度)`

`1vw`等于`1%`的设备宽度(设计稿宽度);

`1vh`等于`1%`的设备高度(设计稿高度);

这样看来`vw,vh`其实是最方便的，但是目前兼容性不是特别好。

所以只有在不需要考虑兼容的时候可以用这个相对最简便的适配方案了,比如一些混合开发里，App内的浏览器如果支持`vw/vh`，只在App内使用的页面就可以放心大胆的用了。

使用示例：

```scss
/*右下角窗口设计稿宽200px，高220px*/
@function px2vw($px, $base: 200) {
  @return ($px/($base/100)) + vw;
}
@function px2vh($px, $base: 220) {
  @return ($px/($base/100)) + vh;
}
/*头像宽42px,高42px*/
.avantar{
    width:px2vw(42);
    heightx:px2vh(42);
}
```

## 参考文献

* [移动端的3种适配方法](https://segmentfault.com/a/1190000019677612)
* [移动端H5解惑-页面适配](https://juejin.im/post/5b6503dee51d45191e0d30d2)


