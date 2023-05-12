const inputForm = document.getElementById("item-form");
const inputText = document.getElementById("item-input");

const itemList = document.getElementById("item-list");
const filter = document.getElementById("filter");
const clearBtn = document.getElementById("clear");

const formBtn = inputForm.querySelector("button");

let isEdit = false;
let selectedItem = null;

const createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

const createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newItem = inputText.value;

  if (isEdit) {
    updateItem(newItem, selectedItem);
  } else {
    // add item to local storage
    const items = getItemsFromLocalStorage();
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    // add item to DOM
    addItemToDOM(newItem);
  }

  checkUI();

  // clearing input field
  inputText.value = "";
};

const updateItem = (newText, itemToUpdate) => {
  // update local storage
  let items = getItemsFromLocalStorage();
  items = items.map((item) => {
    if (item === itemToUpdate.textContent) {
      return newText;
    }
    return item;
  });

  localStorage.setItem("items", JSON.stringify(items));

  itemToUpdate.textContent = "";
  itemToUpdate.appendChild(document.createTextNode(newText));
  // create a new button element
  const button = createButton("remove-item btn-link text-red");

  // append button to list item
  itemToUpdate.appendChild(button);

  // unset edit mode
  itemToUpdate.classList.remove("edit");
  formBtn.innerHTML = "<i class='fas fa-plus'></i> Add Item";
  isEdit = false;
};

const addItemToDOM = (newItem) => {
  // create new list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  li.className = "list-item";
  // create a new button element
  const button = createButton("remove-item btn-link text-red");

  // append button to list item
  li.appendChild(button);

  // add list item to list
  itemList.appendChild(li);
};

const removeItem = (e) => {
  if (e.target.parentNode.classList.contains("remove-item")) {
    const itemToRemove = e.target.parentNode.parentNode;

    // delete from local storage
    let items = getItemsFromLocalStorage();
    items = items.filter((item) => item !== itemToRemove.textContent);
    localStorage.setItem("items", JSON.stringify(items));

    // delete from DOM
    e.target.parentNode.parentNode.remove();
  }
  checkUI();
};

const editItem = (e) => {
  // reset edit classes on list items
  const listItems = itemList.querySelectorAll("li");
  listItems.forEach((i) => i.classList.remove("edit"));
  if (e.target.classList.contains("list-item")) {
    inputText.value = e.target.textContent;
    isEdit = true;

    // set edit mode
    selectedItem = e.target;
    selectedItem.classList.add("edit");
    formBtn.innerHTML = "<i class='fas fa-pencil-alt'></i> Update";
  }
};

const clearItems = () => {
  // remove from dom
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // clear localstorage
  localStorage.clear();
  checkUI();
};

function checkUI() {
  inputText.value = "";
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    filter.hidden = true;
    clearBtn.hidden = true;
  } else {
    filter.hidden = false;
    clearBtn.hidden = false;
  }
}

const filterItems = (e) => {
  const value = e.target.value;
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    if (item.textContent.toLowerCase().includes(value.toLowerCase())) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const getItemsFromLocalStorage = () => {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  return items;
};

inputForm.addEventListener("submit", handleSubmit);
itemList.addEventListener("click", removeItem);
itemList.addEventListener("click", editItem);
clearBtn.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);

// on page load

function onPageLoad() {
  const items = getItemsFromLocalStorage();
  items.forEach((item) => addItemToDOM(item));
  checkUI();
}

onPageLoad();
