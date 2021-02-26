// Create a map object
var myMap = L.map("map-id", {
  center: [-27.546690, 135.446730],
  zoom: 5
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);

let url = ("../static/js/cyclones_top10.json");


function cycloneRadius(pressure) {
  let radius = 1010;
  if (pressure < 906) {
    radius = pressure *100;
  }
  else if (pressure < 911){
    radius = pressure*90;
  } 
  else if (pressure < 916){
    radius = pressure*80;
  } 
  else if (pressure < 921){
    radius = pressure*70;
  } 
  else if (pressure < 926){
    radius = pressure*60;
  } 
  else {
    radius = pressure*50;
  }
  return radius;
}

function circleColor(pressure){
  let color = "";
  if (pressure < 906){
    fillColor = "red";
  }
  else if (pressure < 916){
    fillColor = "orange";
  }
  else if (pressure < 921){
    fillColor = "magenta";
  }
  else if (pressure < 925){
    fillColor = "purple";
  }
  else {
    fillColor = "yellow";
  }
  return fillColor;
}


d3.json(url).then(function(data) {
  console.log(data);

  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < data.length; i++) {
  // Add circles to map
  console.log(data[i]["CENTRAL_PRES"]);
  lat_long = [data[i]["LAT"], data[i]["LON"]];
  L.circle(lat_long, {
    fillOpacity: 0.75,
    fillColor: circleColor(data[i]['CENTRAL_PRES']),
    // color: "white",
    // fillColor: colorStyle(cyclones['CENTRAL_PRES']),
    // Adjust radius
    radius: cycloneRadius(data[i]['CENTRAL_PRES'])

    }).bindPopup("<h3>" + data[i]["NAME"] + "</h3> <hr><h4>Central Pressure: " + data[i]["CENTRAL_PRES"]+" HPA"+ "</h4> \
    <h4>Max Wind Speed: " + data[i]["MAX_WIND_SPD"]+" m/s" + "</h4>\
    <h4>Wind Compass: " + data[i]["WIND_COMPASS"]+ "</h4><h4>Central Index: " + data[i]["CENTRAL_INDEX (CI)"]+ "</h4>").addTo(myMap).on('mouseover',function(ev) {
    ev.target.openPopup();
  })

};
});