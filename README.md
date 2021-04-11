# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI.
Weather data are fetching by using [OpenWeather API](https://openweathermap.org/api).

## Instructions
### Files structure

```
*
|   README.md
|   server.js
|__ weatherapp
    |   index.html
    |__ assets
        |__ css
        |   |   media.css
        |   |   style.css   
        |
        |__ img
        |   |   favicon-32x32.png
        |   |   weatherApp.png
        |
        |__ js
            |   app.js
```


### Installation
Should be installed the latest [node.js](https://nodejs.org/en/).

In `server.js` file, it is located a dummy api where you can load data for application. Before starting, the following
libraries should be installed:
1) `express` - execute command `npm install express`
2) `body-parser` -  execute command `npm install body-parser`
3) `cors` -  execute command `npm install cors`

## How it works
There are the following id's in the `index.html` file:
* `id="hide"` - Hide/show the `<section class="info">`.
* `id="zip"` - input where the user can enter zip's in format `{zip code},{country code}`.
* `id="feelings"` - textarea where the user can enter long text.

By press the button with `id=generate` and a dynamically updated section appears in the html page,
with retrieved data based on `zip` and inserted `feelings`.



