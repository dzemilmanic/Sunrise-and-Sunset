let inputsApi = document.querySelectorAll('input');
let errorsApi = {
    "lat" : [],
    "long" : [],
    "date" : []
}

inputsApi.forEach(element =>{
    element.addEventListener('keyup', e =>{
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');

            errorsApi[inputName] = [];
            switch(inputName){
                case 'lat':
                    if(!validateLat(inputValue)){
                        errorsApi[inputName].push('Invalid latitude format');
                        errorsApi[inputName].push('The latitude must be a float number (+-90) with a dot between the whole part of the number and the remainder');  
                    }
                    break;
                case 'long':
                    if(!validateLong(inputValue)){
                      errorsApi[inputName].push('Invalid longitude format');
                      errorsApi[inputName].push('The longitude must be a float number (+-180) with a dot between the whole part of the number and the remainder');
                    } 
                    break;
                case 'date':
                    if(!validateDate(inputValue)){
                      errorsApi[inputName].push('Invalid date format');
                      errorsApi[inputName].push('The date must be in the format YYYY-MM-DD');
                    } 
                    break;
            }
        popErrorsApi(inputName);
    });
});
const popErrorsApi = (inputName) => {
    let input = document.querySelector(`input[name="${inputName}"]`);
    if (input) {
        let parentElement = input.parentElement;
        let errorsElement = parentElement.querySelector('ul');

        if (errorsElement) {
            errorsElement.remove(); // ukloni postojeci ul element
        }

        // kreiraj novi ul element samo ako postoje greske za trenutni input
        if (errorsApi[inputName] && errorsApi[inputName].length > 0) {
            errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            // dodaj li elemente za svaku gresku
            errorsApi[inputName].forEach(error => {
                let li = document.createElement('li');
                li.innerText = error;
                errorsElement.appendChild(li);
            });
        }
    }
};

function pretrazivanje() {  
    const getInputValueByName = (name) => {
        const inputElement = document.querySelector(`input[name="${name}"]`);
        return inputElement ? inputElement.value : null;
    }
    
    const lat = getInputValueByName('lat');
    const long = getInputValueByName('long');
    const date = getInputValueByName('date');

    const isLatValid = validateLat(lat);
    const isLongValid = validateLong(long);
    const isDateValid = validateDate(date);

    if(localStorage.getItem('ulogovan')){
        if(isLatValid && isLongValid && isDateValid){
    const searchTerm1 = document.getElementById('searchInput1').value.trim().toLowerCase();
    const searchTerm2 = document.getElementById('searchInput2').value.trim().toLowerCase();
    const searchTerm3 = document.getElementById('searchInput3').value.trim().toLowerCase();
    
    const rezultat = document.getElementById('result');

    fetch(`https://api.sunrisesunset.io/json?lat=${searchTerm1}&lng=${searchTerm2}&timezone=UTC+1&date=${searchTerm3}`)
      .then(response => response.json())
      .then(data => {
        rezultat.innerHTML = '';
        const sunrise = data.results.sunrise;
        const sunset = data.results.sunset;
        const datum = data.results.date;
        const timezone = data.results.timezone;
        const goldenHour = data.results.golden_hour;
        const dusk = data.results.dusk;


        const resultCard = document.createElement('div');
        resultCard.classList.add('card', 'col-md-12', 'text-center');

        const data1 = document.createElement('p');
        data1.classList.add('card-title');
        data1.textContent = `Sunrise: ${sunrise}`;

        const data2 = document.createElement('p');
        data2.classList.add('card-title');
        data2.textContent = `Sunset: ${sunset}`;

        const data3 = document.createElement('p');
        data3.classList.add('card-title');
        data3.textContent = `Datum: ${datum}`;

        const data4 = document.createElement('p');
        data4.classList.add('card-title');
        data4.textContent = `Timezone: ${timezone}`;

        const data5 = document.createElement('p');
        data5.classList.add('card-title');
        data5.textContent = `GoldenHour: ${goldenHour}`;

        const data6 = document.createElement('p');
        data6.classList.add('card-title');
        data6.textContent = `Dusk: ${dusk}`;

        resultCard.appendChild(data1);
        resultCard.appendChild(data2);
        resultCard.appendChild(data3);
        resultCard.appendChild(data4);
        resultCard.appendChild(data5);
        resultCard.appendChild(data6);
        rezultat.appendChild(resultCard);
      })
      .catch(error => {
        console.log(error);
      })
    }
    else{
        alert("The form is not filled in correctly")
    }
}
    else{
        alert("You must be logged in")
    }
};

function pretrazivanje2() {
    if(localStorage.getItem('ulogovan')){
    const selectedCity = document.getElementById('cityDropdown').value;
    const [latitude, longitude] = selectedCity.split(',');
    const rezultat = document.getElementById('result2');

    fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=UTC+1`)
      .then(response => response.json())
      .then(data => {
        rezultat.innerHTML = '';
        const sunrise = data.results.sunrise;
        const sunset = data.results.sunset;
        const datum = data.results.date;
        const timezone = data.results.timezone;
        const goldenHour = data.results.golden_hour;
        const dusk = data.results.dusk;

        const resultCard = document.createElement('div');
        resultCard.classList.add('card', 'col-md-12', 'text-center');

        const data1 = document.createElement('p');
        data1.classList.add('card-title');
        data1.textContent = `Sunrise: ${sunrise}`;

        const data2 = document.createElement('p');
        data2.classList.add('card-title');
        data2.textContent = `Sunset: ${sunset}`;

        const data3 = document.createElement('p');
        data3.classList.add('card-title');
        data3.textContent = `Datum: ${datum}`;

        const data4 = document.createElement('p');
        data4.classList.add('card-title');
        data4.textContent = `Timezone: ${timezone}`;

        const data5 = document.createElement('p');
        data5.classList.add('card-title');
        data5.textContent = `GoldenHour: ${goldenHour}`;

        const data6 = document.createElement('p');
        data6.classList.add('card-title');
        data6.textContent = `Dusk: ${dusk}`;

        resultCard.appendChild(data1);
        resultCard.appendChild(data2);
        resultCard.appendChild(data3);
        resultCard.appendChild(data4);
        resultCard.appendChild(data5);
        resultCard.appendChild(data6);
        rezultat.appendChild(resultCard);
      })
      .catch(error => {
        console.log(error);
      })
    }
    else{
        alert("You must be logged in")
    }
};

const hasLetters = (text) => {
    const nonLetterRegex = /[^a-zA-Z]/;
    return nonLetterRegex.test(text);
};

const validateLat = (lat) =>{
    if(isFinite(lat) && Math.abs(lat) <= 90 && hasLetters(lat)){
        return true;
    }
    return false;
};
const validateLong = (long) =>{
  if(isFinite(long) && Math.abs(long) <= 180 && hasLetters(long)){
      return true;
  }
  return false;
};
const validateDate = (date) => {
    if (!date.trim()) {
        return true; // Ako je prazno, true
    }
  // Date format YYYY-MM-DD
  let datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  // Check if the date string format is a match
  let matchArray = date.match(datePattern);
  if (matchArray == null) {
      return false;
  }
  // Remove any non digit characters
  let dateString = date.replace(/\D/g, ''); 

  // Parse integer values from the date string
  let year = parseInt(dateString.substr(0, 4));
  let month = parseInt(dateString.substr(4, 2));
  let day = parseInt(dateString.substr(6, 2));
 
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
      daysInMonth[1] = 29;
  }

  if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
      return false;
  }
  return true;
};