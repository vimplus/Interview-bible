# WEB安全

## XSS防御
* 改成纯前端渲染，把代码和数据分隔开；
* 对 HTML 做充分转义；
* Content-Security-Policy；
    - 禁止加载外域代码，防止复杂的攻击逻辑。
    - 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
    - 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
    - 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
    - 合理使用上报可以及时发现 XSS，利于尽快修复问题。
* 避免拼接HTML
* 避免内联事件

## CSRF

* 验证码：用户每次提交表单都要填写图片上一个随机字符串。
* 添加一个隐藏的输入框，包含token，服务端验证是否匹配。
* 使用HTTP refer头部进行判断，如果不是业务域名发送的HTTP请求直接过滤。

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