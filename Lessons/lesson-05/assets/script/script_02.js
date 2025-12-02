const CONTAINER= document.getElementById('container')
fetch('/assets/data/mockdata.json')
  .then(response => response.json()) 
  .then(data => displayData(data))
  .catch(error => displayError('Error:', error));

  function displayData(data) {
    console.log(data)

    const FILTERED = data.filter((obj) => obj.age >= 50 && obj.age <60)
    const SUB_FILTER = FILTERED.filter((obj) => obj.gender == 'Female')
    console.log(SUB_FILTER.length)

    const SORT = SUB_FILTER.sort((a,b) => b.first_name.localeCompare(a.first_name))//mette in ordine i numeri dal più piccolo al più grande

    for (let person of SORT) {
        const PERSON = document.createElement('li');
        PERSON.textContent = `${person.first_name} ${person.last_name} ${person.age}`;
        CONTAINER.appendChild(PERSON);    
    }
    
  }

  function displayError(error) {
    console.log(error)
  }