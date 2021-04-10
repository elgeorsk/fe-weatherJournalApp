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
app.use(express.static('website'));


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
                            "temp": 279.79,
                            "feels_like": 278.92,
                            "temp_min": 279.15,
                            "temp_max": 280.37,
                            "pressure": 1013,
                            "humidity": 93
                        },
                        "visibility": 6000,
                        "wind": {
                            "speed": 1.54,
                            "deg": 60
                        },
                        "clouds": {
                            "all": 75
                        },
                        "dt": 1618040053,
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