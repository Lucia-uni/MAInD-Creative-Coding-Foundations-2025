const CONTAINER= document.getElementById('container')
fetch('/assets/mockdata.json')
  .then(response => response.json()) 
  .then(data => displayData(data))
  .catch(error => displayError('Error:', error));

  function displayData(data) {
    console.log(data)

    const FILTERED = data.filter((obj) => obj.age >= 20 && obj.age <40)
    const SUB_FILTER = FILTERED.filter((obj) => obj.gender == 'Female')
    console.log(SUB_FILTER.length)

    const SORT = FILTERED.sort((a,b) => a.age - b.age)//mette in ordine

    for (let person of FILTERED) {
        const PERSON_BOX = document.createElement('div');
        const PERSON_INFO = document.createElement('div');
        const PERSON_BAR = document.createElement('div');

        PERSON_INFO.textContent = `${person.first_name}, ${person.last_name}, ${person.gender}, ${person.age}`;

        const BAR_WIDTH = person.age * 5;
        PERSON_BAR.style.width = `${BAR_WIDTH}px`;
        PERSON_BAR.className ='bar';

        let BAR_COLOR = 'gray';

        if (person.gender == 'Male') {
            BAR_COLOR = 'blue';
        } else if (person.gender == 'Female') {
            BAR_COLOR = 'pink';
        } else {
            BAR_COLOR = 'orange';
        }

        PERSON_BAR.style.backgroundColor = BAR_COLOR;
        
        PERSON_BOX.appendChild(PERSON_INFO);
        PERSON_BOX.appendChild(PERSON_BAR);
        
        CONTAINER.appendChild(PERSON_BOX); 

    }
    
  }

  function displayError(error) {
    console.log(error)
  }