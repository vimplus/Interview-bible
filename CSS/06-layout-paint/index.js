
var box = document.getElementById('box');
box.onclick = function (event) {
    console.log('-------------event:', event)
    // box.style.color = '#f60';    // 只引起 paint（重绘）
    box.setAttribute('style', 'color: #f60');   // 只引起 paint （重绘）
    // box.style.width = '300px';   // 引起 layout 和 paint (重排与重绘)
}

