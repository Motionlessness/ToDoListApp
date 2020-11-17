var picker = datepicker("#dateDue");
picker.setMin(new Date());
var items = [];
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = document.getElementById("addItem");
    addItem.onclick = main;
    var itemString = localStorage.getItem("ToDoListItems");
    var localItem = JSON.parse(itemString);
    localItem.forEach(function (item, i) {
        displayToDoItem(item);
    });
};
function main() {
    if (isValid()) {
        var item = getToDoItem();
        items.push(item);
        displayToDoItem(item);
        itemsToJson();
    }
}
function itemsToJson() {
    var itemString = JSON.stringify(items);
    localStorage.setItem("ToDoListItems", itemString);
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
    var itemDetails = getUserInput("details");
    userItem.details = itemDetails.value;
    return userItem;
}
function displayToDoItem(item) {
    var itemTitle = document.createElement("h3");
    itemTitle.innerText = "Title: " + item.title;
    var itemDate = document.createElement("h4");
    itemDate.innerText = "Date due: " + item.dateDue.toString();
    var itemDetails = document.createElement("p");
    itemDetails.innerText = "Details: " + item.details;
    itemDetails.style.display = "none";
    itemDetails.id = "divDetails";
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markComplete;
    itemDiv.onauxclick = displayDetails;
    itemDiv.classList.add("toDo");
    if (item.isComplete) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(itemDate);
    itemDiv.appendChild(itemDetails);
    if (item.isComplete) {
        var completedItems = document.getElementById("completeItems");
        completedItems.appendChild(itemDiv);
    }
    else {
        var incompleteItems = document.getElementById("incompleteItems");
        incompleteItems.appendChild(itemDiv);
    }
}
function displayDetails() {
    var itemDiv = this;
    var itemModal = document.getElementById("itemModal");
    var itemDetails = document.getElementById("modalContent");
    var closeSpan = document.getElementById("close");
    var itemTemp = document.createElement("div");
    var completed = document.createElement("p");
    var divDetails = document.getElementById("divDetails");
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
    };
}
function markComplete() {
    var itemDiv = this;
    if (itemDiv.classList.contains("completed")) {
        itemDiv.classList.remove("completed");
        var incompleteItems = document.getElementById("incompleteItems");
        incompleteItems.appendChild(itemDiv);
    }
    else {
        itemDiv.classList.add("completed");
        var completedItems = document.getElementById("completeItems");
        completedItems.appendChild(itemDiv);
    }
}
function getUserInput(id) { return document.getElementById(id); }
;
