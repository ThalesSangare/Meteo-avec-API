/**
 * Comme vous pouvez le constater, nous avons plusieurs paramètres :

    q - pour spécifier la ville (ici la merveilleuse ville de Saint-Saulve)

    appid - pour spécifier votre clé secrète

    units - pour spécifier que nous voulons la température en Celsius
 */

let ville;

// ********* geolocaliser l'user ************************************
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    (position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      const url =
        "https://api.openweathermap.org/data/2.5/weather?lon=" +
        position.coords.longitude +
        "&lat=" +
        position.coords.latitude +
        "&appid=e6b9f83fd808842a8d0c24813c5e83db&units=metric";
      let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
      requete.open("GET", url); // Nous récupérons juste des données
      requete.responseType = "json"; // Nous attendons du JSON
      requete.send(); // Nous envoyons notre requête

      // Dès qu'on reçoit une réponse, cette fonction est executée
      requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
          if (requete.status === 200) {
            let reponse = requete.response;
            // console.log(reponse);
            let temperature = reponse.main.temp;
            let ville = reponse.name;
            // console.log(temperature);
            document.querySelector("#ville").textContent = ville;
            document.querySelector("#temperature_label").textContent =
              temperature;
          } else {
            alert("Un problème est intervenu, merci de revenir plus tard. ");
          }
        }
      };

      // en bas c'est si l'user n'autorise pas la localisation alors on affiche la meteo de paris par defaut
    },
    erreur,
    options
  );
} else {
  ville = "Paris";
  recupererMeteo(ville);
}

var options = {
  enableHighAccuracy: true,
};

//************************************************************************* */

let changerDeVille = document.querySelector("#changer");
changerDeVille.addEventListener("click", () => {
  ville = prompt("Quelle ville souhaitez-vous voir ?");
  recupererMeteo(ville);
});

function erreur() {
  ville = "Paris";
  recupererMeteo(ville);
}

function recupererMeteo(ville) {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    ville +
    "&appid=e6b9f83fd808842a8d0c24813c5e83db&units=metric";

  let requete = new XMLHttpRequest();
  requete.open("GET", url);
  requete.responseType = "json";
  requete.send();

  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        document.querySelector("#ville").textContent = ville;
        document.querySelector("#temperature_label").textContent = temperature;
      } else {
        alert("Un problème est intervenu, merci de revenir plus tard. ");
      }
    }
  };
}
