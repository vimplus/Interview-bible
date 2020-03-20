# Redux三大原则
* 唯一数据源
* 保持只读状态
* 数据改变只能通过纯函数来执行

## Store
store就是集中保存数据的地方，你可以把它看成一个对象，整个应用只能有一个store。

## Action
一个对象，用来告诉Store需要改变state。

## store.dispatch()
接收action，用来通知store来改变数据state。

## Reducer
Store收到Action以后，必须给出一个新的state，这样view才会发生变化，这种处理state的方法就叫做Reducer。

Reducer是一个纯函数，它接收Action和当前的state作为参数，返回一个新的state。