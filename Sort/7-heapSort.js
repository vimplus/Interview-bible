/**
 * 堆排序
 * 用简单的公式来描述一下堆的定义就是：
 * 大顶堆：arr[i] >= arr[2i+1] && arr[i] >= arr[2i+2]
 * 小顶堆：arr[i] <= arr[2i+1] && arr[i] <= arr[2i+2]
 * 思路：
 * a.将无需序列构建成一个堆，根据升序降序需求选择大顶堆或小顶堆（一般升序采用大顶堆，降序采用小顶堆）;
 * b.将堆顶元素与末尾元素交换，将最大元素"沉"到数组末端;
 * c.重新调整结构，使其满足堆定义，然后继续交换堆顶元素与当前末尾元素，反复执行调整+交换步骤，直到整个序列有序。
 * @param {*} array 
 */
function heapSort(array) {
    // 初始化大顶堆，从第一个非叶子节点开始
    for (let i = Math.floor(array.length / 2 - 1); i >= 0; i--) {
        heapify(array, i, array.length);
    }
    // 排序：每一次for循环找出一个当前最大值，数组长度减 1
    for (let i = Math.floor(array.length - 1); i > 0; i--) {
        // 根节点与最后一个节点交换
        swap(array, 0, i);
        // 从根节点开始调整，并且最后一个节点已经为当前最大值，不需要再参与比较，所以第三个参数为i，即比较到最后一个节点前一个即可
        heapify(array, 0, i);
    }
    return array;
}

// 交换两个节点
function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

/**
 * 将 i 节点以下的堆整理为大顶堆，注意这一步实现的基础实际上是：
 * 假设节点 i 以下的子堆已经是一个大顶堆，heapify函数实现的功能实际上是：
 * 找到节点 i 在（包括节点 i 的）堆中的正确位置。
 * 后面将写一个 for 循环，从第一个非叶子节点开始，对每一个非叶子节点都执行 heapify 操作，
 * 所以满足了节点 i 以下的子堆已经是一大顶堆
 * @param {*} array 
 * @param {*} i 
 * @param {*} length 
 */
function heapify(array, i, length) {
    let temp = array[i];    // 当前父节点
    // j < length 的目的是对节点 i 以下的节点全部做顺序调整
    for (let j = 2 * i + 1; j < length; j = 2 * j + 1) {
        // 将 array[i] 取出，整个过程相当于找到 array[i] 应处的位置
        temp = array[i];
        // 找到两个孩子中较大的一个，再与父节点比较
        if (j + 1 < length && array[j] < array[j + 1]) {
            j++;
        }
        // 如果父节点小于子节点：交换; 否则：跳出
        if (temp < array[j]) {
            swap(array, i, j);
            i = j;  // 交换后，temp 的下标变为 j
        } else {
            break;
        }
    }
}

// var arr=[7,5,8,3,1,6,4,2];
var arr=[4,6,8,5,9];
console.log(heapSort(arr))




