# 移动端的几种适配方法
开发移动端网站，我们都离不开页面适配这个问题，今天我们来总结一下移动端有哪几种实现方案，以及分别的实现原理。

## 几个概念
聊到移动端适配，我们不得不先来了解一下`物理像素(设备分辨率)`、`设备独立像素(逻辑像素)`、`设备像素比(dpr)`、`CSS像素`、`viewport`这几个概念。
### 物理像素

**物理像素**是显示设备中一个最微小的物理部件，通俗讲其实就是厂商在出厂时为设备设计的屏幕分辨率，这个值是固定的。例如`iPhone 6`的分辨率为`750 x 1334`，这个值就是它的物理像素。

### 设备独立像素

**设备独立像素**（DIP: Device independent Pixel）也称为逻辑像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

### 设备像素比

**设备像素**(dpr: device pixels ratio)定义了**物理像素**和**设备独立像素**的对应关系，即：

> 设备像素比（dpr） ＝ 物理像素 / 设备独立像素

以`iPhone 6`为例：

> iPhone 6的物理像素为: 750 x 1334，
> 设备宽和高为375 x 667，可以理解为：设备独立像素，
> 因此iPhone 6的`设备像素比(dpr)`为`2`。

在JavaScript中我们可以通过：`window.devicePixelRatio`获取`dpr`。

### CSS像素

简单的说，**CSS像素**是在CSS、JavaScript中使用的一个长度单位，单位`px`。

在PC端Web浏览器中CSS的`1个像素`往往都是对应着电脑屏幕的`1个物理像素`，这可能会造成一个错觉，那就是CSS中的像素就是设备的物理像素。

实际上并非如此，CSS中的像素只是一个抽象的单位，在不同的设备或不同的环境中，CSS中的`1px`所代表的设备物理像素是不同的。

比如`iPhone 6`的物理像素宽为750，如果没有设置布局视口时，viewport为980px, 
> 此时：1物理像素长度 = 980/750px =1.3067px的长度

由于像素都是点阵的，故`1物理像素`相当于`1.3067px * 1.3067px方格`。
当在`meta`中设置了如下配置时：

```html
<meta name="viewport" content="width=device-width">
```

相当于把布局视口设置为**设备的宽度**(即上面讲到的**设备独立像素**)， 对于`iPhone 6`就是375px。
> 此时：1物理像素长度 = 375/750px = 0.5px的长度，故1物理像素相当于`0.5px * 0.5px`的方格。

综上几个概念我们可以推断出：

> CSS像素 = 设备独立像素 = 逻辑像素

### viewport

`viewport`可以分为三类：`layout viewport` 、 `visual viewport` 和 `ideal viewport` 。

####layout viewport（布局视口）

在移动互联网没有普及之前，大部分Web页面都是基于PC电脑端浏览而设计的，根本没有做移动端的适配。如果在手机上打开PC端的网站，会出现很长的滚动条。随着移动端的发展，为了在手机上能够快速兼容未做适配的PC端Web页面，在小屏幕下也能更好的显示PC端网页，浏览器厂商将`layout viewport`设置的很大，比实际屏幕要宽很多，一般在`768px ~ 1024px` 之间，最常用的宽度就是 `980`，这样用户就能看到绝大部分内容，并根据具体内容选择缩放。

在`JavaScript`中可以通过：

> `document.documentElement.clientWidth/clientHeight` 获取 `layout viewport`的大小。

#### visual viewport（视觉视口）

`visual viewport`指的是浏览器可视区域的大小，即用户可以看到的网页区域。(其宽度继承的布局视口宽度)

在`JavaScript`中可以通过：

> `window.innerWidth/innerHeight` 获取 `visual viewport`的大小。

#### ideal viewport（理想视口）

`layout viewport`虽然解决了移动端查看PC端网页的问题，但是完全忽略了手机本身的尺寸，用户查看页面需要进行缩放，所以苹果公司引入了`ideal viewport`——移动设备的理想`viewport`，用来表示设备的屏幕宽度。

`ideal viewport`并没有一个固定的值，不同的设备拥有不同的`ideal viewport`尺寸大小。

在`JavaScript`中可以通过：

> `window.screen.width/height` 获取 `ideal viewport`的大小。

