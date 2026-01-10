document.addEventListener('DOMContentLoaded', function() {
    // les variables
    const input = document.getElementById('search-input');
    input.value = '';
    const btn_recherche = document.getElementById('search-button');

    // fonction pour obtenir les données météo
    async function obtenirMeteo(ville) {
        try {
            const apiKey = 'e6b9f83fd808842a8d0c24813c5e83db';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;
            
            const response = await fetch(url);
            const data = await response.json();
            // console.log(data);
            if(data.name === undefined) {
                alert('Ville non trouvée. Veuillez vérifier le nom et réessayer.');
                return;
            }
            const villelabel = data.name;
                const payslabel = data.sys.country;
                const temperaturelabel = data.main.temp;

                const humidite = data.main.humidity;
                // const vent = data.wind.speed;
                const description = data.weather[0].description;

                document.getElementById('ville').innerText = villelabel;
                document.getElementById('pays').innerText = payslabel;
                document.getElementById('temperature').innerText = `${temperaturelabel} °C`;


                document.getElementById('humidite').innerText = `Humidité: ${humidite}%`;
                // document.getElementById('vent').innerText = `Vent: ${vent} km/h`;
                document.getElementById('description').innerText = description;
                document.querySelector('#icone').src = `https://openweathermap.org/img/wn/${data.weather[0].icon }@2x.png`;
    


        } catch (error) {
            console.error('Erreur lors de la récupération des données météo:', error);
            const meteoInfo = document.getElementById('meteo-info');
            meteoInfo.innerHTML = '<p>Impossible de récupérer les données météo. Veuillez réessayer plus tard.</p>';
            
        }
    
       
    }

    btn_recherche.addEventListener('click', () => {
        const ville = input.value.trim();
        if (ville) {
            obtenirMeteo(ville);
            input.value = '';
        }

    });

    // Obtenir la météo pour une ville par défaut au chargement de la page
    obtenirMeteo('Lille');




});


