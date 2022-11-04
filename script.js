const createInput = document.querySelector(".create-input");
const todoList = document.querySelector(".todo-list");
const itemCounter = document.querySelector('.item');
const nightButton = document.querySelector(".night-mode");
const body = document.querySelector('body');
const tags = document.querySelectorAll(".tag");
var list = []

nightButton.addEventListener('click', () => body.classList.toggle("night"));

createInput.addEventListener('keypress', (e) => {
    // Use function if pressed on enter!
    if(e.key === 'Enter' && createInput.value !== ""){
        list.push({
            content : createInput.value,
            condition: "",
            checked : false
        });
        createInput.value = "";
        addList(todoList, list);
        resetClass(tags);
    }
})

for(var x of tags){
    x.addEventListener('click', ()=>{
        resetClass(tags);
        let clickedElement = event.target;
        clickedElement.style.color = "#3A7CFD";
        show(event.target.innerText)
    })
}
function resetClass(arr){
    for(var x of arr){
        x.style.color = "#9495A5"
    }
}

function addList(element, list){
    element.innerHTML = "";
    for(let i = 0; i <list.length; i++){
    let tmp = 
    `   <div class="list todo ${list[i].condition}">
            <span class="circle"></span>
            <p>${list[i].content}</p>
            <img class="cross" src="./images/icon-cross.svg">
        </div>
    `
    element.innerHTML += tmp
    }
    deteleElement()
    markChecked()
    countItem(list)
}

function deteleElement(){
    let cross = document.querySelectorAll(".cross")
    for(let i = 0; i < cross.length; i++){
        cross[i].addEventListener('click', function(){
            // Remove clicked object
            list.splice(i, 1)
            addList(todoList, list)
        })
    }    
}

function markChecked(){
    let circle = document.querySelectorAll(".circle");
    for(let i = 0; i < circle.length; i++){
        circle[i].addEventListener('click', function(){
            if(this.parentElement.classList[2] !== "checked"){
                this.parentElement.classList.add("checked");
                list[i].checked = true;
                list[i].condition = 'checked'
            }
            else{
                this.parentElement.classList.remove("checked");
                list[i].checked = false;
                list[i].condition = '';
            }
        })
    }
}

function show(condition){
    // Filter list with clicked option!
    if(condition.toLowerCase() == "all"){
        addList(todoList, list);
    }
    else if(condition.toLowerCase() == "active"){
        let activeList = list.filter(list => list.checked == false);
        addList(todoList, activeList)
    }
    else{
        let completedList = list.filter(list => list.checked == true);
        addList(todoList, completedList)
    }
}

function countItem(list){
    // REALTIME COUNTER!
    itemCounter.innerText = list.length;
}

function clearCompleted(){
    // Clear Completed OBjects!
    list = list.filter(obj => obj.condition == false);
    addList(todoList, list)
}









