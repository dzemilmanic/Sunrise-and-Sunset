function currentTime() {
    var currentTimeElement = document.getElementById('current-time');
    var currentTime = new Date();
    
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    // dodavanje nule ispred jednocifrenih minuta i sekundi
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    var formattedTime = hours + ':' + minutes + ':' + seconds;
    
    currentTimeElement.textContent =  formattedTime;
  }
  
  // azuriranje trenutnog vremena svake sekunde
  setInterval(currentTime, 1000);
  currentTime();

  function date(){
    var currentDateElement = document.getElementById('date');
    var currentDate = new Date();
    
    var day = currentDate.getDay();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                    'August', 'September', 'October', 'November', 'December'];

    var formattedDate = days[day] + ', ' + date + '. ' + months[month] + ' ' + year + '.';
    
    currentDateElement.textContent =  formattedDate;
  }
  
  // azuriranje trenutnog vremena svake sekunde
  setInterval(currentTime, 1000);
  date();

  function trazi() {
    const rezultat1 = document.getElementById('response1');
    fetch(`https://api.sunrisesunset.io/json?lat=${43.13667}&lng=${20.51222}&timezone=UTC+1`)
      .then(response => response.json())
      .then(data => {
        rezultat1.innerHTML = '';
        const sunrise = data.results.sunrise;

        const resultCard = document.createElement('div');
        resultCard.classList.add('card', 'col-md-12', 'text-center',);

        const data1 = document.createElement('h6');
        data1.classList.add('card-title');
        data1.textContent = `Sunrise: ${sunrise}`;

        resultCard.appendChild(data1);
        rezultat1.appendChild(resultCard);
      })
      .catch(error => {
        console.log(error);
      })

    const rezultat2 = document.getElementById('response2');
    fetch(`https://api.sunrisesunset.io/json?lat=${43.13667}&lng=${20.51222}&timezone=UTC+1`)
      .then(response => response.json())
      .then(data => {
        rezultat2.innerHTML = '';
        const sunset = data.results.sunset;

        const resultCard = document.createElement('div');
        resultCard.classList.add('card', 'col-md-12', 'text-center');

        const data1 = document.createElement('h6');
        data1.classList.add('card-title');
        data1.textContent = `Sunset: ${sunset}`;

        resultCard.appendChild(data1);
        rezultat2.appendChild(resultCard);
      })
      .catch(error => {
        console.log(error);
      })
      const rezultat3 = document.getElementById('response3');
    fetch(`https://api.sunrisesunset.io/json?lat=${43.13667}&lng=${20.51222}&timezone=UTC+1`)
      .then(response => response.json())
      .then(data => {
        rezultat3.innerHTML = '';
        const day_length = data.results.day_length;

        const resultCard = document.createElement('div');
        resultCard.classList.add('card', 'col-md-12', 'text-center');
        
        const data1 = document.createElement('h6');
        data1.classList.add('card-title');
        data1.textContent = `Day length: ${day_length}`;

        resultCard.appendChild(data1);
        rezultat3.appendChild(resultCard);
      })
      .catch(error => {
        console.log(error);
      })
  }
  trazi();