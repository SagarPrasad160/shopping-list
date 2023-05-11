const inputForm = document.getElementById("item-form");
const inputText = document.getElementById("item-input");

const itemList = document.getElementById("item-list");

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

const addItem = (e) => {
  e.preventDefault();
  const newItem = inputText.value;

  // create new list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));
  // create a new button element
  const button = createButton("remove-item btn-link text-red");

  // append button to list item
  li.appendChild(button);

  // add list item to list
  itemList.appendChild(li);
  // clearing input field
  inputText.value = "";
};

inputForm.addEventListener("submit", addItem);
