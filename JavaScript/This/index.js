var a = 1;
var obj = {
    a: 2,
    fn: function () {
        (() => {
            console.log(this.a);
        })()
    }
}
obj.fn();
