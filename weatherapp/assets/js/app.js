/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; // search based on zip code
let data;
let apiKey = '&appid=de56270aa19a78cd9c7088582a6ee204';

let infoSec = document.getElementsByClassName('info')[0];
let entryHolderSec = document.getElementsByClassName('entryHolder')[0];

let mySearch = document.getElementById('mySearch');
let weatherInput = document.getElementById('zip');
let feelingsInput = document.getElementById('feelings');
let genBtn = document.getElementById('generate');

// hide/show functionality
let counter = 0;
let hideBtn = document.getElementById('hide');

hideBtn.addEventListener('click', function(e){
    counter++;
    if (counter === 1){
        hideInfoSec();
    } else {
        showInfoSec();
    }
});

mySearch.addEventListener('click', function(e){
    hideInfoSec();
    weatherInput.value = this.text;
    feelingsInput.value = 'What a Perfect Day to Smile!';
    genBtn.click();
});

weatherInput.addEventListener('keypress', function(e) {
    // get inout values and focus textarea
    if(e.keyCode === 13 || e.which === 13){
        e.preventDefault();
        checkZipCode(this.value);
        feelingsInput.focus();
        weatherInput.value = this.value;
    }
});


genBtn.addEventListener('click', function(e){
    hideInfoSec();
    checkZipCode(weatherInput.value);
    if(data === '' || data === undefined){
        console.log('No data');
    } else {
        getCurrentWeather(baseURL,data, apiKey);
    }
});

// function checkZipCode
function checkZipCode(value){
    let inputVal = value.split(',');
    if(inputVal.length === 1 ){
        data = inputVal[0];
    } else {
        data = inputVal[0] + ',' + inputVal[1];
    }
}

// getCurrentWeather function - return weather data based on search
const getCurrentWeather = async (baseURL, data, apiKey) => {
    const res = await fetch(baseURL+ data + '&units=metric' + apiKey);

    // call dummy api point
    //const res = await fetch('/dummyDemoData');
    try {
        const data = await res.json();
        if (!data.hasOwnProperty('coord')) {
            //TODO not found error
            console.log('Not Found')
        } else {
            console.log(data);
            addCurrentWeather(data);
        }
        return data;
    }  catch(error) {
        console.log('error', error);
        // appropriately handle the error
        }
}

// add values to articles
function addCurrentWeather(data){

    document.getElementById('data.name').innerText  = data.name;
    document.getElementById('data.dt').innerText  = new Date(data.dt * 1000);
    document.getElementById('data.weather.icon').innerHTML  = '<img src =\'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png\'/>';
    document.getElementById('data.weather.description').innerText  = data.weather[0].description;

    // ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
    //  https://www.fileformat.info/info/unicode/char/2103/index.htm
    document.getElementById('data.main.temp').innerText  = data.main.temp + String.fromCodePoint(0x2103);
    document.getElementById('data.main.feels_like').innerText  = data.main.feels_like + String.fromCodePoint(0x2103);
}



// in small screens hide info section
if (window.innerWidth <= 700 ) {
    hideInfoSec();
}

// functions
function hideInfoSec(){
   infoSec.style.display = 'none';
   entryHolderSec.style.display = 'block';
   hideBtn.classList.remove('fa-eye-slash');
   hideBtn.classList.add('fa-eye-slash');
   counter = 1;
}

function showInfoSec(){
    infoSec.style.display = 'block';
    entryHolderSec.style.display = 'none';
    hideBtn.classList.remove('fa-eye-slash');
    hideBtn.classList.add('fa-eye');
    counter = 0;
}

function showEntryHolderSec(){
    entryHolder.style.display = 'block';
}

function hideLatestSec(){
    entryHolder.style.display = 'none';
}

// Create a new date instance dynamically - add to footer
let d = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let newDate = d.toLocaleDateString('en-US', options);

let footer = document.querySelector('footer');
let txt = document.createTextNode(" - " + newDate);
let p = footer.querySelector('p');
footer.appendChild(p).appendChild(txt);