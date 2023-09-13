const itemHistory = [];



function updateList(items){
    const itemList = document.getElementById("item-list");

    let listHtml = "";

    for(let item of items){
        listHtml +=  `
        <div id="item" class="flex items-center justify-between w-full">
        <span id="item-name" class="text-2xl font-medium">${item}</span>
        <div class="flex font-medium gap-4">
            <span id="delete">Delete</span>
            <span id="update">Update</span>
        </div>
    </div> 
    `
    }
    itemList.innerHTML = listHtml;
} 

function addItem(){
    const itemInput = document.getElementById("item-input");
    if(!itemInput)return;
    const item = itemInput.value;

    itemHistory.push(item);

    updateList(itemHistory);
}

function registerEvents(){
    const addBtn = document.getElementById("add-item");
    addBtn.addEventListener("click", addItem);
}
registerEvents();