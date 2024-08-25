const searchEl = document.querySelector('#search');
const searchIconEl = document.querySelector('#search-icon');
const weatherImg = document.querySelector('#weather');
const locationEl = document.querySelector('.location');
const mainDeg = document.querySelector('.main-deg');
const about = document.querySelector('.about');
const average = document.querySelector('.average');

let API = {
   key: '206e23a155d46629728e64fc61fbf4b0',
   link: 'https://api.openweathermap.org/data/2.5/'
};

async function sendRequest(city){
   try{
      let req = await fetch(`${API.link}weather?q=${city}&appid=${API.key}&units=metric`);
      let data = await req.json();
      GetData(data);
   }catch(error){
      locationEl.textContent = error.message;
   }
};
function GetData(weather){
   console.log(weather);
   locationEl.textContent = `${weather.name}, ${weather.sys.country}`;
   mainDeg.textContent = `${Math.round(weather.main.temp)} ˚C`;
   about.textContent = weather.weather[0].main;
   average.textContent = `Min ˚C ${Math.round(weather.main.temp_min)}/Max ˚C ${Math.round(weather.main.temp_max)}`;
   weatherImg.scr = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
};
searchIconEl.addEventListener('click', ()=>{
   let cityValue = searchEl.value;
   sendRequest(cityValue);
});
