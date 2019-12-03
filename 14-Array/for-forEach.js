let arrs = new Array(1000000);

console.time('for');
for (let i = 0; i < arrs.length; i++) {

};
console.timeEnd('for');


console.time('forEach');
arrs.forEach((arr) => {
 
});
console.timeEnd('forEach');


// node环境：10万级别forEach比for差不多快10倍，100万以上for要快一点