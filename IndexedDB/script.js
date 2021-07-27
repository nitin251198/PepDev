let opnBtn = document.querySelector("#open");

let addBtn = document.querySelector("#add");

let input = document.querySelector("input");

let db;

let tempData = [
  { cId: 2423534534, note: "this is note 1" },
  { cId: 2426634534, note: "this is note2" },
  { cId: 2113534534, note: "this is note 3" },
];

addBtn.addEventListener("click", function () {
  if (!db) {
    alert("database has not been opened yet");
    return;
  }

  let value = input.value;  // input box ki value 
  input.value = "";

  let tx = db.transaction("csNotes", "readwrite");  // transaction lgai database pr usko read or write krne k liye

  let csNotesObjectStore = tx.objectStore("csNotes");   // transaction ki hlp se db ko access kia

  let data = {                              
    note: value,
    cId: Date.now(),
  };                        // data ya notes store kiye data object m jo ki js ka object h kyuki IndexedDB me Js obj hi store hote h

  csNotesObjectStore.add(data); // db m add kr di value
});

opnBtn.addEventListener("click", function () {
  let req = indexedDB.open("Notes", 1);

  req.addEventListener("success", function () {
    db = req.result;
    console.log(db);
    alert("successfully opened");
  });

  req.addEventListener("upgradeneeded", function () {
    db = req.result;

    db.createObjectStore("csNotes", { keyPath: "cId" }); // db m object create kia csNotes krke aur usko Cid de di 
  });

  req.addEventListener("error", function () {
    alert("error in opening the db");
  });
});