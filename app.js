const searchEl = document.getElementById('search')
const searchIconEl = document.getElementById('search-icon')
const weatherImg = document.getElementById('weather')
const locationEL = document.querySelector('.location')
const mainDeg = document.querySelector('.main-deg')
const about = document.querySelector('.about')
const average = document.querySelector('.average')

let API = {
   key: '74f0d323f96b0bf1ef265876ce7affbb',
   link: 'https://api.openweathermap.org/data/2.5/'
}

async function sendRequest(city){
   try {
      let req = await fetch(`${API.link}weather?q=${city}&appid=${API.key}&units=metric`)
      let data = await req.json()
      if(!req.ok) throw new Error(req.statusText)
      GetData(data)
   } catch (error) {
      locationEL.textContent = error.message;
   }
}


function GetData(weather){
   console.log(weather);
   locationEL.textContent = `${weather.name}, ${weather.sys.country}`
   mainDeg.textContent = `${Math.round(weather.main.temp)} ˚c`
   about.textContent = weather.weather[0].main
   average.textContent = `Min ˚c${Math.round(weather.main.temp_min)} / Max ˚c${Math.round(weather.main.temp_max)}`
   weatherImg.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
}
searchIconEl.addEventListener('click', ()=>{
   let cityValue = searchEl.value
   sendRequest(cityValue)
})

