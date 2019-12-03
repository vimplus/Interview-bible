

const version = ['1.45.0', '1.5.3', '1.5.1', '1.6', '6', '3.3.3.3.3']

var list = version.sort(function (a, b) {
    return a - b;
})


function chooseSort(array) {
    let temp = null;
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array;
}

/**
 * 版本号排序
 * @param {*} versions 
 */
function versionSort(versions) {
    let temp = null;
    let array = versions.map(v => v.split('.'));
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            for (let k = 0; k < array.length; k++) {
                const current = Number(array[j][k]);
                const min = Number(array[minIndex][k]);
                if (current < min) {
                    minIndex = j;
                }
                if (current !== min) {
                    break;
                }
            }
        }
        temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array.map(v => v.join('.'));
}

const arr1 = [8, 3, 9, 2, 10, 5];
console.log(chooseSort(arr1));
console.log(versionSort(version));