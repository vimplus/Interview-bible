# WEB安全
> https://github.com/YvetteLau/Blog/tree/master/Security

## XSS防御
* 改成纯前端渲染，把代码和数据分隔开；
* 对 HTML 做充分转义；
    - 1. 客户端数据传递给服务器之前，先检验过滤
    - 2. 服务器接收到数据，在存储到数据库之前，做一次过滤
    - 3. 前端接收到服务器传递过来的数据，在展示到页面前，进行一次过滤(防止通过接口直接注入或数据库未转义)
* Cookie 设置 httponly （防止恶意脚本读取）；
* Content-Security-Policy；
    - 禁止加载外域代码，防止复杂的攻击逻辑。
    - 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
    - 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
    - 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
    - 合理使用上报可以及时发现 XSS，利于尽快修复问题。
* 避免拼接HTML
* 避免内联事件

## CSRF

* 不要在Cookie中存敏感信息，结合localStorage、自定义请求头实现登录态；
* 双Cookie字段，一个token值（httpOnly）、一个随机字符串自定义请求头与后端协商验证；（不支持localStorage情况下的方案）；
* Cookie 设置 httponly （防止恶意脚本读取）；
* 使用HTTP refer头部进行判断，如果不是业务域名发送的HTTP请求直接过滤。
* 添加一个隐藏的输入框，包含token，服务端验证是否匹配。
* 验证码：用户每次提交表单都要填写图片上一个随机字符串。

## 点击劫持

* DENY：禁止iframe
* SAMEORIGIN：只允许相同域名下的网页iframe，同源政策保护
* ALLOW-FROM: https://example.com：白名单限制（IE）
* Content-Security-Policy (Chrome, Safari)

## SQL注入防御

* 关闭错误输出
* 检查数据类型
* 对数据进行转义（MySQL自身支持的escape）
* 使用参数化查询（MySQL本身自带的方式，分两步走，首先告知查询语句，然后传入参数）