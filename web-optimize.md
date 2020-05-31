# WEB性能优化

* [CSS精灵] CSS Sprites；
* [压缩] 启用压缩，以及静态资源压缩；
* [重排重绘] 避免重排重绘；
* [JS加载顺序] CSS放在页面最上部，javascript放在页面最下面；
* [懒加载] LazyLoad Images；
* [缓存] 合理利用HTTP缓存，减少HTTP请求（HTTP2多路复用）；
* [DNS] 减少DNS查询，减少静态资源请求；
* [CDN] 使用CDN加速，并适当控制CDN域名数量；
* [Cookie] 减少Cookie传输（静态资源使用独立域名访问，避免请求静态资源时发送cookie，减少cookie传输次数）；
* [代码层面] JS方面：
    - 垃圾回收
    - 事件委托
    - 注意作用域（减少作用域链查找）
    - 使用高效的方法
    - 字符串拼接（相比更为高效的做法是将需要拼接的字符串放在数组中最后调用其 join方法得到结果）



## 网络优化
* DNS
    * DNS预解析
```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
<link rel="dns-prefetch" href="http://hm.baidu.com" />
```

* CDN（相当于多个快递网点）
* 缓存
* preload/prefetch/懒加载
* ssr

## 打包优化
* webpack
    - loader
    - dll（缓存，没有变化的文件不需重新打包）
    - happypack（利用多线程）
    - 压缩代码
    - tree shaking（删除无用代码）
    - scope hoisting
    - code splitting
* 图片base64、CDN

## 代码优化
* loading/骨架屏
* web worker
* 虚拟列表
* 懒加载
* DOM/style批量更新
* ……


## 总结概括(四优化一减少)
* 减少请求（减少DNS查询，减少HTTP请求、合并文件、CSS精灵、图片base64、http缓存、CDN）
* 优化请求（DNS预解析、减少Cookie传输、开启Gzip压缩、使用CDN，避免HTTP重定向）
* 优化渲染（懒加载、避免重排重绘、SSR）
* 优化代码（虚拟列表、DOM/style批量更新、事件委托、垃圾回收、web worker）
* 优化打包（webpack：dll、happypack、压缩代码、tree shaking、scope hoisting、code splitting）

