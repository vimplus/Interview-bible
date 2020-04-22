# 移动端1px解决方案

## 方案一：transform 缩放
> https://github.com/airyland/vux/blob/v2/src/styles/weui/base/mixin/setOnepx.less
* 优点：所有场景都能满足，支持圆角
* 缺点：对于已经使用伪元素的元素(例如clearfix)，可能需要多层嵌套

```css
.border-1px {
    position: relative;
}

.border-1px::after {
    content: '';
    position: absolute;
    bottom: 0;
    background: #f00;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
@media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    .border-1px::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}
```


## 方案二：viewport + rem 实现
采用viewport + rem 实现，JS 动态改变 viewport 中 scale 缩放。

### 示例：
在devicePixelRatio = 2 时，输出viewport：

```html
<meta name="viewport" id="WebViewport" content="initial-scale=0.5,maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```

在devicePixelRatio = 3 时，输出viewport：

```html
<meta name="viewport" id="WebViewport" content="initial-scale=0.33,maximum-scale=0.33, minimum-scale=0.33, user-scalable=no">
```

### 优缺点
* 优点：所有场景都能满足，一套代码，可以兼容基本所有布局;
* 缺点：对安卓兼容不是太好；老项目修改代价过大，例如：使用 vh 和 vw 布局的，只适用于新项目。

## 方案三：设置1px的渐变背景，50%有颜色，50%透明
```css
.border-1px-linear {
    height: 1px;
    background:
    linear-gradient(90deg, black, black 50%, transparent 50%) top right / 1px 100% no-repeat,
    linear-gradient(0, black, black 50%, transparent 50%) bottom right / 100% 1px no-repeat,
    linear-gradient(-90deg, black, black 50%, transparent 50%) bottom left / 1px 100% no-repeat;
}
```


## 拓展阅读
* [关于1px的实现](https://www.jianshu.com/p/95535c25d19f)
* [移动端1px模糊产生的原因以及解决方案](https://blog.csdn.net/alightman/article/details/84575184)

