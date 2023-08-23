let arr = [3,5,1,2,3,5,6,6,7,8,1]
let left = []
let right = []
let size = parseInt(arr.length)/2;

for(let i=0;i<arr.length;i++){
    if(i < size) left.push(arr[i])
    if(i >= size) right.push(arr[i])
}
console.log(left)
console.log(right)