移动设备默认的`viewport`是`layout viewport`，也就是那个比屏幕要宽的`viewport`。我们在开发移动设备的网站时，最常见的一个动作就是把下面这段代码复制到我们的`head`标签中：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

该`meta`标签的作用是让当前`viewport`的宽度等于设备的宽度，其实就是让默认的`layout viewport`等于屏幕宽度(`ideal viewport`)，同时不允许用户手动缩放。

##### 关于meta viewport的更多知识

* 不同方式的`layout viewport`设置

  下面这段代码其实效果是一样的，都可以让：`layout viewport` 等于 `ideal viewport`。

  ```html
  <meta name="viewport" content="width=device-width">
  <meta name="viewport" content="initial-scale=1.0">
  ```

  惊呆……因为从理论上来讲，这句代码的作用只是不对当前的页面进行缩放，也就是页面本该是多大就是多大。那为什么会有 `width=device-width` 的效果呢？

  要想清楚这件事情，首先你得弄明白这个缩放是相对于什么来缩放的，因为这里的缩放值是1，也就是没缩放，但却达到了 `ideal viewport` 的效果，所以:

  > 说明`initial-scale ` 是基于`ideal viewport`的大小进行缩放的。

  当对`ideal viewport`进行100%的缩放，也就是缩放值为1的时候，不就得到了 `ideal viewport` 吗？事实证明，的确是这样的。

  

* 关于缩放以及initial-scale的默认值

  > visual viewport宽度 = ideal viewport宽度 / 当前缩放值
  >
  > 当前缩放值 = ideal viewport宽度 / visual viewport宽度

  在iPhone和iPad上，无论你给viewport设的宽的是多少，如果没有指定默认的缩放值，则iPhone和iPad会自动计算这个缩放值，以达到当前页面不会出现横向滚动条(或者说viewport的宽度就是屏幕的宽度)的目的。

没想到移动端适配需要了解这么多概念，学不动了(-_-)……了解了以上概念之后，下面我们来正式看看适配的问题。

## 页面适配主要解决的问题
1. 元素自适应问题（本文主要讲解的方案）
2. 文字rem问题（文字尽量用`px`，个别需要根据页面适配的除外，例如按钮中的文字）
3.  高清图问题（`srcset`、JS动态设置`data-src2x`、媒体查询`-webkit-min-device-pixel-ratio:2`）
4. 1像素问题（`transform：scaleY(0.5)`）
5. 横竖屏显示问题(媒体查询检测、JS检测：`window.orientation(屏幕旋转方向)`)
6. 手机字体缩放问题（对比页面实际字号大小）

## 适配方案总结
* 通过媒体查询(`media query`)的方式，即：CSS3的`@media + rem`;
* 以天猫首页为代表的 `flex` 弹性布局;
* 以淘宝首页为代表的 `rem + viewport`方案(`flexible.js`);
* `vw/vh`方案

我们以上的方案其实主要解决第1个：元素自适应问题，2-6的问题大家可以自行查询相关解决方案，这里就不做详细解读了。下面我们来看看每一个方案的具体实现：

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

### 原理总结：

此方案的原理就是根据`flex`弹性布局的特性来实现页面的适配。


## rem + viewport方案
根据不同设备获取`dpr`动态写入`font-size`和`viewport`，以`rem`作为宽度单位。

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

### 原理总结：

1. 根据设备像素比（`window.devicePixelRatio`）计算缩放比，动态生成 `viewport`，必要时也可以给`<html>`设置`data-dpr`；
2. 屏幕宽度设置 `rem`的大小，即给`<html>`设置`font-size`，适配的元素都使用 `rem` 为单位，不需要适配的元素还是使用 `px` 为单位；
3. 使用Hack手段用`rem`模拟`vw`特性。

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
/*头像宽36px,高36px*/
.avantar {
    width:px2vw(36);
    heightx:px2vh(36);
}
```

### 原理总结：

这个方案其实了解一下`vw/vh`这个单位的原理就明白了，首先定死 `viewport`，然后使用 `vw` 取代 `rem`。

## 参考文献

* [移动端的3种适配方法](https://segmentfault.com/a/1190000019677612)
* [移动端H5解惑-页面适配](https://juejin.im/post/5b6503dee51d45191e0d30d2)
* [CSS像素、物理像素、逻辑像素、设备像素比、PPI、Viewport](https://www.cnblogs.com/zaoa/p/8630393.html)
