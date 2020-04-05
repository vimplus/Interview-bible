// alert(window.devicePixelRatio);  // 获取设备dpr


(function () {
    // 解决不同手机dpr不一致的适配问题(解决了1px的问题) 
    var scale = 1.0; 
    if (window.devicePixelRatio === 2) { 
        scale *= 0.5; 
    } if (window.devicePixelRatio === 3) { 
        scale *= 0.333333; 
    } 
    var meta = document.createElement('meta'); 
    meta.setAttribute('name', 'viewport'); 
    meta.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no'); document.head.appendChild(meta); 
})();




(function (doc, win) {
    // 解决不同手机分辨率不一致的适配问题 
    var docEl = ""; 
    docEl = doc.documentElement;
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
    recalc = function () { 
        var clientWidth = docEl.clientWidth; 
        if (!clientWidth) { 
            return; 
        } else { 
            if (clientWidth > 1280) { 
                docEl.style.fontSize = 170.66+ "px";
            } else { 
                if (clientWidth < 640) { 
                    docEl.style.fontSize = 85.33 + "px" 
                } else { 
                    if (clientWidth <= 1280 || clientWidth >= 640) { 
                        docEl.style.fontSize = (clientWidth / 750) * 100 + "px" 
                    } 
                } 
            } 
        } 
    }; 
    if (!doc.addEventListener) { 
        return; 
    } 
    win.addEventListener(resizeEvt, recalc, false); 
    doc.addEventListener("DOMContentLoaded", recalc, false) 
})(document, window);