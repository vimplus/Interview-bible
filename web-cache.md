## HTTP缓存

### 强缓存
* `expires`：缓存过期时间，用来指定资源到期的时间，是服务器端的绝对时间，告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。

* `cache-control`：max-age=xxx 声明该资源在加载后的xxx秒内都直接使用缓存，使用的是相对时间，即加载文件本机的时间。

#### cache-control几个字段的定义：
* private：仅浏览器可以缓存；
* public：浏览器和代理服务器都可以缓存；
* max-age: 过期时间，单位：秒(s)；
* no-cache: 不进行**强缓存**；
* no-store: 不进行**任何缓存**；

> 规则可以同时多个，如：cache-control:public, max-age=600
> 如果在Cache-Control响应头设置了 "max-age" 或者 "s-max-age" 指令，那么 Expires 头会被忽略。

### 协商缓存

#### 触发条件   
* `Cache-Control`的值为`no-cache`（不强缓存）;
* `max-age`过期了（强缓存，但总有过期的时候）;

#### 最后更新时间
Last-Modified ------- 服务端返回的response header
If-Modified-Since ------- 客户端传给服务端的request header

**缺点：**
* 修改时间不能精准到毫秒级；
* 文件修改时间改了，但文件内容却没有变。

#### 文件内容的hash值
etag ------- 服务端返回的response header
if-none-match ------- 客户端传给服务端的request header