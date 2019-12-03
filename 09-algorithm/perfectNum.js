
/**
 * 找出100以内的完美数
 */
for (let i = 1; i < 100; i++) {
    var sum = 0;
    for (let j = 1; j < i; j++) {
        if (i % j == 0) {
            sum += j;
        }
    }
    if (sum === i) {
        console.log(`${i}是完美数`)
    }
}