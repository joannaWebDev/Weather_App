// Go to this URL and register https://openweathermap.org/appid
// Get your API KEY (appid)  : 9171d489fca6eb9a131ed77fdfc3955f
//navigator.geolocation.getCurrentPosition((data) => console.log(data));

const APIkey = '9171d489fca6eb9a131ed77fdfc3955f';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
//? lo que sigue en adelante son parámetros


const onSuccess = (position) => {
    //console.log('from onSuccess', position);

    const { 
        coords: {latitude, longitude}
    } = position;
    //console.log(latitude, longitude);
    callWeather(latitude, longitude);
};

const onError = (error) => {
    //console.error(error.message);
    const notification = document.createElement('p');
    notification.innerText = error.message;

    const divNotification = document.getElementsByClassName('notification')[0];
    divNotification.appendChild(notification);
    divNotification.style.display = 'block';
}

const convertKelvinToCelsius = kelvin => Math.round(kelvin - 273.15);

const getTimeString = function(input, separator) {
    const pad = function(input) {return input < 10 ? "0" + input : input;};
    const date = input ? new Date(input) : new Date();
    return [
        pad(date.getHours()),
        pad(date.getMinutes())
    ].join(typeof separator !== 'undefined' ?  separator : ':' );
} 

const showWeatherInfo = info => {
    const  { 
        main: {temp, temp_max, temp_min},
        name,
        sys: {country},
        weather: [{description, icon}] 
    } = info; 

    const iconElement = document.getElementById('icon');
    iconElement.src = `icons/${icon}.png`;

    const pTemp = document.getElementById('temp');
    pTemp.innerText = `${convertKelvinToCelsius(temp)}º`;
    /*pendiente cambiar fondo
    console.log(pTemp);
    const integer = parseInt(pTemp, 10);
    console.log(integer);

    if (integer < 8) {
        console.log('cold')
    } else {
        console.log('rain');
    }
*/
    const maxMin = document.getElementById('maxMin');
    maxMin.innerText = `${convertKelvinToCelsius(temp_max)}/${convertKelvinToCelsius(temp_min)} `

    const pDescript = document.getElementById('description');
    pDescript.innerText = `${description}`;

    const paragraphLocation = document.getElementById('parLocat');
    paragraphLocation.innerText =`${name}, ${country}`;

    const paragraphHour = document.getElementById('hour');
    paragraphHour.innerText = getTimeString();

    
    console.log(`'RESULT:', ${icon}, ${convertKelvinToCelsius(temp)}, ${description}, ${name}, ${country} 
    ${paragraphHour} ${convertKelvinToCelsius(temp_max)}/${convertKelvinToCelsius(temp_min)}`);
    //[object HTMLParagraphElement]
    
};

const callWeather = (latitude, longitude) => {
    const call = fetch(`${baseURL}lat=${latitude}&lon=${longitude}&appid=${APIkey}`);
    call.then(response => response.json()).then(weatherInfo => showWeatherInfo(weatherInfo));
    call.catch(error => console.log(error));

};
navigator.geolocation.getCurrentPosition(onSuccess, onError);
//fetch(URL).then(onSuccess(), onError())



