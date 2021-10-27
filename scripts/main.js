// Function to Display Current Date, Time, and a Greeting
function datetime() {
    var d = new Date();
    var t = d.toLocaleTimeString();
    var h = d.getHours();
    document.getElementById("center").innerHTML = t;
    document.getElementById("top-left").innerHTML = "Today is " + d.toDateString();
    if (h > 12) {
        var greet = "Afternoon";
    }
    else {
        var greet = "Morning";
    }
    document.getElementById("center").innerHTML += "<br> Good " + greet + "!";
}

// Refreshes the Date, Time, and Greeting every second
var x = setInterval(function () { datetime() }, 1000);

// Get the quote of the day (https://theysaidso.com/api/#qod)
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        qod(this);
    }
};
xhttp.open("GET", "http://quotes.rest/qod.xml", true);
xhttp.send();

function qod(xml) {
    var xmlDoc = xml.responseXML;
    document.getElementById("bottom-left").innerHTML = xmlDoc.getElementsByTagName("quote")[0].childNodes[0].nodeValue;
    document.getElementById("bottom-left").innerHTML += "<br> - " + xmlDoc.getElementsByTagName("author")[0].childNodes[0].nodeValue;
}

//Get GEOLocation via the Browser (Will Promt User that We Want to Know Their Location)
/*function getWeather() {
    console.log("GeoLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Getting Position");
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            showWeather(lat, long)

        })
    }
    else {
        window.alert("Could not get location");
    }
}*/

//Calling the DarkSky API
function showWeather() {
    //var url = `https://api.darksky.net/forecast/yourAPIKey/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var url = "https://api.darksky.net/forecast/yourAPIKey/yourLat,-yourLong?format=jsonp&callback=displayWeather";
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    displayWeather(object);
}

// Weather Icons
var weatherImages = {
    "clear-day": "Sun.svg",
    "clear-night": "Moon-Full.svg",
    "rain": "Cloud-Rain.svg",
    "snow": "Cloud-Snow-Alt.svg",
    "sleet": "Cloud-Snow.svg",
    "wind": "Wind.svg",
    "fog": "Cloud-Fog.svg",
    "cloudy": "Cloud.svg",
    "partly-cloudy-day": "Cloud-Sun.svg",
    "partly-cloudy-night": "Cloud-Moon.svg",
    "hail": "Cloud-Hail.svg",
    "thunderstorm": "Cloud-Lightning.svg",
    "tornado": "Tornado.svg"
}

// Display Weather
var object;
function displayWeather(object) {
    document.getElementById("top-right").innerHTML = '<img src="./img/' + weatherImages[object.currently.icon] + '"style="height:10vmin;">';
    document.getElementById("top-right").innerHTML += Math.round(object.currently.temperature) + "˚ " + object.currently.summary;
    document.getElementById("top-right").innerHTML += "<br>" + object.hourly.summary;
    //Display Alert if there is an active alert... If there is not it is not defined (Need to test this)
    if (object.alerts != undefined)
        {
            document.getElementById("alert").innerHTML = "<strong>Active Alert:</strong>" + object.alerts.title;
        }
    else
        {
            document.getElementById("alert").style.display = "none";
        }
}

// Refresh the Weather Every Hour
var y = setInterval(function () { showWeather() }, 3600000);

window.onload = function()
    {
        //getWeather();
        datetime();
        showWeather();

    }