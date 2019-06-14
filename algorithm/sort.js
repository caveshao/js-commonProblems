/*****************插入排序*********************************/
 for(let i = 0;i < arr.length - 1;i++) {
 	 let store = arr[i+1]
 	for(let j = i;j>=0;j--) {
 		if(store > arr[j]) {		
 			break;
 		} else {
 			arr[j+1] = arr[j]
 			arr[j] = store
 		}
 	}
 }

 for(let i = 0;i < arr.length - 1;i++) {
 	let store = arr[i+1]
 	let j = i 
 	while(j>=0&&store<arr[j]) {
 		arr[j+1] = arr[j]
 		j--
 	}
 	arr[j + 1] = store
 }


 for(let i = 1;i < arr.length;i++){
     let store = arr[i];
     let j = i-1;
     while(j > -1 && arr[j] > store) {  // 此处 arr[j] < store 为由大到小
         arr[j+1] = arr[j];
         j--;
     }
     arr[j+1] = store 
 }

 /*************************冒泡排序******************************/
 for(let i = 0; i < arr.length;i++){
 	for(let j = 0;j < arr.length;j++) {
 		if (arr[i] < arr[j]) {
 			let mid = arr[i]
 			arr[i] = arr[j]
 			arr[j] = mid
 		}
 	}
 }

 /*************************选择排序******************************/
 for(let i = 0;i < arr.length - 1;i++) { //冒泡排序与选择排序的时间复杂度是相同的，选择排序像是冒泡排序的一半，注意排列方向问题
 	for(let j = i;j < arr.length;j++) {
 		if(arr[i] < arr[j]) {
 			let mid = arr[i]
 			arr[i] = arr[j]
 			arr[j] = mid
 		}
 	}
 }
 for(let i = 0;i < arr.length - 1;i++) { 
 	let mark = i
 	for(let j = i;j < arr.length;j++) {
 		if(arr[i] > arr[j]) {
 			mark = j
 		}
 	}
 	let mid = arr[i]
 	arr[i] = arr[mark]
 	arr[mark] = mid
 }



 /**************************快速排序***********************************/
 /*************当每次划分为 n-1 个元素和 0 个元素时，最坏情况发生*********/

 function quickSort(arr) {

     if (arr.length <= 1) {
         return arr
     }
     let mid = Math.floor(arr.length / 2)
     let leftArr = [];
     let rightArr = [];
     let midArr = arr.splice(mid, 1);

     for (let i = 0; i < arr.length; i++) {

         if (arr[i] < midArr[0]) {
             leftArr.push(arr[i])
         } else {
             rightArr.push(arr[i])
         }
     }

     leftArr = quickSort(leftArr)

     rightArr = quickSort(rightArr)

     return leftArr.concat(midArr, rightArr)
 }

  var quickSort = function(arr) {
     if (arr.length <= 1) { return arr; }
     var pivotIndex = Math.floor(arr.length / 2);   //基准位置（理论上可任意选取）
     var pivot = arr.splice(pivotIndex, 1)[0];  //基准数   此处获得基准数并将基准数从数组中去掉
     var left = [];
     var right = [];
     for (var i = 0; i < arr.length; i++){
         if (arr[i] < pivot) {
             left.push(arr[i]);
         } else {
             right.push(arr[i]);
         }
     }
     return quickSort(left).concat([pivot], quickSort(right));  //链接左数组、基准数构成的数组、右数组
 }


 arr = quickSort(arr)

 /*****************************************归并排序************************************/

 // 归并排序与快速排序都是分治策略的应用，二者的区别是：
 // 1.快速排序生成新的数组而归并排序是在原有数组上更改
 // 2.二者时间复杂度不相同，快速排序最坏情况是 O(n^2)
 // 3.二者区别的根本原因是快速排序的划分是不稳定的，有可能划分为 n-1 个元素的子数组和 0 个元素的子数组

 function merge(arr, p, q, r) {
     let leftArr = arr.slice(p, q + 1)
     let rightArr = arr.slice(q + 1, r + 1)

     leftArr.push(Number.POSITIVE_INFINITY)
     rightArr.push(Number.POSITIVE_INFINITY)
     let i = 0;
     let j = 0;
     for (let k = p; k <= r; k++) {

         if (leftArr[i] <= rightArr[j]) {
             arr[k] = leftArr[i]
             i++
         } else {
             arr[k] = rightArr[j]
             j++
         }
     }
 }

 function mergeSort(arr, p, r) {
     if (p < r) {
         let q = Math.floor((p + r) / 2)
         mergeSort(arr, p, q)
         mergeSort(arr, q + 1, r)
         merge(arr, p, q, r)
     }
 }
 mergeSort(arr, 0, arr.length - 1)


 /******************************************希尔排序*****************************************/

/***************************************希尔排序也叫递减增量排序算法，是对插入排序的改进******************/

/**先将整个待排序序列分割成若干子序列分别进行直接插入
，待这个序列中的记录基本有序时，再对全体记录进行依次直接插入排序，相较于快速排序，稳定性更高**/

// 1. 先取一个正整数 d1(d1 < n)，把全部记录分成 d1 个组，所有距离为 d1 的倍数的记录看成一组，然后在各组内进行插入排序
// 然后取 d2(d2 < d1)
// 2. 重复上述分组和排序操作；直到取 di = 1(i >= 1) 位置，即所有记录成为一个组
// 3. 最后对这个组进行插入排序。一般选 d1 约为 n/2，d2 为 d1 /2， d3 为 d2/2 ，…， di = 1
function shellSort(arr) {
	let len = arr.length;
	let temp;
	let gap = len/2;

	while(gap > 0) {
		for(let i = gap;i < len;i++) {
			temp = arr[i];
			let j = i - gap
			for(j; j >= 0 && arr[j] > temp;j-=gap) {
				arr[j+gap] = arr[j]
			}
			arr[j+gap] = temp
		}
		gap = Math.floor(gap/2)
	}
    return arr;
}