# CSS 常考知识点

## 盒子模型
* 标准模式：盒子总宽 = content(width) + padding + border
* 怪异模式：width = content + padding + border (border-box)

## BFC
### 归纳形成BFC的几个要点：

* float的值不为none;
* position的值不为static或者relative;
* display的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex中的其中一个;
* overflow的值不为visible。

### 作用
* 消除外边距合并
* 解决浮动高度坍塌问题
* 自适应两栏布局
* 利用BFC阻止文本环绕

## 垂直居中
* margin-top: -50%; (高度固定)
* transform: translate(0, -50%); (高度固定)
* align-items: center;     /* 垂直居中 */
* justify-content: center; /* 水平居中 */

## Flex

### 容器的属性

* flex-flow - 作为flex-direction和flex-wrap属性的简写形式，默认flex-flow: row nowrap;
* flex-direction - 定义项目的排列方向；
* flex-wrap - 定义项目的换行方式，如强制换行，默认不换行；
* justify-content - 定义子元素的对齐方式；
* align-items - 定义项目在主轴上的对齐方式；
* align-content - 定义多根轴线的对齐方式，在只有一根主轴的情况下不起作用；

### 项目的属性

* flex - 对flex-grow，flex-shrink和flex-basis三个属性的缩写，默认flex:0 1 auto;
* order - 定义项目的排列顺序（项目的优先级），数值越小，越靠前，默认0;
* flex-grow - 定义项目的放大比例（默认0，始终不放大）;
* flex-shrink - 定义项目的缩小比例，（默认为1，空间不足将缩小）;
* flex-basis - 定义项目在分配容器剩余空间之前的默认尺寸，默认auto;
* align-self - 单独项目上的对齐方式，默认与其父级容器的align-items属性相同；

## Grid
### 几个术语
* 网格容器 grid-container
* 网格线 grid-line
* 网格轨道 grid-track
* 网格单元格 grid-cell
* 网格区域 grid-area

### 网格容器
* grid-template
    - grid-template-columns
    - grid-template-rows
    - grid-template-areas

* grid-gap
    - grid-columns-gap
    - grid-rows-gap

* justify-items
* align-items
* justify-content
* align-content

* grid-auto-columns
* grid-auto-rows
* grid-auto-flow
* grid

### 网格项
* grid-column
    - grid-column-start
    - grid-column-end

* grid-row
    - grid-row-start
    - grid-row-end

* grid-area
* justify-self
* align-self

## 为什么css请求要放在head里，放在body后面可以吗？
放在body后面会导致重排和重绘。

## CSS会阻塞DOM解析吗？
css加载**不会**阻塞DOM树的解析
css加载**会**阻塞DOM树的渲染
css加载**会**阻塞后面js语句的执行

### 以下代码是下载解析完CSS再执行JS?
```html
<link href="xxxx.css">
<script>alert(1)<script>
```
答：是


## 移动端一像素的原理
border设为none, height设1px, Y轴缩放: transform:scaleY(0.5)


## will-change
* 想流畅的使用 GPU 做 CSS 动画的话，加上 will-change 属性吧。
* will-change 在动画结束的时候，删掉这个属性吧。
* 在 Chrome 下，will-change 删掉的话，Update Layer Tree 会重新构建 layer，负担会变重。可以每隔一段时间去删掉 will-change，可以把影响降到最低。
* 多确认下不同的浏览器和不同的环境。不要总是想着“Chrome 即是正义”。
* 夺取确认性能监测面板，还有系统的性能监测面板。就算有 60fps，说不定你的机器正在“惨叫”