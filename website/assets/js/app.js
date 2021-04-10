/* Global Variables */
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip='; // search based on zip code
let zipCode, countryCode //
let units = '&units=metric' // optional - Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default
let apiKey = '&appid=de56270aa19a78cd9c7088582a6ee204';

let infoSec = document.getElementsByClassName('info');

let counter = 0;
let hideBtn = document.getElementById("hide");
hideBtn.addEventListener('click', function(e){
    counter++;
    if (counter === 1){
        infoSec[0].style.display = 'none';
        hideBtn.classList.remove('fa-eye');
        hideBtn.classList.add('fa-eye-slash');
    } else {
        infoSec[0].style.display = 'block';
        hideBtn.classList.remove('fa-eye-slash');
        hideBtn.classList.add('fa-eye');
        counter = 0;
    }
});

if (window.innerWidth <= 700 ) {
    infoSec[0].style.display = 'none';
    hideBtn.classList.remove('fa-eye-slash');
    hideBtn.classList.add('fa-eye-slash');
    counter = 1;
}

// Create a new date instance dynamically - add to footer
let d = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//let newDate = d.getDate() +'/'+ d.getMonth()+ '/'+ d.getFullYear();
let newDate = d.toLocaleDateString('en-US', options);

let footer = document.querySelector('footer');
let txt = document.createTextNode(" - " + newDate);
let p = footer.querySelector('p');
footer.appendChild(p).appendChild(txt);