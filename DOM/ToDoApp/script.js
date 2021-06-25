let ul = document.querySelector("ul")
let input = document.querySelector("input")
let btn = document.querySelector("button")

//add event listener ek event ka wait kr rha h - click event,ki jb ye event hoga side me likha function chla dunga
btn.addEventListener("click", function(){
    // input box se value nikal rhe h
    let task= input.value;
    input.value = "";
    if(task=="") return;

    // ek new li element create kr rhe h

    let li = document.createElement("li");

    // input box se jo value nikali wo is li m daal rhe h

    li.innerText = task;


    li.addEventListener("dblclick", function(){
        li.remove();
    })
    // us li element ko jo abhi create kra just ul ke ander dal rhe hai
  ul.append(li);
});