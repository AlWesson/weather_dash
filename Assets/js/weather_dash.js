




$(document).ready(function () {
// let locationHistory = [];
let apiKey = "4f9b9f0d81395d4880a33e43a1783f9e";
// let history = document.getElementById('history'); // history div
let cityInput = document.getElementById('cityInput'); // input tag
let button = document.getElementById('forecastButton'); //button tag
let historyList = document.getElementById('historyList'); // unordered list tag
let deleteButtn = document.getElementById('deleteHistory');
    
    let allDates = [
        document.getElementById('date'),
        document.getElementById('date1'),
        document.getElementById('date2'),
        document.getElementById('date3'),
        document.getElementById('date4'),
        document.getElementById('date5'),
    ];

    let allTemp = [
        document.getElementById('temp'),
        document.getElementById('temp1'),
        document.getElementById('temp2'),
        document.getElementById('temp3'),
        document.getElementById('temp4'),
        document.getElementById('temp5'),
    ];

    let allWind = [
        document.getElementById('wind'),
        document.getElementById('wind1'),
        document.getElementById('wind2'),
        document.getElementById('wind3'),
        document.getElementById('wind4'),
        document.getElementById('wind5'),
    ];

    let allHumidity = [
        document.getElementById('humidity'),
        document.getElementById('humidity1'),
        document.getElementById('humidity2'),
        document.getElementById('humidity3'),
        document.getElementById('humidity4'),
        document.getElementById('humidity5'),
    ];

    let allIcons = [
        document.getElementById('icon'),
        document.getElementById('icon1'),
        document.getElementById('icon2'),
        document.getElementById('icon3'),
        document.getElementById('icon4'),
        document.getElementById('icon5'),
    ]
    
    let index = [0,7,15,23,31,39];

    let tempArray = [6];
    let humArray = [6];
    let windArray = [6];
    let dayArray = [6];
    
    function fetchLocationWeather(city) {
        // $city.val();
        let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&appid=${encodeURIComponent(apiKey)}`;
    
        fetch(apiUrl).then(function(res){
            return res.json();
        }).then(function (res){
            let lat = res[0].lat;
            let lon = res[0].lon;

            console.log(lat);
            console.log(lon);

            weatherPin(lat, lon);
        });
    };

    function weatherPin(lat, lon) {
        
        let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&units=imperial&appid=${encodeURIComponent(apiKey)}`;
    
        fetch(apiUrl).then(function(res) {
            return res.json();
        })
        .then(function (res) {
            console.log(res);
            displayWeather(res);
        });
    }

    function displayWeather(data) {
        let city = data.city.name;
        // history.textContent = '';


        for(let i =0; i <6; i++) {
            tempArray[i] = data.list[index[i]].main.temp;
            humArray[i] = data.list[index[i]].main.humidity;
            windArray[i] = data.list[index[i]].wind.speed;
            dayArray[i] = new Date(data.list[index[i]].dt * 1000);
        }

        let cityArray = [];
        for(let a = 0; a<5; a++){
            cityArray.push(data.list[a]);
        }

        for(let j = 0; j<6; j++){
            allTemp[j].textContent = 'Temperature: '+ tempArray[j] + '°F';
            allHumidity[j].textContent = 'Humidity: '+ humArray[j] + '%';
            allWind[j].textContent = 'Wind Speed: '+ windArray[j] + 'KM/H';
            allDates[j].textContent = city+ ' '+ dayArray[j].toLocaleDateString();
            allIcons[j].setAttribute("src", `https://openweathermap.org/img/w/${data.list[j].weather[0].icon}.png`);
        }

    }

    let locationHistory = JSON.parse(localStorage.getItem('locationHistory')) || [];

    function historyDisplay() {
        historyList.innerHTML = '';

        for(let i = 0; i < locationHistory.length; i++){
            let list = document.createElement('li');
            list.setAttribute('id', locationHistory[i]);
            historyList.appendChild(list);
            let current = document.getElementById(locationHistory[i]);
            let button2 = document.createElement('button');
            button2.setAttribute('value', locationHistory[i]);
            button2.textContent = locationHistory[i];
            current.appendChild(button2);
            button2.addEventListener('click', function(event) {
                const city = event.target.value;
                fetchLocationWeather(city);
            });
            
            
        }
    }

    function addToHistory(x) {
        
        localStorage.setItem('locationHistory', JSON.stringify(x));
        historyDisplay();
    }

    button.addEventListener('click', function(event) {
        event.preventDefault();
        let City = cityInput.value;
        fetchLocationWeather(City);

        
        locationHistory.unshift(City);
        historyDisplay();
        addToHistory(locationHistory);
    });

    deleteButtn.addEventListener('click', function() {
        
        $('#historyList').children().remove();

        localStorage.clear();
        locationHistory = [];
        addToHistory(locationHistory);

    });

    
    historyDisplay();
});

