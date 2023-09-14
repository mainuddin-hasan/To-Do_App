let itemHistory = [];

let editState = {
     id: -1,
     itemname: "",
     enabled: false
}

function updateList(items){
    const itemList = document.getElementById("item-list");

    let listHtml = "";

    for(let item of items){
        listHtml += `
        <div id="item-${item.id}" class="flex items-center justify-between w-full">
        <span id="item-name" class="text-2xl font-medium">${item.itemname}</span>
        <div class="flex font-medium gap-4">
            <span id="delete">Delete</span>
            <span id="edit">Edit</span>
        </div>
    </div> 
    `
    }
    itemList.innerHTML = listHtml;
} 

function addItem(){
    const itemInput = document.getElementById("item-input");
    if(!itemInput)return;
    const itemName = itemInput.value;
    let item={}
    item = {type: "name",
            itemname: itemName
    };
    itemHistory.push({
        id: itemHistory.length,
        ...item
    })
    
    itemInput.value = "";

    updateList(itemHistory);
}

function updateItem(e){
    const id = editState.id;
    const itemname = document.getElementById("item-input");

    const selectItem = itemHistory.find(item => item.id === id);
    
    const editValue = itemname.value;

    selectItem.itemname = editValue;

    const selectItemIdx = itemHistory.findIndex(item=> item.id === id);

    itemHistory[selectItemIdx] = selectItem;

    updateList(itemHistory);

}

function deleteItem(item){
    const parent = item.parentElement.parentElement;
    const parentId = item.parentElement.parentElement.id;
    const idSplits = parentId.split("-");

    const idx = parseInt(idSplits.pop());

    itemHistory = itemHistory.filter(item => item.id !== idx);

    //console.log(itemHistory)

    updateList(itemHistory);

}

function editItem(item){
    const editBtn = document.getElementById("edit-item");
    const addBtn = document.getElementById("add-item");
    const cancelBtn = document.getElementById("cancel-btn");
    const itemInput = document.getElementById("item-input");

    
    editBtn.classList.remove("hidden");
    cancelBtn.classList.remove("hidden");
    addBtn.classList.add("hidden");

    const parent = item.parentElement.parentElement;
    const parentId = item.parentElement.parentElement.id;
    const idSplits = parentId.split("-");

    const idx = parseInt(idSplits.pop());

    const selectItem = itemHistory.find(item => item.id === idx);

    itemInput.value = selectItem.itemname;

    editState={
        itemname: selectItem.itemname,
        enabled: true,
        id: idx 
    }
}

function editCancel(){
    const addBtn = document.getElementById("add-item");
    const cancelBtn = document.getElementById("cancel-btn");
    const editBtn = document.getElementById("edit-item");

    editBtn.classList.add("hidden");
    cancelBtn.classList.add("hidden");
    addBtn.classList.remove("hidden");

    let editState = {
        id: -1,
        itemname: "",
        enabled: false
   }
}

function processAction(e){
    if(e.target.id === "delete"){
        deleteItem(e.target);
    }
    else if(e.target.id === "edit"){
        editItem(e.target);
    }
}

function registerEvents(){
    const addBtn = document.getElementById("add-item");
    const itemList = document.getElementById("item-list");
    const editBtn = document.getElementById("edit-item");
    const cancelBtn = document.getElementById("cancel-btn");

    addBtn.addEventListener("click", addItem);
    editBtn.addEventListener("click", updateItem);
    itemList.addEventListener("click", processAction);
    cancelBtn.addEventListener("click", editCancel);
}
registerEvents();