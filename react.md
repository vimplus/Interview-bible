# React相关考点

## react通过什么触发UI重新渲染？
setState

## react新旧生命周期

```javascript
class App extends React.Component {
    // 用于初始化state
    constructor() {}

    // 用于替换`componentWillReceiveProps`, 该函数会在初始化和`update`时被调用
    // 因为该函数是静态函数，所以取不到this
    // 如果需要对比`prevProps`需要单独在`state`中维护
    static getDeriveStateFromProps(nextProps, prevState) {
        1、根据传入的 props 来更新 state
        2. 该方法是一个 static 方法意味着这个方法是属于 React.Component 类的方法，所以方法内是无法使用 this 的，这就意味着无法使用 this.setState 来更新 state，所以：

        这个方法直接通过返回对象的形式来更新 state，如果某些 props 的情况不需要更新 state，那么就返回 null 就好。实际上这个方法和 componentDidUpdate 搭配使用，就能覆盖 componentWillReceiveProps 的所有使用场景了
    }

    // 判断是否需要更新组件，多用于组件性能优化
    shouldComponentUpdate(nextProps, nextState) {}

    // 组件挂在后调用
    // 可以在该函数中进行请求和订阅
    componentDidMount() {}
    
    // 用于获取最新的DOM数据
    getSnapshotBeforeUpdate(prevProps, prevState) {
        1、在更新之前获取组件的快照，在组件更新前触发
        2、它的返回值会作为第三个参数传递给后面的 componentDidUpdate 参数中，和 componentDidUpdate 一起使用，能覆盖掉 componentWillUpdate 的所有使用场景了
    }
    
    // 组件即将销毁
    // 可以在此处移除订阅、定时器等
    componentWillUnmount() {}
    
    // 组件销毁后调用
    componentDidUnmount() {}

    // 组件更新后调用
    componentDidUpdate() {}

    // 渲染组件函数
    render() {}
}
```
### React V16.3 新增的生命周期方法

```javascript
getDerivedStateFromProps()
getSnapshotBeforeUpdate()
```

### 逐渐废弃的生命周期方法：

```javascript
componentWillMount()
componentWillReceiveProps() ---> getDerivedStateFromProps(nextProps, prevState)
componentWillUpdate()       ---> getSnapshotBeforeUpdate(prevProps, prevState)
```


## react diff算法优化策略

> **只有在React更新阶段才会有Diff算法的运用;**

策略一：（tree diff）忽略Web UI 中 DOM 节点跨层级的移动。
策略二：（component diff）拥有相同类型的两个组件将会生成相似的树形结构，拥有不同类型的两个组件将会生成不同的树形结构
策略三：（element diff）对于同一层级的一组子节点，通过分配唯一唯一id（key值）进行区分。

在Web UI的场景下，基于以上三个点，React对tree diff、component diff、element diff进行优化，将普适diff的复杂度降低到一个数量级，保证了整体UI界面的构建性能！


### 总结：
React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题；

React 通过**分层求异**的策略，对 tree diff 进行算法优化；
React 通过**相同类生成相似树形结构，不同类生成不同树形结构**的策略，对 component diff 进行算法优化；
React 通过**设置唯一 key**的策略，对 element diff 进行算法优化；

### 建议
在开发组件时，保持稳定的 DOM 结构会有助于性能的提升；
在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。


## react hook的作用
* 更细粒度的代码复用，并且不会产生过多的副作用
* 函数式编程风格，代码更简洁，同时降低了使用和理解门槛
* 减少组件嵌套层数
* 组件数据流向更清晰

## 单向数据流和双向绑定各有什么优缺点？
* 单向数据流
数据流动方向可以跟踪，流动单一，追查问题的时候可以跟快捷。
缺点就是写起来不太方便。要使UI发生变更就必须创建各种action来维护对应的state

* 双向绑定
双向流动，值和UI双绑定，这种好处大家都懂。
由于各种数据相互依赖相互绑定，导致数据问题的源头难以被跟踪到，子组件修改父组件，兄弟组件互相修改有有违设计原则。
但好处就是 太特么方便了。


## React与Vue的区别？

* 监听数据变化的实现原理不同
    Vue：Object.defineProperty，Vue3.0采用的Proxy；
    React：默认通过比较引用的方式进行的；

* 数据流的不同
    Vue: 1. 父子组件之间，props 可以双向绑定
         2. 组件与 DOM 之间可以通过 v-model 双向绑定
    React: 从诞生之初就不支持双向绑定，React 一直提倡的是单向数据流，通过 onChange/setState() 模式

* 模板渲染方式的不同
    Vue：一种拓展的 HTML 语法
    React: JSX 渲染模板

* HOC 与 mixins

## React事件机制
React事件机制利用的事件委托机制，将事件绑定在最外层的document，使用一个统一的事件监听器，所有的事件都由这个监听器统一分发。

组件挂载和更新时，会将绑定的事件分门别类的放进一个叫做EventPluginHub的事件池里。事件触发时，根据事件产生的Event对象找到触发事件的组件，再通过组件标识和事件类型从事件池里找到对应的事件监听回调，然后执行相关的监听函数。

> 事件默认的执行时间是在冒泡阶段执行，而非在捕获阶段,
> 如果addEventListener第三个参数为true，则事件在捕获阶段执行，如果第三个参数为false，则事件在冒泡阶段执行