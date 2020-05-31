# JS原生DOM事件那些事

DOM 事件提供了人与web页面进行交互的一种方式。

## 事件流
（1）捕获阶段：事件从window对象自上而下向目标节点传播的阶段；
（2）目标阶段：真正的目标节点正在处理事件的阶段；
（3）冒泡阶段：事件从目标节点自下而上向window对象传播的阶段。

**捕获阶段** => **"处于目标"阶段** => **事件冒泡**；

捕获总是发生在冒泡之前，跟你是否监听毫无关联。

### 事件模型：捕获与冒泡

* 捕获：计算机处理事件的逻辑（鼠标点击并没有位置信息，是操作系统根据位移的累计计算出坐标提供给浏览器）；
* 冒泡：人类处理事件的逻辑（当你按电视开关时，实际上你也按到了电视）；

使用建议：默认使用冒泡机制，当开发组件时，如果需要父元素控制子元素的行为，可以使用捕获机制。

## DOM事件级别

* 不需要操控DOM的事件
* DOM0级事件
* DOM1级（没有新增事件相关的内容）
* DOM2级事件
* DOM3级事件

### 不需要操控DOM的事件

```html
<button type="button" onclick="log()">按钮</button>
<script>
    function log() {
        console.log('Hello World');
    }
</script>
```

### DOM0级事件

```html
<button id="btn" type="button">按钮</button>
<script>
    var btn = document.getElementById('btn');
    btn.onclick = function() {
        console.log('Hello World');
    }
</script>
```

### DOM2级事件

```html
<button id="btn" type="button">按钮</button>
<script>
    var btn = document.getElementById('btn');
    function log() {
        console.log('Hello World');
    }
    btn.addEventListener('click', log, false);
</script>
```

### DOM3级事件

DOM3级事件就是在DOM2基础上增加了更多的事件类型：

* UI事件，当用户与页面上的元素交互时触发，如：load、scroll
* 焦点事件，当元素获得或失去焦点时触发，如：blur、focus
* 鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
* 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
* 文本事件，当在文档中输入文本时触发，如：textInput
* 键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
* 合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
* 变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified

## 事件API

`addEventListener` 有三个参数（事件名称、事件处理函数、捕获还是冒泡）：

```javascript
addEventListener('click', function(event) {}, false); // 第三个参数默认为 false 
```

* 事件名称；
* 事件处理函数（不一定是函数，也可以是个具有`handleEvent`方法的对象）;
```javascript
var o = {
handleEvent: event => console.log(event)
}
document.body.addEventListener('keydown', o, false)
```

* 捕获还是冒泡，默认false，也就是在冒泡阶段监听（不一定是Boolean值，也可以是个对象，提供更多属性，如下：）;
    - `once`：只执行一次。
    - `passive`：承诺此事件监听不会调用`preventDefault`，有助于优化性能。
    - `useCapture`: 是否捕获（否则冒泡）。


### event对象

事件处理函数会回调一个参数`event`，代表当前事件对象，`event`中有很多常用的方法和属性

- `preventDefault` 阻止默认行为，比如我们在a标签上面绑定一个事件，当点击a标签时，可以采用此方法阻止浏览器的默认跳转行为。

- `stopPropagation` 停止事件传播（冒泡/捕获），比如需要防止事件冒泡带来的负面影响的时候可以使用该方法。

- `stopImmediatePropagation` 阻止后续事件，该方法除了阻止事件冒泡外在当前事件被绑定多个处理程序的时候，后续的处理程序也会被阻止。

- `currentTarget` 此属性返回当前事件所绑定的对象。

- `target` 此属性返回当前触发事件的对象，注意`target`是触发事件的对象，是真正的事件源，以下列的HTML为例，给`div`绑定一个事件，点击带文字的`span`后，`target`是`span`，而`currentTarget`是`div`。

```html
<div>
	<span>我是目标内容</span>
</div>
```

## 事件委托

当我们有1个`li`的时候，我们给`li`加上`click`事件，这样是完全没有问题的，但是当我们有成百上千个`li`呢，此时我们会怎么处理，当然一种最简单的方法就是`for`循环遍历，然后给每个`li`都加上`click`事件，这样确实能实现，但是我们要想到的是，HTML页面的渲染速度是和DOM的操作的多少挂钩的，而DOM操作的多少会和绑定的事件的数量挂钩的，绑定的数量越多，渲染肯定是越慢的，那么此时你肯定会问了，有什么好的解决方法吗，此时我们就可以用到这个名词了：**事件委托**——**对“事件处理程序过多”问题的解决方案就是事件委托。**

事件委托**利用了事件冒泡**，只指定一个事件处理程序，就可以管理某一类型的所有事件。

### 优点：
* 1.减少内存消耗，提高性能(不需要为每一个子元素绑定事件)
* 2.动态绑定事件

```html
<ul id="ulNode">
    <li>01</li>
    <li>02</li>
    <li>03</li>
    <li>04</li>
    <li>05</li>
</ul>
```

```javascript
var ulNode = document.getElementById("ulNode");
var list = ulNode.getElementsByTagName('li');
for(var i = 0; i < list.length; i++){
    list[i].onclick = function(){
        alert(123);
    }
}
```

上面这种方式是给每个`li`添加事件，这个毫无疑问会降低渲染速度，而且不可以处理动态增加的`li`标签，下面我们看一下采用事件委托之后的代码：

```javascript
var ulNode = document.getElementById('ulNode');
ulNode.addEventListener('click', function (event) {
    const target = event.target;	// 被点击的标签
    if (target.nodeName.toLowerCase() === 'li') {
        console.log(target.innerText)
    }
}, false);
```

## 自定义事件

```javascript
var myEvent = new Event('myEvent');
document.addEventListener('myEvent', log, false);
function log() {
  console.log('hello event');
}
document.dispatchEvent(myEvent);
```

