var doc = $(document.body);

doc.ready(function(){
    var citiesContainer =  $('.search-city');
    var cityForm = $("<form>");
    var inputID = ['City', 'State', 'Country'];
    var recentCities = [];
    var searchBtn = $('<button class="searchBtn" type="submit" value="Search City">').text("search");

    for(var i= 0; i < inputID.length; i++){
        var searchLabel = $('<label>').attr('for', inputID[i]);
        var citySearch = $('<input type="text" class="form-row">').attr('ID', inputID[i]);




        cityForm.append(searchLabel.text('Enter' + inputID[i]));
        cityForm.append(citySearch.attr('placeholder', inputID[i]));
    }
    cityForm.append(searchBtn);
    citiesContainer.append(cityForm);

    var placehlderCity = ["San Antonio","San Jose","Guadalajara","Merced","Orlando","Los Angeles","New York","Toronto","Athens","Amman",]
    for (var i= 0; i < placehlderCity.length; i++){
        var divBtn = $('<div>');
        var recentBtn = $('<button class= "btn-group-verticle recent-ycit">').text(placehlderCity[i]);
        //add text to btns
        //recentBtn.text(recentCities);
        //append to citiesContainer
        divBtn.append(recentBtn);
        citiesContainer.append(divBtn);

    }
    console.log(moment().add(5, 'days').format('L'));
    //AJAX use API to grab object
    searchBtn.click(function (event){
        event.preventDefault();
    var countryCode =$('#Country').val();
    var state = $('#State').val();
    var cityName = $('#City').val();
    getWeather(cityName, state, countryCode)
    })
    $('button').click(function(){
        var cityName = $(this).text();
        getWeather(cityName);
    })
    function getWeather(cityName, state, countryCode){
        clearDiv($('.data'));
        clearDiv($('.card'))
        var apiKey = 'df0e01f285f6a874563f44ed80d18e14';
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + state + "," + countryCode + "&appid=" + apiKey;
        var dataDiv = $("<div class='data'>");
        var todayForcast = $(".today-forcast");
        var weatherData = ['Temperature', 'Humidity', 'WindSpeed', 'Description'];


        for (var i = 0; i < weatherData.length; i++){
            var weatherP = $('<p>').attr("ID", weatherData[i]).text(weatherData[i] + ": ");
         dataDiv.append(weatherP);
         }
        todayForcast.append(dataDiv);



        $.ajax({
            url: queryURL,
            methos: 'GET'
        }).then(function(response){
            console.log(response)
            var responlist = response.list[1];
            var iconCode = responlist.weather[0].icon
            var iconurl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            var fiveDays = [moment().add(1, 'days').format('L'), moment().add(2, 'days').format('L'), moment().add(3, 'days').format('L'), moment().add(4, 'days').format('L'), moment().add(5, 'days').format('L')];

            $('#currentDate').html(response.city.name +" (" + moment().format('L') + ") " + "<img class='icon'>");
            $('.icon').attr('src', iconurl);
            $("#Temperature").append(kelvinToFahrenheit(responlist.main.temp));
            $("#Humidity").append(responlist.main.humidity);
            $("#WindSpeed").text("wind Speed: " + responlist.wind.speed);
            $("#Description").text(responlist.weather[0].description.toUpperCase());

            for (var j = 1; j <= fiveDays.length; j++){
                var fiveDiv = $('<div class="card text-white bg-primary mb-3 col-sm">')
                var cardBody = $('<div class="card-body">');
                var cardTitle = $('<h5 class="card-title text-center">').text(fiveDays[j - 1]);
                var responlist = response.list[j * 8 - 1];
                console.log(j * 8 - 1)
                var iconCodes = responlist.weather[0].icon;
                var iconurls = "http://openweathermap.org/img/wn/" + iconCodes + "@2x.png";

                var cardImg = $('<img>').attr('src', iconurls);
                var cardText = $('<div class="card-text">');
                var tempP = $('<p class="cardTemp">').text("Temperature: " + kelvinToFahrenheit(responlist.main.temp));
                var humidP = $('<p class="cardHumid">').text("Humidity: " + responlist.main.humidity);

                fiveDiv.append(cardBody).append(cardTitle).append(cardImg).append(cardText).append(tempP).append(humidP);


                $('.forcast-row').append(fiveDiv);


            }

        })
    }
    function kelvinToFahrenheit(K){
        var temp = Math.floor((K - 273.15) * 9/5 + 32);
       temp += String.fromCharCode(176) + 'F';
       return temp;
    }
    function clearDiv(div){
        div.remove()
    }

})
