document.addEventListener('DOMContentLoaded', function() {
    // les variables
    const input = document.getElementById('search-input');
    const btn_recherche = document.getElementById('search-button');

    let ville = '';
    let villelabel = document.getElementById('ville');
    let payslabel = document.getElementById('pays');
    let temperaturelabel = document.getElementById('temperature');
    const champs_recherche = document.getElementById('search-input');
    const bouton_recherche = document.getElementById('search-button');

    // fonction pour obtenir les données météo
    async function obtenirMeteo(ville) {
        try {
            const apiKey = 'votre Apikey';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;
            
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            if(!data.cod === 200) {
                alert('Ville non trouvée. Veuillez vérifier le nom et réessayer.');
                return;
            }
            const villelabel = data.name;
                const payslabel = data.sys.country;
                const temperaturelabel = data.main.temp;
                // const humidite = data.main.humidity;
                // const vent = data.wind.speed;
                // const description = data.weather[0].description;
                // const icone = data.weather[0].icon;
                document.getElementById('ville').innerText = villelabel;
                document.getElementById('pays').innerText = payslabel;
                document.getElementById('temperature').innerText = `${temperaturelabel} °C`;
                // document.getElementById('humidite').innerText = `Humidité: ${humidite}%`;
                // document.getElementById('vent').innerText = `Vent: ${vent} km/h`;
                // document.getElementById('description').innerText = description;
                // document.querySelector('#icone').src = `http://
    


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
        }

    });

    obtenirMeteo('Roubaix');



});


