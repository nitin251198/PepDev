let a = [1,2,3]

function sum(a,b){
    return a+b;
}

 let ReducedValue = a.reduce(sum);

 console.log("Original reduce");
 console.log(a);
 console.log(ReducedValue);

//  myreduce

function myReduce(arr,f){
    let ans = arr[0];

    for(let i=1; i<arr.length; i++){
        ans = f(ans, arr[i])
    }
    return ans;
}

console.log("Original reduce");
 console.log(a);
 console.log(myReduce(a,sum));
