// @ts-ignore: Ignoring issue with js-datepicker for lack of intellisense
const picker = datepicker("#dateDue");
picker.setMin(new Date());

const items = [];


class ToDoItem{
    title:string;
    dateDue:Date;
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

    return userItem;
}

function displayToDoItem(item:ToDoItem):void{
    let itemTitle = document.createElement("h3");
    itemTitle.innerText = item.title;

    let itemDate = document.createElement("p");
    itemDate.innerText = item.dateDue.toString();

    let itemDiv = document.createElement("div");
    itemDiv.onclick = markComplete;
    itemDiv.classList.add("toDo");
    

    if(item.isComplete){itemDiv.classList.add("completed");}

    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDate);

    if (item.isComplete){
        let completedItems = document.getElementById("completeItems");
        completedItems.appendChild(itemDiv);
    }else {
        let incompleteItems = document.getElementById("incompleteItems");
        incompleteItems.appendChild(itemDiv);
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