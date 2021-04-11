/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='; // search based on zip code
let data;
let latestVisited = [];
const apiKey = '&appid=de56270aa19a78cd9c7088582a6ee204';

let infoSec = document.getElementsByClassName('info')[0];
let entryHolderSec = document.getElementsByClassName('entryHolder')[0];

let logo = document.getElementById('homepage');
let mySearch = document.getElementById('mySearch');
let weatherInput = document.getElementById('zip');
let feelingsInput = document.getElementById('feelings');
let genBtn = document.getElementById('generate');

let successDiv = document.getElementsByClassName('success')[0];
let errorDiv = document.getElementsByClassName('error')[0];
let latestDiv = document.getElementsByClassName('latest')[0];
let visitsList = document.getElementById('visits');

// hide/show functionality
let counter = 0;
let hideBtn = document.getElementById('hide');

hideBtn.addEventListener('click', function(e) {
    counter++;
    if (counter === 1){
        hideInfoSec();
    } else {
        showInfoSec();
    }
});

logo.addEventListener('click', function(e) {
    weatherInput.value = '';
    feelingsInput.value = '';
    showInfoSec();
});

mySearch.addEventListener('click', function(e) {
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


genBtn.addEventListener('click', function(e) {

    hideInfoSec();
    checkZipCode(weatherInput.value);
    if(data === '' || data === undefined || feelingsInput.value === ''){
        errorDisplay();
    } else if (data !== null && feelingsInput.value !== null) {
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
            errorDisplay();
        } else {
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
    successDiv.style.display = 'block';
    errorDiv.style.display = 'none';
    latestDiv.style.display = 'block';

    document.getElementById('data.name').innerText  = data.name;
    document.getElementById('data.dt').innerText  = 'Last update: ' + new Date(data.dt * 1000);
    document.getElementById('data.weather.icon').innerHTML  = '<img src =\'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png\' alt="'+ data.weather[0].description +'"/>';
    document.getElementById('myFeelings').innerHTML  = '<i class="fas fa-comments"></i> ' + feelingsInput.value;

    // ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
    //  https://www.fileformat.info/info/unicode/char/2103/index.htm
    document.getElementById('data.main.temp').innerHTML  = '<i class="fas fa-temperature-high"></i> ' + data.main.temp + String.fromCodePoint(0x2103);
    document.getElementById('data.main.feels_like').innerHTML  = '<i class="fas fa-fingerprint"></i>  Feels like: ' + data.main.feels_like + String.fromCodePoint(0x2103);

    let sunrise = new Date(data.sys.sunrise * 1000);
    let sunset = new Date(data.sys.sunset * 1000);
    let options = {hour: "numeric", minute: "numeric"};

    document.getElementById('data.sys.sunrise').innerHTML = '<i class="fas fa-sun"></i> ' + sunrise.toLocaleTimeString(options);
    document.getElementById('data.sys.sunset').innerHTML = '<i class="fas fa-moon"></i> ' + sunset.toLocaleTimeString(options);

    let place = {"name": data.name, "icon": data.weather[0].icon, "desc": data.weather[0].description, "temp": data.main.temp};

    if (latestVisited === null || !latestVisited.some( latestVisited => latestVisited['name'] === data.name )) {
        latestVisited.push(place);
        addLastVisitedSec(latestVisited);
    }
}

function addLastVisitedSec(data) {
    latestDiv.style.display = 'block';
    successDiv.style.display = 'block';
    errorDiv.style.display = 'none';

    visitsList.innerHTML = '';
    for (p = 0; p < data.length; p++){
        let li = document.createElement('li');
        li.innerHTML =
        '<figure>' +
        '<img src =\'http://openweathermap.org/img/wn/' + data[p].icon + '@2x.png\' alt="'+ data[p].description +'"/>' +
        '<figcaption>' + data[p].name + ' ' + data[p].temp + String.fromCodePoint(0x2103) + '</figcaption>' +
        '</figure>';

        visitsList.appendChild(li);
    }
}


// custom errorMessage
function errorDisplay(){
    successDiv.style.display = 'none';
    errorDiv.style.display = 'block';
    latestDiv.style.display = 'none';

    let text = '<p><img src =\'http://openweathermap.org/img/wn/11n@2x.png\'/></p>';

    if (weatherInput.value === '') {
        text += '<p>... no data found for - empty data<strong><em>';
        weatherInput.focus();
    } else if (feelingsInput.value === '') {
        text += '<p>... why are you in bad mood?</p>';
        feelingsInput.focus();
    }
    else {
        text += weatherInput.value + '</em></strong></p>';
    }

    errorDiv.innerHTML  = text;
}

// in small screens hide info section
if (window.innerWidth <= 700 ) {
    hideInfoSec();
}

// functions
function hideInfoSec(){
   infoSec.style.display = 'none';
   showEntryHolderSec();
   hideBtn.classList.remove('fa-eye-slash');
   hideBtn.classList.add('fa-eye-slash');
   counter = 1;
}

function showInfoSec(){
    infoSec.style.display = 'block';
    hideEntryHolderSec();
    entryHolderSec.style.display = 'none';
    hideBtn.classList.remove('fa-eye-slash');
    hideBtn.classList.add('fa-eye');
    counter = 0;
}

function showEntryHolderSec(){
    entryHolderSec.style.display = 'block';
}

function hideEntryHolderSec(){
    entryHolderSec.style.display = 'none';
}

// Create a new date instance dynamically - add to footer
let d = new Date();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let newDate = d.toLocaleDateString('en-US', options);

let footer = document.querySelector('footer');
let txt = document.createTextNode(" - " + newDate);
let p = footer.querySelector('p');
footer.appendChild(p).appendChild(txt);