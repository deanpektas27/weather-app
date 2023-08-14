const temperatureButton = document.querySelector('#tempbtn');
const searchTemperature = document.querySelector('#search');
const background = document.querySelector('body');
let loadedData;
let icon = new Image();

async function getWeather(location) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=44e5ced3f96a4b39b65171123231308&q=${location}&aqi=no`);
        const weatherData = await response.json();
        displayData(weatherData);
        loadedData = weatherData;
    } catch(err) {
        errData();
    }
}

const displayData = (data) => {
    console.log(data.location.localtime.split(" ")[1].split(":"));
    let locationName = data.location.name;
    let countryName = data.location.country;
    let currentTemp = temperatureButton.innerText == "C" ? `${data.current.temp_c}°` : `${data.current.temp_f}°`;;
    let currentTime = data.location.localtime.split(" ")[1];
    let currentCondition = data.current.condition.text;
    icon.src = data.current.condition.icon;
    document.querySelector('#locationName').innerText = locationName;
    document.querySelector('#countryName').innerText = countryName;
    document.querySelector('.temperature').appendChild(icon);
    document.querySelector('#currentCondition').innerText = currentCondition;
    document.querySelector('#currentTemperature').innerText = currentTemp;
    checkTime(currentTime);
}

const errData = () => {
    document.querySelector('#locationName').innerText = "Invalid location entered!";
    document.querySelector('#countryName').innerText = "";
    document.querySelector('#currentCondition').innerText = "";
    document.querySelector('#currentTemperature').innerText = "";
    icon.src = "";
}

const switchTemperatureDisplayed = (loadedData, currentSelection) => {
    if(currentSelection == "C") {
        document.querySelector('#currentTemperature').innerText = `${loadedData.current.temp_f}°`;
    } else if(currentSelection == "F") {
        document.querySelector('#currentTemperature').innerText = `${loadedData.current.temp_c}°`;
    }
}

const checkTime = (time) => {
    let hour = time.split(":")[0];
    console.log(hour);
    if(hour > 20 || hour < 7) {
        background.setAttribute('style',`background: url('sources/images/nighttime.jpeg') no-repeat center;`)
        document.querySelector('.resultsContainer').setAttribute('style','color:white;')
    } else if(hour > 7 && hour < 20) {
        background.setAttribute('style',`background: url('sources/images/daytime.jpg') no-repeat center;`)
        document.querySelector('.resultsContainer').setAttribute('style','color:white;')
    }
}

temperatureButton.addEventListener('click', () => {
    let currentSelection = temperatureButton.innerText;
    if(currentSelection == "C") {
        temperatureButton.innerText = "F";
        switchTemperatureDisplayed(loadedData, currentSelection);
    } else if(currentSelection == "F") {
        temperatureButton.innerText = "C";
        switchTemperatureDisplayed(loadedData, currentSelection);
    }
});

searchTemperature.addEventListener('click', () => {
    let searchedTerm = document.querySelector('#searchWeather').value;
    getWeather(searchedTerm);
})

getWeather('London');

// goals for this app
// 3. Depending on time in searched area, 
//    use 1 of 3 saved backgrounds on webpage