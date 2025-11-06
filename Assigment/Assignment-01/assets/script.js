//buttons
const addButton = document.getElementById('add-btn');
const listButton = document.getElementById('list-view-btn');
const cardButton = document.getElementById('card-view-btn');

//elements
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input')
const taskList = document.getElementById('task-list-container');

//change color
const colorPicker = document.getElementById('color');
const targetButtons = document.querySelectorAll('.toggle-btn'); 


function updateButtonColors(event) {
  const newColor = event.target.value;

  targetButtons.forEach(button => {
    button.style.backgroundColor = newColor;
  });
}

colorPicker.addEventListener('input', updateButtonColors);

//event listener
//List
listButton.addEventListener('click', () => {
    console.log('list button pressed');

    taskList.classList.remove('card-view');
    taskList.classList.add('list-view');
})

//to delete default buttons
const staticRemoveButtons = document.querySelectorAll('.remover'); 

staticRemoveButtons.forEach(button => {
    button.addEventListener('click', () => {
        const quoteBoxToRemove = button.closest('.quote-box');
        
        if (quoteBoxToRemove) {
            quoteBoxToRemove.remove();
            console.log("Remove div");
        }
    });
});

//Cards
cardButton.addEventListener('click', () => {
    console.log('card button pressed');

    taskList.classList.remove('list-view');
    taskList.classList.add('card-view');
})

//Add
addButton.addEventListener('click', () => {
    console.log("Add button pressed!!!");

    const quoteText = quoteInput.value;
    const authorText = authorInput.value;

    if (quoteText.trim() === '' || authorText.trim() === '') {
        alert("Inserisci sia la citazione che l'autore!");
        return; //for not adding elements if there aren't values
    }

    //add div container
    const quoteContainer = document.createElement('div');
    quoteContainer.classList.add('quote-box'); 

    //add remover button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remover'); 
    removeButton.textContent = 'X';

    //to actually remove
    removeButton.addEventListener('click', () => {
        quoteContainer.remove(); 
    });
    
    //quote
    const quoteElement = document.createElement('p');
    quoteElement.classList.add('quote'); // Classe CSS per il corsivo
    quoteElement.textContent = `"${quoteText}"`;
    
    //author
    const authorElement = document.createElement('p');
    authorElement.classList.add('author');
    authorElement.textContent = authorText;
    
    //add to the container
    quoteContainer.appendChild(removeButton);
    quoteContainer.appendChild(quoteElement);
    quoteContainer.appendChild(authorElement);
    
    //add to the list
    taskList.appendChild(quoteContainer);

    quoteInput.value = '';
    authorInput.value = '';
});