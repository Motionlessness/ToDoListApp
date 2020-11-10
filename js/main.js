var picker = datepicker("#dateDue");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("addItem");
    addItem.onclick = main;
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var userItem = new ToDoItem();
    var itemTitle = getUserInput("title");
    userItem.title = itemTitle.value;
    var itemDueDate = getUserInput("dateDue");
    userItem.dateDue = new Date(itemDueDate.value);
    var itemComplete = getUserInput("isComplete");
    userItem.isComplete = itemComplete.checked;
    return userItem;
}
function displayToDoItem(item) {
    var itemTitle = document.createElement("h3");
    itemTitle.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dateDue.toDateString();
    var itemDiv = document.createElement("div");
    if (item.isComplete) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDate);
    if (item.isComplete) {
        var completedItems = document.getElementById("completeItems");
        completedItems.appendChild(itemDiv);
    }
    else {
        var incompleteItems = document.getElementById("incompleteItems");
        incompleteItems.appendChild(itemDiv);
    }
}
function getUserInput(id) { return document.getElementById(id); }
;
