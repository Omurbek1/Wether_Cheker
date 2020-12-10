const api = {
    key: "4f5837f4a14a0e5c6840df1a05fe1a9b",
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

const searbox = document.querySelector('.search-box')
searbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searbox.value)
        console.log(searbox.value)
    }
}

function getResult(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResult)
}
function displayResult(weather) {
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    let temp=document.querySelector('.current .temp')
    temp.innerHTML=`${Math.round(weather.main .temp)}<span>°C</span>`
    
    let weather_el=document.querySelector('.current .weather');
    weather_el.innerText  = weather.weather[0].main;

    let hilow=document.querySelector('.hi-low');
    hilow.innerText=`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}
function dateBuilder(d) {
    let months = ["January", "February", "March ", "April ",
        "May ", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()]
    let year=d.getFullYear();
    return `${day},${date},${month},${year}`

    

    
}