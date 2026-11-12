const container = document.querySelector('.container');
const Search = document.querySelector('.search_box button');
const weather_box = document.querySelector('.weather_box');
const weatherDetais = document.querySelector('.weather_details');
const error404 = document.querySelector('.not_found');
const cityHide = document.querySelector('.city_hide');


Search.addEventListener('click', () => {

    const APIKey = '68600db960de751a219b18ac50e1bf0a';
    // const APIKey = '253e65fec93ec1ccfe265f5cb01f4fcf';
    const city = document.querySelector('.search_box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.code == '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weather_box.classList.remove('active');
            weatherDetais.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather_box img');
        const temprature = document.querySelector('.weather_box .temprature');
        const description = document.querySelector('.weather_box .description');
        const humidity = document.querySelector('.weather_details .humidity span');
        const wind = document.querySelector('.weather_details .wind span');

        if (cityHide.textContent == city) {
            return;
        }
        else {
            cityHide.textContent = city;

            container.style.height = '555px';
            container.classList.add('active');
            weather_box.classList.add('active');
            weatherDetais.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';    
                    break;
                
                case 'Rain':
                    image.src = 'images/rain.png';    
                    break;
                
                case 'Snow':
                    image.src = 'images/snow.png';    
                    break;
    
                case 'Clouds':
                    image.src = 'images/cloud.png'; 
                    break;
    
                case 'Mist':
                    image.src = 'images/mist.png';    
                    break;
    
                default:
                    image.src = 'images/mist.png';
            }
    
            temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            const infoWeather = document.querySelector('.info_weather');
            const infoHumidity = document.querySelector('.info_humidity');
            const infoWind = document.querySelector('.info_wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info_weather';
            elCloneInfoWeather.id.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info_humidity';
            elCloneInfoHumidity.id.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info_wind';
            elCloneInfoWind.id.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            const cloneInfoWeather = document.querySelector('.info_weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelector('.info_humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelector('.info_wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0) {

                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }

        }

    })

    .catch(error => {
        // Handle network errors or other unexpected issues
        errorMessage.textContent = 'An error occurred while fetching weather data.';
        console.error('Error:', error);

    });
});
