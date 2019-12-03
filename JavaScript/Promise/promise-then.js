let func = function () {
    return new Promise((resolve, reject) => {
        resolve('返回值');
    });
};

let cb = function () {
    return '新的值';
}

func().then(function () {
    return cb();
}).then(resp => {
    console.warn(resp);
    console.warn('1 =========<');
});

func().then(function () {
    cb();
}).then(resp => {
    console.warn(resp);
    console.warn('2 =========<');
});

func().then(cb()).then(resp => {
    console.warn(resp);
    console.warn('3 =========<');
});

func().then(cb).then(resp => {
    console.warn(resp);
    console.warn('4 =========<');
});



new Promise((res, rej)=> {
    console.log('a'); 
}).then(()=> {
    console.log('b');
});
console.log('c');