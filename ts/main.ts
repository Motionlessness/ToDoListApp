// @ts-ignore: Ignoring issue with js-datepicker for lack of intellisense
const picker = datepicker("#dateDue");
picker.setMin(new Date());

class ToDoItem{
    title:string;
    dateDue:Date;
    isComplete:boolean;

}

window.onload =  function(){
    let addItem = document.getElementById("addItem");
    addItem.onclick = main;
}

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
    }
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
    itemDate.innerText = item.dateDue.toDateString();

    let itemDiv = document.createElement("div");
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

function getUserInput(id:string):HTMLInputElement{ return <HTMLInputElement>document.getElementById(id)};
// allow user to mark a todoitem as completed