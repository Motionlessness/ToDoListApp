// @ts-ignore: Ignoring issue with js-datepicker for lack of intellisense
const picker = datepicker("#dateDue");
picker.setMin(new Date());

const items = [];

class ToDoItem{
    title:string;
    dateDue:Date;
    details:string;
    isComplete:boolean;

}

window.onload =  function(){
    let addItem = document.getElementById("addItem");
    addItem.onclick = main;
    let itemString = localStorage.getItem("ToDoListItems");
    let localItem:Array<ToDoItem> = JSON.parse(itemString);
    localItem.forEach((item, i) => {
        displayToDoItem(item);
    });
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        items.push(item);
        displayToDoItem(item);
        itemsToJson();
    }
}

function itemsToJson() {
    let itemString = JSON.stringify(items);
    localStorage.setItem("ToDoListItems", itemString);
}

function isValid():boolean{
    return true;
}

function getToDoItem():ToDoItem{
    let userItem = new ToDoItem();
    let itemTitle = getUserInput("title");
    userItem.title = itemTitle.value;

    let itemDueDate = getUserInput("dateDue");
    userItem.dateDue = new Date(itemDueDate.value);

    let itemComplete = getUserInput("isComplete");
    userItem.isComplete = itemComplete.checked;

    let itemDetails = getUserInput("details");
    userItem.details = itemDetails.value;
    return userItem;
}

function displayToDoItem(item:ToDoItem):void{
    let itemTitle = document.createElement("h3");
    itemTitle.innerText = "Title: "+item.title;

    let itemDate = document.createElement("h4");
    itemDate.innerText = "Date due: "+item.dateDue.toString();

    let itemDetails = document.createElement("p");
    itemDetails.innerText = "Details: "+item.details;
    itemDetails.style.display = "none";
    itemDetails.id = "divDetails";

    let itemDiv = document.createElement("div");
    itemDiv.onclick = markComplete;
    itemDiv.onauxclick = displayDetails;
    itemDiv.classList.add("toDo");
    

    if(item.isComplete){itemDiv.classList.add("completed");}

    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDate);
    itemDiv.appendChild(itemDetails);
    if (item.isComplete){
        let completedItems = document.getElementById("completeItems");
        completedItems.appendChild(itemDiv);
    }else {
        let incompleteItems = document.getElementById("incompleteItems");
        incompleteItems.appendChild(itemDiv);
    }
}
function displayDetails() {
    let itemDiv = <HTMLElement>this;
    let itemModal = document.getElementById("itemModal")
    let itemDetails = document.getElementById("modalContent");
    let closeSpan = document.getElementById("close");
    let itemTemp = document.createElement("div");
    let completed = document.createElement("p");
    let divDetails = document.getElementById("divDetails");

    if (itemDiv.classList.contains("completed")) {
        completed.innerText = "Complete!";
        itemDetails.appendChild(completed);
    }
    divDetails.style.display = "block";
    itemTemp.innerHTML = itemDiv.innerHTML;

    itemDetails.appendChild(itemTemp);
    itemModal.style.display = "block";
    closeSpan.onclick = function () {
        if (itemDiv.classList.contains("completed")) {
            itemDetails.removeChild(completed);
        }
        itemDetails.removeChild(itemTemp);
        itemModal.style.display = "none";
        divDetails.style.display = "none";
    }
}

function markComplete() {
    let itemDiv = <HTMLElement>this;
    if (itemDiv.classList.contains("completed")) {
        itemDiv.classList.remove("completed");
        let incompleteItems = document.getElementById("incompleteItems");
        incompleteItems.appendChild(itemDiv);
    } else {
        itemDiv.classList.add("completed");
        let completedItems = document.getElementById("completeItems");
        completedItems.appendChild(itemDiv);
    }
}
function getUserInput(id:string):HTMLInputElement{ return <HTMLInputElement>document.getElementById(id)};
// allow user to mark a todoitem as completed