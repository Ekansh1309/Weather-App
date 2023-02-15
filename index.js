setInterval(clock,1000);

function clock() {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let a= new Date()

    let weekd = weekday[a.getDay()];
    let mont = month[a.getMonth()];
    let h= a.getHours()
    let m= a.getMinutes()
    let s= a.getSeconds()
    let day= a.getDate()
    
    if(s<10){
        s='0'+s
    }
    if(m<10){
        m='0'+m
    }
    if(h<10){
        h='0'+h
    }

    hour.innerHTML=`${h}  :`
    min.innerHTML=`${m}  :`
    sec.innerHTML=`${s}`

    week.innerHTML=`${weekd}, `
    dt.innerHTML=`${day} `
    mon.innerHTML=`${mont}`
}


const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
let form= document.querySelector("form")
let weather= document.querySelector("#weather")
let search= document.querySelector("#sear")

    form.addEventListener("submit",(event)=>{
        getWeather(search.value)
        event.preventDefault()
    })

    async function getWeather(city){
        weather.innerHTML="Loading.... Please Wait"
        let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        let data=await response.json()
        return showWeather(data)
    }

    function showWeather(data){
       if(data.cod=="404"){
        weather.innerHTML=`<h4>City not found</h4>`
        covertab.classList.add("disp")
        return;
       }
       covertab.classList.remove("disp")
       const sunriseTimestamp = parseInt(`${data.sys.sunrise}`)
       const sunsetTimestamp = parseInt(`${data.sys.sunset}`)
       const timezoneOffsetSeconds = parseInt(`${data.timezone}`)+ 6 * 60 * 60 + 30 * 60;

       const sunriseLocalTime = sunriseTimestamp + timezoneOffsetSeconds;
       const sunsetLocalTime = sunsetTimestamp + timezoneOffsetSeconds;

       const sunriseTime = new Date(sunriseLocalTime * 1000).toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata'});
       const sunsetTime = new Date(sunsetLocalTime * 1000).toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata'});


        let d1= sunriseTime.toString()
        let [time1,modifier1]=d1.split(" ")
        let unit1;
        if(modifier1="pm"){
            unit1="am"
        }
        else if(modifier1="am"){
            unit1="pm"
        }

        let d2= sunsetTime.toString()
        let [time2,modifier2]=d2.split(" ")
        let unit2;
        if(modifier2="am"){
            unit2="pm"
        }
        else if(modifier2="pm"){
            unit2="am"
        }

        weather.innerHTML= `
        <span id="weather-image" >
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </span>
        <span id="detail">
            <h2 class="temp">${data.main.temp} °C</h2>
            <h4>${data.weather[0].main}</h4>
        </span>
        `       

        covertab.innerHTML=`
        <table class="table table-hover">
          <tbody>
          <tr class="tablelines">
            <th scope="row">Latitude</th>
            <td>${data.coord.lat}°N</td>
          </tr>
            <tr class="tablelines">
              <th scope="row">Longitude</th>
              <td>${data.coord.lon}°E</td>
            </tr>
            <tr class="tablelines">
              <th scope="row">Pressure</th>
              <td colspan="2">${data.main.pressure *  0.750}mmHg</td>
            </tr>
            <tr class="tablelines">
              <th scope="row">Feels Like</th>
              <td colspan="2">${data.main.feels_like}°C</td>
            </tr>
            <tr class="tablelines">
              <th scope="row">Sunrise</th>
              <td colspan="2">${time1 +" "+ unit1}</td>
            </tr>
            <tr class="tablelines">
              <th scope="row">Sunset</th>
              <td colspan="2">${time2+ " "+unit2}</td>
            </tr>
            <tr class="tablelines">
              <th scope="row">Wind</th>
              <td colspan="2">${data.wind.speed+"m/s | "+data.wind.deg+"° from N"}</td>
            </tr>
            
          </tbody>
        </table>
        `
    }


