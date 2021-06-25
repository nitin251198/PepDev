let fs = require("fs");

 let p = new Promise(function executor(resolve, reject){
    // code to do task

    fs.readFile("f.txt", function(err, data){

        if (err) reject(err);

        else resolve(data);
    });
});

p.then(function(data){
    console.log("data is recieved");
    console.log(data+ "");
})