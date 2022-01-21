import tabOrdo from "./gestionTemps.js";

const APIKEY = "99d84039978381afbe9d65587736319a";
const PARAM = "minutely&units=metric&lang=fr"
let apiData;

let temps = document.querySelector(".temps");
let temperature = document.querySelector(".temperature");
let localisation = document.querySelector(".localisation");
let heurePrevNom = document.querySelectorAll(".heure-nom-prevision");
let heurePrevValeur = document.querySelectorAll(".heure-prevision-valeur");
let jourPrevNom = document.querySelectorAll(".jour-prevision-nom");
let jourPrevValeur = document.querySelectorAll(".jour-prevision-temp");
let icone = document.querySelector(".logo-meteo");
let chargement = document.querySelector(".overlay-icone-chargement");

function callApi(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${PARAM}&appid=${APIKEY}`)
        .then((response) => {
            return response.json()
        } )
        .then((data) => {
            
            apiData = data;
            temps.innerText = apiData.current.weather[0].description;
            temperature.innerText = Math.trunc(apiData.current.temp ) + "°C";
            localisation.innerText = apiData.timezone;
            let now = new Date().getHours();
            
            for (let i = 0; i < heurePrevNom.length ; i++){
                let increment  = now  + i * 3;
                
                if (increment === 24){
                    heurePrevNom[i].innerText =  '00' + " " +  "h"
                } else if ( increment > 24){
                    heurePrevNom[i].innerText = ( increment  - 24 ) + " " +  "h"     
                } else {
                    heurePrevNom[i].innerText =  increment + " " +  "h"
                }
            }
            
            for (let j =0; j < heurePrevValeur.length; j++){
                heurePrevValeur[j].innerText =Math.trunc( apiData.hourly[j * 3].temp) + "°"
            }
            
            for (let k = 0; k < tabOrdo.length; k++) {
                jourPrevNom[k].innerText = tabOrdo[k].slice(0, 3);
                jourPrevValeur[k].innerHTML = Math.trunc(apiData.daily[k].temp.day )+ "°"
            }
            console.log(now)
if (now < 6 ||now > 22) {
    icone.src = "ressources/nuit/" +  apiData.current.weather[0].icon + ".svg";
} else {
    icone.src = "ressources/jour/" +  apiData.current.weather[0].icon + ".svg";
}
        })
    chargement.classList.add("disparition");
}

navigator.geolocation.getCurrentPosition( (position) => {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
         callApi(long, lat)

}, () => {
alert("Impossible de vous indiquer la météo près de chez vous, vous avez refusé la géolocalisation !")
}
);


