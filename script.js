const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    console.log(response);
    if (response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
        return;
    } else {
        const data = await response.json();
        console.log(data);
        const temp = Math.round(data.main.temp);
        const cityName = data.name;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const weather = data.weather[0].main;
        const icon = data.weather[0].icon;
        console.log(weather);
        document.querySelector('.temp').innerHTML = `${temp}°C`;
        document.querySelector('.city').innerHTML = cityName;
        document.querySelector('.humidity').innerHTML = `${humidity}%`;
        document.querySelector('.wind').innerHTML = `${wind}km/hr`;
        document.querySelector('.weather-icon').src = `images/${weather}.png`;
        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');

    button.addEventListener('click', () => {
        checkWeather(searchInput.value);
    });
});