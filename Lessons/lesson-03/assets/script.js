//buttons
const addButton = document.getElementById('add-btn');
const listButton = document.getElementById('list-view-btn');
const cardButton = document.getElementById('card-view-btn');

//elements
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list-container');


//event listener
//List
listButton.addEventListener('click', () => {
    console.log('list button pressed');

    taskList.classList.remove('card-view');
    taskList.classList.add('list-view');
})

//Cards
cardButton.addEventListener('click', () => {
    console.log('card button pressed');

    taskList.classList.remove('list-view');
    taskList.classList.add('card-view');
})

//Add
addButton.addEventListener('click', () => {
    console.log("Add button pressed!!!");

    const inputValue = taskInput.value;
    const listElement = document.createElement('li');
    listElement.innerHTML = inputValue;
    taskList.appendChild(listElement);
    taskInput.value = '';
})