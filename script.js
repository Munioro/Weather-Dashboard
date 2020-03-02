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

    var placehlderCity = ["San Antonio","San Jose","Guadalajara","Merced","Olrando","Los Angeles","New York","Toronto","Athens","Aman",]
    for (var i= 0; i < placehlderCity.length; i++){
        var divBtn = $('<div>');
        var recentBtn = $('<button class= "btn-group-verticle recent-ycit">').text(placehlderCity[i]);
        //add text to btns
        //recentBtn.text(recentCities);
        //append to citiesContainer
        divBtn.append(recentBtn);
        citiesContainer.append(divBtn);

    }

    //AJAX use API to grab object
    searchBtn.click(function(event){
        event.preventDefault();
        clearDiv($('.data'));
    var countryCode =$('#Country').val();
    var state = $('#State').val();
    var cityName = $('#City').val();
    var apiKey = 'df0e01f285f6a874563f44ed80d18e14';
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + state + "," + countryCode + "&appid=" + apiKey;
    var dataDiv = $("<div class='data'>");
    var forcastDiv = $(".forcast");
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

        $('#currentDate').text(response.city.name +" (" + moment().format('L') + ")");
        var responlist = response.list[0];
        $("#Temperature").append(kelvinToFahrenheit(responlist.main.temp));
        $("#Humidity").append(responlist.main.humidity);
        $("#WindSpeed").text("wind Speed: " + responlist.wind.speed);
        $("#Description").text(responlist.weather[0].description.toUpperCase());
        console.log(response)
    })
    })
    function kelvinToFahrenheit(K){
        var temp = String.fromCharCode(176)
       temp += Math.floor((K - 273.15) * 9/5 + 32)
       return temp
    }
    function clearDiv(div){
        div.remove()
    }
})