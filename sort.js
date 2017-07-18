// 冒泡排序
function bubbleSort(array){
    var i;
    var j;
    for (i = 0; i < array.length; i++) {
        for (j = 0; j < array.length - 1 - i;j++){
            if(array[j] > array[j+1]){
                swap(array,j,j+1);
            }
        }
    }
    return array;
}
function swap(array,a,b){
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(bubbleSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

// 选择排序
function selectionSort(array){
    var i;
    var j;
    var indexOfMin;
    for(i=0;i<array.length;i++){
        indexOfMin = i;
        for(j=i+1;j<array.length;j++){
            if(array[j] < array[indexOfMin]){
                indexOfMin = j
            }
        }
        if(indexOfMin !== i){
            swap(array,i,indexOfMin)
        }
    }
    return array;
}
function swap(array,a,b){
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(selectionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

// 插入排序
function insertionSort(array){
    for(var i =1;i < array.length;i++){
        var key = array[i];
        var j = i - 1;
        while (j >= 0 && array[j] > key){
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
    }
    return array;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(insertionSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

// 归并排序
function mergeSort(arr) {  //采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right){
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length){
        result.push(left.shift());
    }
    while (right.length){
        result.push(right.shift());
    }
    return result;
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(mergeSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};

var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
console.log(quickSort(arr));//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

// 随机化快速排序
function split(array, low, high) {
    var i = low;
    var x = array[low];
    for(var j = low + 1; j <= high; j++) {
        if(array[j] <= x) {
            i ++;
            if(i != j) {
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }

    temp = array[low];
    array[low] = array[i];
    array[i] = temp;
    return i;
}
function rquicksort(array, low, high) {
    if(low < high) {
        var v = parseInt(Math.random()*(high-low+1) + low);
        var tmp = array[low];
        array[low] = array[v];
        array[v] = tmp;
        var w = split(array, low, high);
        rquicksort(array, low, w -1);
        rquicksort(array, w +1, high);
        return array;
    }
}
var arr=[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48];
arr = rquicksort(arr, 0, arr.length-1);
console.log(arr);//[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]