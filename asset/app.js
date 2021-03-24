
$(document).ready(function () {

    var lat;
    var long;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
            
            const icon = document.querySelector('.icon');
            const temp = document.querySelector('.temperature');
            const desc = document.querySelector('.description');
            const capt = document.querySelector('.caption');

            let dingin = ['Fucking Freezing.', 'It\'s Fucking Freezing.', 'Use Your Fucking jacket.'];
            let hujan = ['It\'s Fucking Raining.', 'Raining Now.', 'It\'s Fucking Raining Now.'];
            let hangat = ['Fucking love is in the air.', 'Just Fucking Grey.', 'Fucking Warm.'];
            let winds = ['It\'s Fucking Raining.', 'Raining Now.', 'It\'s Fucking Raining Now.'];
            let snows = ['Fucking love is in the air.', 'Just Fucking Grey.', 'Fucking Warm.'];

            lat = position.coords.latitude;
            long = position.coords.longitude;

            var api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long + '';

            $.getJSON(api, function (res) {

                console.log(res)

                var celsius = res.main.temp;
                var farenheit = (celsius * 1.8) + 32;

                var itemDingin = dingin[Math.floor(Math.random() * dingin.length)];
                var itemHujan = hujan[Math.floor(Math.random() * hujan.length)];
                var itemHangat = hangat[Math.floor(Math.random() * hangat.length)];

                // var location = res.name;
                // CAPTION
                // if (capt){
                //     capt.textContent = res.weather[0].description
                // }
                capt.textContent = 'The weather condition now are '+ '"' + res.weather[0].description + '"';
                
                // $('.weather-location').html(location);
                temp.textContent = (Math.floor(celsius)) + '°C';
                
                if (res.weather[0].main == 'Rain'){
                    desc.textContent = itemHujan;
                }else if (res.weather[0].main == 'Clear-day'){
                    desc.textContent = itemHangat;
                }else if (res.weather[0].main == 'Clear-night'){
                    desc.textContent = itemHangat;
                }else if (res.weather[0].main == 'Partly-cloudy-day'){
                    desc.textContent = itemHangat;
                }else if (res.weather[0].main == 'Partly-cloudy-night'){
                    desc.textContent = itemDingin;
                }else if (res.weather[0].main == 'Clouds'){
                    desc.textContent = itemDingin;
                }else if (res.weather[0].main == 'Sleet'){
                    desc.textContent = itemHujan;
                }else if (res.weather[0].main == 'Snow'){
                    desc.textContent = itemDingin;
                }else if (res.weather[0].main == 'Wind'){
                    desc.textContent = itemDingin;
                }else if (res.weather[0].main == 'Fog'){
                    desc.textContent = itemDingin;
                }else if (celsius > 30){
                    desc.textContent = itemHangat;
                }
                //desc.textContent = `${itemDingin} $(res.weather[0].description)`;
                // desc.innerHTML(res.weather[0].description);
                $('.weatherType').attr('id', res.weather[0].main);
                $('.row2').on('click', function () {
                    if ($('.temperature').html() == (Math.floor(celsius))) {
                        $('.temperature').html(Math.floor(farenheit));
                        $('.temp-type').html('°F');

                    } else {
                        $('.temp').html(Math.floor(celsius));
                        $('.temp-type').html('°C');
                    }
                });


                //SETTING UP THE ICON 
                var icons = new Skycons({
                    "color": "white"
                });

                icons.set("Clear-day", Skycons.CLEAR_DAY);
                icons.set("Clear-night", Skycons.CLEAR_NIGHT);
                icons.set("Partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
                icons.set("Partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
                icons.set("Clouds", Skycons.CLOUDY);
                icons.set("Rain", Skycons.RAIN);
                icons.set("Sleet", Skycons.SLEET);
                icons.set("Snow", Skycons.SNOW);
                icons.set("Wind", Skycons.WIND);
                icons.set("Fog", Skycons.FOG);
                icons.play();

            });
        });
    }
});