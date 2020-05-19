# React最新fiber架构原理和流程？（Fiber主要是用来控制何时调度diff运算的）
> https://blog.csdn.net/qdmoment/article/details/92837995

Fiber其实就是任务优先队列。Fiber所做的就是需要分解渲染任务，然后根据优先级使用API调度，异步执行指定任务：

* 低优先级任务由`requestIdleCallback`处理；
* 高优先级任务，如动画相关的由`requestAnimationFrame`处理；

> requestIdleCallback可以在多个空闲期调用空闲期回调，执行任务；
> requestIdleCallback方法提供deadline，即任务执行限制时间，以切分任务，避免长时间执行，阻塞UI渲染而导致掉帧；

## 原理:
从**Stack Reconciler**到**Fiber Reconciler**，源码层面其实就是干了一件**递归改循环**的事情

## React更新前后：

旧版：旧版 React 通过递归的方式进行渲染，使用的是 JS 引擎自身的函数调用栈，它会一直执行到栈空为止。

新版：Fiber实现了自己的组件调用栈，它以**链表**的形式遍历组件树，可以灵活的暂停、继续和丢弃执行的任务。实现方式是使用了浏览器的**requestIdleCallback**这一 API。

## Fiber 树
`fiber reconciler`在第一阶段diff时，会生成一棵树，这棵树是在virtual dom的基础上增加额外信息生成的，本质上是一个链表。

fiber tree首次渲染：一次生成

后续diff: 根据virtual dom和已有tree生成新的tree，这棵树每生成一个节点，都会把控制权交给浏览器，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程，如果过程中有优先级更高的任务需要进行，则 Fiber Reconciler 会丢弃正在生成的树。