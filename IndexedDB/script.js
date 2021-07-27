//database version signifies how many changes my database has been through

let req = indexedDB.open("Notes",1);

req.addEventListener("success", function(){
    console.log(1);
    let db = req.result;
});

//kuch bhi craetion ya fir update ka kaam ho to ye wala event chlega

req.addEventListener("upgradeneeded", function(){
    console.log(2);

    let db = req.result;
    console.log(db);
});

req.addEventListener("error", function(){
    console.log(3);
});