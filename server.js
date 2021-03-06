// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('weatherapp'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log(`Server is running on ${port}`);
}

// Dummy Api endpoint
const projectData = {
                        "coord": {
                            "lon": 4.3528,
                            "lat": 50.8466
                        },
                        "weather": [
                            {
                                "id": 803,
                                "main": "Clouds",
                                "description": "broken clouds",
                                "icon": "04d"
                            }
                        ],
                        "base": "stations",
                        "main": {
                            "temp": 8.28,
                            "feels_like": 7.64,
                            "temp_min": 8,
                            "temp_max": 8.33,
                            "pressure": 1012,
                            "humidity": 93
                        },
                        "visibility": 8000,
                        "wind": {
                            "speed": 1.54,
                            "deg": 80
                        },
                        "clouds": {
                            "all": 75
                        },
                        "dt": 1618055325,
                        "sys": {
                            "type": 1,
                            "id": 1227,
                            "country": "BE",
                            "sunrise": 1618030703,
                            "sunset": 1618079335
                        },
                        "timezone": 7200,
                        "id": 0,
                        "name": "Bruxelles",
                        "cod": 200
                    };

app.get('/dummyDemoData', getDemoData);

function getDemoData(req,res){
    res.send(projectData);
}

app.post('/dummyGetPlace', getDummyPlace);

let placeData;
app.get('/all', getPlaceData);

function getPlaceData(req, res){
    console.log(placeData);
    res.send(placeData);
    placeData = null;
}

function getDummyPlace(req, res){
    newEntry =
        { name: req.body.name, dt: req.body.dt, icon: req.body.icon,
                     description: req.body.description, temp: req.body.temp,
                     feels_like: req.body.feels_like,
                     sunrise: req.body.sunrise, sunset: req.body.sunset
                     };

    placeData = newEntry ;
    res.send(newEntry);
}