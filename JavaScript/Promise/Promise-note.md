
## async/await

`async/await` 在底层转换成了 `promise` 和 `then` 回调函数。也就是说，这是 `promise` 的语法糖。
每次我们使用 `await`, 解释器都创建一个 `promise` 对象，然后把剩下的 `async` 函数中的操作放到 `then` 回调函数中。

async/await 的实现，离不开 Promise。从字面意思来理解，async 是“异步”的简写，而 await 是 async wait 的简写可以认为是等待异步方法执行完成。