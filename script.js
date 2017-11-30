var cel = 0, faren = 0;

function renderWeather(city) {
    $.ajax("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=061f24cf3cde2f60644a8240302983f2").done(function(data) {
      console.log(data.main["temp"]);
      console.log(data["name"]);
        document.getElementById("city").innerHTML = city;
        cel = data.main["temp"];
        faren = Math.round(cel * (9/5) + 32);
        icon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
        climate = data.weather[0].description;
        $("#icon").attr("src", icon);
        document.getElementById("temperature").innerHTML = cel + " ";
        document.getElementById("climate").innerHTML = climate;
        $('#error-info').hide();
        $('#weather-info').show();
    });
}

function displayLocalWeather()
{
  $.ajax("http://ipinfo.io/json").done(function(data) {
      renderWeather(data.city);
  });
}

$(document).ready(function(){
  displayLocalWeather();
  celcius = 1;
  $("#unit").on('click', function(){
    if(celcius == 1)
      {
      document.getElementById("temperature").innerHTML = faren + " ";
      document.getElementById("unit").innerHTML = "&#176;F"
      celcius = 0;
      }
    else
      {
        document.getElementById("temperature").innerHTML = cel + " ";
        document.getElementById("unit").innerHTML = "&#176;C"
        celcius = 1
      }
  });

  $('#search input').on('keyup', function(e) {
      if(e.which == 13 && $('#search input').val() != "")
      {
        renderWeather($('#search input').val(), "");
      }
  });

});
