// Ques1

let a = [1,2,4,5]

let c = a.slice(0,2) // gives 1,2

let d = a.slice(2,4)  // gives 4,5

let b = [...c,3,...d]

console.log(a);
console.log(b);


// Ques2

let o1 = {a:1, b:2}
let o2 = {c:3}

let o3 = {...o1,...o2,...o1,...o2}

console.log(o1);
console.log(o2);
console.log(o3);