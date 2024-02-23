//all var wee need
const container = document.querySelector(".container");
const search = document.querySelector(".bx-search");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const eror404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
function searchWeather(){
    const apiKey = '72c856d4dcdd7185522b18f943f2ba1c';
    const city = document.querySelector(".city-name").value;
    if(city == '')
    return
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(json => {
        //condition for not found
        if(json.cod == '404'){
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            eror404.classList.add('active');
            cityHide.style.display = "none";
            return;
        }
        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");
        if(cityHide.textContent == city){
            return;
        }else{
            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            cityHide.style.display = "block";
            eror404.classList.remove('active');
            //conditions for image show
            switch (json.weather[0].main) {
                    case 'Clear':
                    image.src = 'img/clear.png';
                    break;
                    case 'Rain':
                        image.src = 'img/rain.png';
                    break;
                    case 'Snow':
                        image.src = 'img/snow.png';
                    break;
                    case 'Clouds':
                        image.src = 'img/cloud.png';
                    break;
                    case 'Mist':
                        image.src = 'img/wind.png';
                    break;
                    case 'Haze':
                        image.src = 'img/wind.png';
                    break;
                default:
                    image.src = 'img/cloud.png';
            }
            // Map of translations for weather descriptions (in Persian)
            const translations = {
              'clear sky': 'آسمان صاف',
              'few clouds': 'تا حدودی ابری',
              'scattered clouds': 'ابرهای پراکنده',
              'broken clouds': 'ابرهای شکسته',
              'overcast clouds': 'ابرهای تیره',
              'shower rain': 'باران رگباری',
              'rain': 'باران',
              'thunderstorm': 'رعد و برق',
              'snow': 'برف',
              'light snow': 'برف سبک',
              'mist': 'مه',
              'haze': 'گرد و غبار',
              'moderate rain' : 'باران ملایم',
              'light rain' : 'باران سبک',
            };
            //weather description
            const weatherDescription = json.weather[0].description.toLowerCase();
            // Check if the weather description exists in the translations
            if (translations[weatherDescription]) {
              // Translate the weather description
              json.weather[0].description = translations[weatherDescription];
            } else {
              // Use the original weather description if no translation is available
              json.weather[0].description = weatherDescription;
            }
            //weather deatail catch
            temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity} %`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
        }
        console.log(json)
    })
}
search.addEventListener('click' , searchWeather());
document.querySelector(".city-name").addEventListener('keydown' , (event)=>{
    if(event.key === 'Enter'){
        searchWeather();
    }
});
