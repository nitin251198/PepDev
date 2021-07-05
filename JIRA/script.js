let addBtn = document.querySelector(".add");
let body = document.querySelector("body");

let grid = document.querySelector(".grid");

let colors = ["pink", "blue", "green", "black"];

let deleteBtn = document.querySelector(".delete");

let deleteMode = false;

if (localStorage.getItem("AllTickets") == undefined) {
  let allTickets = {};

  allTickets = JSON.stringify(allTickets);

  localStorage.setItem("AllTickets", allTickets);
}

deleteBtn.addEventListener("click", function (e) {
  if (e.currentTarget.classList.contains("delete-selected")) {
    e.currentTarget.classList.remove("delete-selected");
    deleteMode = false;
  } else {
    e.currentTarget.classList.add("delete-selected");
    deleteMode = true;
  }
});

addBtn.addEventListener("click", function () {
  //delete mode ko band krna h

  deleteBtn.classList.remove("delete-selected");
  deleteMode = false;

  let preModal = document.querySelector(".modal");

  if (preModal != null) return;

  let div = document.createElement("div"); //<div></div>

  div.classList.add("modal"); //<div class="modal"></div>

  div.innerHTML = ` <div class="task-section">
  <div class="task-inner-container" contenteditable="true"></div>
</div>
<div class="modal-priority-section">
  <div class="priority-inner-container">
    <div class="modal-priority pink"></div>
    <div class="modal-priority blue"></div>
    <div class="modal-priority green"></div>
    <div class="modal-priority black selected"></div>
  </div>
</div>`;

  let ticketColor = "black";

  let allModalPriority = div.querySelectorAll(".modal-priority");
  for (let i = 0; i < allModalPriority.length; i++) {
    allModalPriority[i].addEventListener("click", function (e) {
      for (let j = 0; j < allModalPriority.length; j++) {
        allModalPriority[j].classList.remove("selected");
      }

      e.currentTarget.classList.add("selected");

      ticketColor = e.currentTarget.classList[1];
    });
  }

  let taskInnerContainer = div.querySelector(".task-inner-container");

  taskInnerContainer.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      let id = uid();
      let task = e.currentTarget.innerText;

      // step1 => jobhi data hai localstorage use lekr aao

      let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

      // step2 => usko update kro

      let ticketObj = {
        color: ticketColor,
        taskValue: task,
      };

      allTickets[id] = ticketObj;

      // step3 => wapis updated object ko localstorage me save krdo

      localStorage.setItem("AllTickets", JSON.stringify(allTickets));

      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");

      ticketDiv.setAttribute("data-id", id);

      ticketDiv.innerHTML = ` <div data-id="${id}" class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">
          #${id}
        </div>
        <div data-id="${id}" class="actual-task" contenteditable="true">
          ${task}
        </div>`;

      let ticketColorDiv = ticketDiv.querySelector(".ticket-color");

      let actualTaskDiv = ticketDiv.querySelector(".actual-task");

      actualTaskDiv.addEventListener("input", function(e){

        // update task store kia
        let updatedTask = e.currentTarget.innerText;

        // current ticket id nikali attribute ki help se
        let currTicketId = e.currentTarget.getAttribute("data-id");

        // all tickets nikali local storage se ya kh lo fetch ki saari ticktes
        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        // all ticktes ka task update kia
        allTickets[currTicketId].taskValue = updatedTask;

        // updated task waps store kia
        localStorage.setItem("AllTickets", JSON.stringify(allTickets));

      })

      ticketColorDiv.addEventListener("click", function (e) {
        // let colors = ["pink", "blue", "green", "black"];

        // current ticket id nikali attribute ki help se
        let currTicketId = e.currentTarget.getAttribute("data-id");

        let currColor = e.currentTarget.classList[1]; //green

        let index = -1;
        for (let i = 0; i < colors.length; i++) {
          if (colors[i] == currColor) index = i;
        }

        index++;
        index = index % 4;

        let newColor = colors[index];

        // all tickets nikali local storage se ya kh lo fetch ki saari ticktes
        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        // all ticktes ka color update kia
        allTickets[currTicketId].color = newColor;

        // updated task waps store kia
        localStorage.setItem("AllTickets", JSON.stringify(allTickets));



        ticketColorDiv.classList.remove(currColor);
        ticketColorDiv.classList.add(newColor);
      });

      ticketDiv.addEventListener("click", function (e) {
        if (deleteMode) {

          // current ticket id nikali attribute ki help se
        let currTicketId = e.currentTarget.getAttribute("data-id");
          
          e.currentTarget.remove();

          // all tickets nikali local storage se ya kh lo fetch ki saari ticktes
        let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

        // all ticktes ka task update kia
        delete allTickets[currTicketId];

        // updated task waps store kia
        localStorage.setItem("AllTickets", JSON.stringify(allTickets));


        }
      });

      grid.append(ticketDiv);

      div.remove();
    } else if (e.key === "Escape") {
      div.remove();
    }
  });

  body.append(div);
});