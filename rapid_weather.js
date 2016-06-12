$(document).ready(function(){
  celcius = 1;
  $("#temperature").click(function(){
    if(celcius == 1)
      {
      document.getElementById("temperature").innerHTML = faren + " &#176;F";
        celcius = 0;
      }
    else
      {
        document.getElementById("temperature").innerHTML = temp + " &#176;C";
        celcius = 1
      }

  });
  $.getJSON("http://ipinfo.io/json").success(function(data) {
    city = data.city;
    country = data.country;
    document.getElementById("city").innerHTML = city + ', ' + country;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=061f24cf3cde2f60644a8240302983f2").success(function(data) {
      temp = data.main["temp"];
      faren = Math.round(temp * (9/5) + 32);
      //alert(faren)
      icon = "http://openweathermap.org/img/w/"+data.weather[0].icon+".png";
      climate = data.weather[0].description;
      $("#icon").attr("src", icon);
      document.getElementById("temperature").innerHTML = temp + " &#176;C";
      document.getElementById("climate").innerHTML = climate;
    });
  });
});
