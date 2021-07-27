let opnBtn = document.querySelector("#open");

let addBtn = document.querySelector("#add");

let input = document.querySelector("input");

let viewBtn = document.querySelector("#view");

let table = document.querySelector("table");

let db;

let tempData = [
  { cId: 2423534534, note: "this is note 1" },
  { cId: 2426634534, note: "this is note2" },
  { cId: 2113534534, note: "this is note 3" },
];

viewBtn.addEventListener("click", function () {

    let isOpen = viewBtn.getAttribute("data-open");     // get the state of table open or not

  if (isOpen == "true") {                               // check table is open or not if not do that
    viewBtn.setAttribute("data-open", "false");         // agr open h to attribute false set krenge 
    table.innerHTML = "";                               // table ko remove kia ya kh lo ki empty string se replace kia
    return;
  }

     viewBtn.setAttribute("data-open", "true");         // if close set to open

    let tx = db.transaction("csNotes", "readonly");     // transaction lgai database pr usko read krne k liye
  
    let csNotesObjectStore = tx.objectStore("csNotes");     // csnotes ko acces kia
  
    let req = csNotesObjectStore.openCursor();              // req ki loop jesa behave krne k lioye
  
    table.innerHTML = `<thead>
      <tr>
        <th>S. No.</th>
        <th>Note</th>
        <th> Delete </th>
      </tr>
    </thead>
    <tbody>
     
    </tbody>`;                          // table ka structure bnaya
  
    let tbody = table.querySelector("tbody");
  
    let serialNumber = 1;
  
    req.addEventListener("success", function (e) {
      let cursor = req.result;                      // curor ko set kia phle revcord pr db m
  
      if (cursor) {
        let currObj = cursor.value;
        let tr = document.createElement("tr");
        tr.innerHTML = `
                  <td> ${serialNumber} </td>
                  <td> ${currObj.note} </td>
                  <td> <button data-cId="${currObj.cId}"> Delete </button> </td>
                `;

    let button = tr.querySelector("button");            // table m se button nikala jo tr m tha

      button.addEventListener("click", function (e) {
        let cId = Number(e.currentTarget.getAttribute("data-cId"));     // cid nikala current note ka
        deleteNote(cId);                                                // current note ko delete kia db cid ki hlp se
        e.currentTarget.parentElement.parentElement.remove();           // row ko remove kia UI se
      });

        tbody.append(tr);
        serialNumber++;
        cursor.continue();
      }                         // table ka stur bnaya aur data show ki , cusror ko move kia continue se
    });
  });

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


// delete data from tha db
function deleteNote(cId) {
    let tx = db.transaction("csNotes", "readwrite");        // transaction ki hlp se db acces kia
  
    let csNotesObjectStore = tx.objectStore("csNotes");     // acces lia 
  
    csNotesObjectStore.delete(cId);                         // delete from db
  }