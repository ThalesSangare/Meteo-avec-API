document.addEventListener("DOMContentLoaded", function () {
  // les variables
  // const input = document.getElementById('search-input');
  const input = document.querySelector("input");
  input.value = "";
  const btn_recherche = document.getElementById("search-button");

  function afficherErreur(message) {
    const meteoinfo = document.getElementById("meteo-info");
    meteoinfo.innerHTML = `<p class="erreur">${message}</p>`;
  }

  // fonction pour obtenir les données météo
  async function obtenirMeteo(ville) {
    try {
      //====================================================
      // Remplacez 'votre Apikey' par votre clé API OpenWeatherMap
      //========================================================
      // const apiKey = 'votre Apikey';
      const apiKey = "e6b9f83fd808842a8d0c24813c5e83db";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`);
      }
      
      const data = await response.json();
      if (!data.main || !data.weather) {
            throw new Error("Données météo invalides");
        }

      const villelabel = data.name;
      const payslabel = data.sys.country;
      const temperaturelabel = data.main.temp;

      const humidite = data.main.humidity;
      // const vent = data.wind.speed;
      const description = data.weather[0].description;

      document.getElementById("ville").innerText = villelabel;
      document.getElementById("pays").innerText = payslabel;
      document.getElementById(
        "temperature"
      ).innerText = `${temperaturelabel} °C`;
      document.getElementById("humidite").innerText = `Humidité: ${humidite}%`;
      // document.getElementById('vent').innerText = `Vent: ${vent} km/h`;
      document.getElementById("description").innerText = description;
      document.querySelector(
        "#icone"
      ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
      console.error(error);
      afficherErreur("Impossible de récupérer les données météo. Veuillez réessayer plus tard");
    }
  }

  btn_recherche.addEventListener("click", () => {
    const ville = input.value.trim();
    if (ville === "") {
      alert("Veuillez entrer le nom d'une ville.");
      return;
    } else {
      obtenirMeteo(ville);
      input.value = "";
    }
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btn_recherche.click();
  });

  // Obtenir la météo pour une ville par défaut au chargement de la page
  obtenirMeteo("Lille");
});
