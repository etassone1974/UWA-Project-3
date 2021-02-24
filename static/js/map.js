// Create a map object
var myMap = L.map("map-id", {
  center: [-23.698042, 133.880753],
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

// Cyclones data
//var cyclones = JSON.parse('cyclones_top.json');

// let link = ("../static/js/countries.geojson");

let url = ("../static/js/cyclones_top10.json");

// d3.json(link).then(function(data) {

//   L.geoJson(data).addTo(myMap);
// });

// function colorStyle(point){
//   // Conditionals for countries points
//   var color = "";
//   if (point > 200) {
//     color = "yellow";
//   }
//   else if (point > 100) {
//     color = "blue";
//   }
//   else if (point > 90) {
//     color = "green";
//   }
//   else {
//     color = "red";
//   }
//   return color;
// }

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



d3.json(url).then(function(data) {
  console.log(data);

  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < data.length; i++) {
  // Add circles to map
  console.log(data[i]["CENTRAL_PRES"]);
  lat_long = [data[i]["LAT"], data[i]["LON"]];
  L.circle(lat_long, {
    fillOpacity: 0.75,
    fillColor: 'blue',
    color: "white",
    // fillColor: colorStyle(cyclones['CENTRAL_PRES']),
    // Adjust radius
    radius: cycloneRadius(data[i]['CENTRAL_PRES'])

    }).bindPopup("<h1>" + data[i]["NAME"] + "</h1> <hr> <h3>Central Pressure: " + data[i]["CENTRAL_PRES"] + "</h3>").addTo(myMap).on('mouseover',function(ev) {
    ev.target.openPopup();
  })

};
//   for (var i = 0; i < cyclones.length; i++) {
//     // Add circles to map
//     L.circle(cyclones["LAT"], cyclones["LON"]), {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: colorStyle(cyclones['CENTRAL_PRES']),
//       // Adjust radius
//       radius: cyclones['CENTRAL_PRES']
//     }.bindPopup("<h1>" + cyclones[i].name + "</h1> <hr> <h3>Points: " + cyclones[i].points + "</h3>").addTo(myMap).on('mouseover',function(ev) {
//       ev.target.openPopup();
//     });

// };

// //d3.json('')
// // function for color
// function colorStyle(point){
//     // Conditionals for countries points
//     var color = "";
//     if (point > 200) {
//       color = "yellow";
//     }
//     else if (point > 100) {
//       color = "blue";
//     }
//     else if (point > 90) {
//       color = "green";
//     }
//     else {
//       color = "red";
//     }
//     return color;
// }
// });
// // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cyclones.length; i++) {
//   // Add circles to map
//   L.circle(cyclones["LAT"], cyclones["LON"]), {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: colorStyle(cyclones['CENTRAL_PRES']),
//     // Adjust radius
//     radius: cyclones['CENTRAL_PRES']
//   }.bindPopup("<h1>" + cyclones[i].name + "</h1> <hr> <h3>Points: " + cyclones[i].points + "</h3>").addTo(myMap).on('mouseover',function(ev) {
//     ev.target.openPopup();
//   });
});