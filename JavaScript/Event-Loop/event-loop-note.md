# Event-Loop
为了实现非阻塞

## 浏览器中的Event Loop

### 宏任务和微任务
优先级：执行栈中的代码 > 微任务 > 宏任务

* 微任务：promise、process.nextTick（Node独有）、Object.observe(废弃)、MutationObserver
* 宏任务：整体代码script、setTimeout、setInterval、setImmediate、messageChannel

#### 执行栈
执行栈中的代码永远最先执行。

#### 微任务(microtask)

当执行栈中的代码执行完毕，会在执行宏任务队列之前先看看微任务队列中有没有任务，如果有会先将微任务队列中的任务清空才会去执行宏任务队列。

#### 宏任务(task)

等待执行栈和微任务队列**都执行完毕**才会执行，并且在执行完每一个宏任务之后，会去看看微任务队列有没有新添加的任务，如果有，会先将微任务队列中的任务清空，才会继续执行下一个宏任务。


## Node.js中的Event Loop
> Microtask 在事件循环的各个阶段之间执行。

```JavaScript
                                  ┌───────────────┐
   ┌───────────────────────┐      | setTimeout    |
┌─>│        timers         │<─────| setInterval   |
│  └──────────┬────────────┘      └───────────────┘
│  ┌──────────┴────────────┐      ┌───────────────┐
│  │     I/O callbacks     │<─────| 几乎所有的回调. |
│  └──────────┬────────────┘      └───────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │<───── setImmediate
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘
```
Node.js环境下会在每一个阶段结束后检查一下有没有需要执行的**微任务**

## Node.js中的process.nextTick()
> https://blog.csdn.net/baby97/article/details/48521119

`process.nextTick()`的意思就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行。

```JavaScript
function foo() {
    console.error('foo');
}
 
process.nextTick(foo);
console.error('bar');

// bar
// foo
```