let  fs =require("fs");

console.log(1);

function Task(path, Operation){

    fs.readFile(path, Operation);
}

console.log(1);

function Operation(err, data) {
    console.log(data.toString());
}

console.log(3);

Task("f.txt", Operation);

console.log(4);