
var box = document.getElementById('box');
box.onclick = function (event) {
    console.log('-------------event:', event)
    // box.style.color = '#f60';    // 只引起 paint
    box.setAttribute('style', 'color: #f60');   // 只引起 paint
    // box.style.width = '300px';   // 引起 layout 和 paint
}

