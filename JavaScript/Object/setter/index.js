// 实现一个setter方法
function setter(content, key, value) {
    const keys = key.split('.').filter(i => i);
    for(let i = 0;i < keys.length - 1;i++) {
        let k = keys[i];
        if (!content[k]) return;
        content = content[k];
     }
     content[keys[keys.length - 1]] = value;
}

var n = {
    a: {
        b: {
            c: { d: 1 },
            bx: { y: 1 }
        },
        ax: { y: 1 }
    }
}

setter(n, 'a.b.c.d', 3); // 修改值
console.log(n.a.b.c.d); // 输出 3

setter(n, 'a.b.bx', 1); // 修改值
console.log(n.a.b.bx); // 输出 1

