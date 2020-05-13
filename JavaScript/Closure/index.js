function test(a,b) {
    console.log(b);
    // debugger
    return {
        test: function(c){
            // debugger
            return test(c,a);
        }
    };
}
  
// var retA = test(0);  
// retA.test(2);  
// retA.test(4);  
// retA.test(8);

// var retB = test(0).test(2).test(4).test(8);

var retC = test('good').test('bad');  
retC.test('good');  
retC.test('bad');