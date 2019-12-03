

var ulList = document.getElementsByTagName('ul');

for (let i = 0; i < ulList.length; i++) {
    const ul = ulList[i];
    ul.addEventListener('click', function (event) {
        const target = event.target;
        const currentTarget = event.currentTarget;
        console.log('target:', target)
        console.log('currentTarget:', currentTarget)
        if (target.nodeName.toLowerCase() === 'li') {
            // console.dir(target)
            console.log(target.innerText)
        }
    }, false);
}


var box = document.getElementById('box');
box.onclick = function (event) {
    console.log('-------------event:', event)
    // box.style.color = '#f60';    // 只引起 paint
    box.setAttribute('style', 'color: #f60');   // 只引起 paint
    // box.style.width = '300px';   // 引起 layout 和 paint
}