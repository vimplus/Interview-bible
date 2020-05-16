# XSS攻击

XSS(Cross-Site Scripting，跨站脚本攻击)是一种代码注入攻击。

## 几种类型
根据攻击的来源，XSS攻击可以分为：

* 存储型(持久性) - 通过注入数据库，前端取出数据时需要转义后再展示；

* 反射型(非持久型) - 通过URL，可以直接采用encodeURIComponent对查询参数进行编码；
* DOM型三种；
    1. 对于url链接(例如图片的src属性)，那么直接使用 encodeURIComponent 来转义。
    2.非url，我们可以这样进行编码：

    ```JavaScript
    function encodeHtml(str) {
        return str.replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
    }
    ```

## 如何防御？
* 对 HTML 做充分转义；
    - 1. 客户端数据传递给服务器之前，先检验过滤
    - 2. 服务器接收到数据，在存储到数据库之前，做一次过滤
    - 3. 前端接收到服务器传递过来的数据，在展示到页面前，进行一次过滤(防止通过接口直接注入或数据库未转义)
* 改成纯前端渲染，把代码和数据分隔开；
* Cookie 设置 httponly （防止恶意脚本读取）；
* Content-Security-Policy；
    - 禁止加载外域代码，防止复杂的攻击逻辑。
    - 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域。
    - 禁止内联脚本执行（规则较严格，目前发现 GitHub 使用）。
    - 禁止未授权的脚本执行（新特性，Google Map 移动版在使用）。
    - 合理使用上报可以及时发现 XSS，利于尽快修复问题。
* 避免拼接HTML
* 避免内联事件