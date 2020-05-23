# JS原生DOM事件相关知识

前端学习的东西有很多，现代前端开发，前端工程化的东西要懂，基础的原生js也要懂，毕竟，框架都是有生命周期的，更替非常快，然而却有这么一个框架，它是最轻量的前端框架，每个浏览器都内置，它叫vanilla.js。好吧，其实vanilla.js就是原生js，不过是网上的一个玩笑而已，但是却能说明一个很重要的问题，就是原生js很重要，所以这部分文章是关于前端开发中原生js的一系列问题的，这篇谈一谈DOM事件。

## DOM事件级别

DOM分四个级别，一级，二级，三级，没有零级但是通常把DOM1规范形成之前的称为DOM0。而由于1级DOM标准中并没有定义事件相关的内容，所以DOM事件级别只包括DOM0级，DOM2级和DOM3级三种。

首先来看不需要操控DOM的事件

```
<button type="button" onclick="log()"></button>
<script>
    function log() {
        console.log('Hello World');
    }
</script>
```

这段代码大家肯定都见过，不需要控制DOM，事件处理时间的函数直接写在html属性中。当然实际开发中应该没有人这样写了，理由也很简单，html和js强耦合，无论是编写还是维护都没有任何好处，于是就有了DOM事件处理。

### DOM0级事件

同样以上面的程序为例，使用DOM0事件处理就是下面的样子

```
<button id="btn" type="button"></button>
<script>
    var btn = document.getElementById('btn');
    btn.onclick = function() {
        console.log('Hello World');
    }
</script>
```

同样很简单，前端开发者一定都不陌生，DOM0事件定义需要两部，先找到DOM节点，然后把处理函数赋值给该节点对象的事件属性。如果想解除事件，那么只要把null赋值给事件属性即可。DOM0级事件无法给一个事件添加多个处理函数，

### DOM2级事件

上面的程序使用DOM2级事件处理就是这样的

```
<button id="btn" type="button"></button>
<script>
    var btn = document.getElementById('btn');
    function log() {
        console.log('Hello World');
    }
    btn.addEventListener('click', log, false);
</script>
```

DOM2级事件使用addEventListener，里面有三个参数，第一个参数是事件名，就是事件属性去掉on，第二个参数是事件处理函数，第三个参数是是否在事件捕获阶段执行（关于事件冒泡和事件捕获下面会介绍）。使用DOM2事件可以随意添加多个处理函数，移除DOM2事件要用removeEventListener，传入的三个参数与添加事件完全相同。特别的旧版本IE浏览器（IE8及一下），需要使用attachEvent和detachEvent来添加和移除事件,传入两个参数第一个是事件属性（包含on），第二个是处理函数，不支持事件捕获所以没有第三个参数。

### DOM3级事件

DOM3级事件就是在DOM2基础上增加了更多的事件类型

- UI事件，当用户与页面上的元素交互时触发，如：load、scroll
- 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
- 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
- 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
- 文本事件，当在文档中输入文本时触发，如：textInput
- 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
- 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
- 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified

DOM事件级别的发展使得事件处理更加完整丰富，而下一个问题就是之前提到的事件冒泡和事件捕获。

## 事件冒泡和事件捕获

有以下HTML结构

```
<html>
	<body>
		<div>
			<span>
				我是目标内容
			</span>
		</div>
	</body>
</html>
```

现在给最里面的目标内容绑定事件，就会有一个从事件源和目标之间的事件流，此例中，事件流的方向为window -> document -> html -> body -> div -> span -> 目标 -> span -> div -> body -> html -> document -> window ,整个事件流分为两个部分，以事件目标为界限，从window到目标这个过程为事件捕获，从目标回到window的过程叫事件冒泡。如图所示：

[![img](http://oux9g0njr.bkt.clouddn.com/18-1-15/32048178.jpg)](http://oux9g0njr.bkt.clouddn.com/18-1-15/32048178.jpg)

事件默认的处理阶段为冒泡阶段，可以把addEventListener第三个参数设置为true来让时间在捕获阶段被处理，不过通常不建议这样做。实际开发中，经常会利用到事件冒泡，也经常需要阻止事件冒泡，这就涉及到事件对象event的相关内置方法和属性了。

## event对象

事件处理函数会回调一个参数event，代表当前事件对象，event中有很多常用的方法和属性

- preventDefault 阻止默认行为，比如我们在a标签上面绑定一个事件，当点击a标签时，可以采用此方法阻止浏览器的默认跳转行为。
- stopPropagation 停止事件传播（冒泡/捕获），比如需要防止事件冒泡带来的负面影响的时候可以使用该方法。
- stopImmediatePropagation 阻止后续事件，该方法除了阻止事件冒泡外在当前事件被绑定多个处理程序的时候，后续的处理程序也会被阻止。
- currentTarget 此属性返回当前事件所绑定的对象。
- target 此属性返回当前触发事件的对象，注意target是触发事件的对象，是真正的事件源，同样以上面的HTML为例，给div绑定一个事件，点击带文字的span后，target是span，而currentTarget是div。

事件冒泡和target属性能做很多事情，比如考虑下面的结构

```
<ul id="click">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

如果想要实现点击每个li标签就能打印出文本内容，我们可以不用给每个li绑定事件，只需要利用事件冒泡即可

```
var click = document.getElementById('click');
click.addEventListener('click', log, false);
function log(e) {
  console.log(e.target.innerText);
}
```

## 自定义事件

除了系统内置的事件外，我们还可以自定义事件，由于平时使用的不多可能感觉会很高端，其实自定义事件并不复杂

```
var myEvent = new Event('myEvent');
document.addEventListener('myEvent', log, false);
function log() {
  console.log('hello event');
}
document.dispatchEvent(myEvent);
```

通过创建Event对象来创建事件，通过dispatchEvent函数派发事件。自定义事件可以绑定到任意DOM元素上，此处选择document只是为了演示方便。


以上就是关于DOM事件的相关内容总结，接下来后面还会有其他技术的相关文章。