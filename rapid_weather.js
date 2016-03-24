lat = ""
lon = ""
city = ""
temperature = ""
ftemp = 0
function convert() {
     
  var unit = $("#unit").text();
  if(unit === "FARENHEIT")
    {
      $("#temperature").text(ftemp+" Farenheit")
      $("#unit").text("CELCIUS");
   }
  else if(unit === "CELCIUS")
    {
      $("#temperature").text(temperature+" Celcius");
      $("#unit").text("FARENHEIT");
    }
}

$(document).ready(function() {
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    
    
  $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&sensor=true",function(json) {
    city =  JSON.stringify(json["results"][5].address_components[0].long_name);
  city = city.replace(/[^\w\s]/gi, '');
    $("#city").text(city);
   $("#latitude").text("Latitude: "+lat+" <---> "+"Longitude: "+lon);
    
$.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=4a87519db6e540f39c6651e9e9f89a8b", function(json) {
  temperature = JSON.stringify(json["main"].temp);
  temperature = temperature - 273;
  temperature = temperature.toFixed(1);
  ftemp = parseInt(temperature) * 1.8 + 32; 
  $("#temperature").text(temperature + " Celcius");

 
 var img = JSON.stringify(json["weather"][0].icon);
  
  
  var desired = img.replace(/[^\w\s]/gi, '');
  
  img = desired + ".png";
  
document.getElementById("icon").src="http://openweathermap.org/img/w/"+img;
 
});
 });
  
  });

  }
 
  
}); 










