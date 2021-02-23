//add the entire code to d3

d3.csv("/data/cyclones_top10.csv").then(function (data) {
    console.log(data);

var myMap = L.map("map-id", {
    center: [-23.6980, 133.8807],
    zoom: 5
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize(intensity) {
    return intensity;
  }
  
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < data.length; i++) {
    L.circle([data[i].LAT, data[i].LON], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize(data[i].CENTRAL_PRES)
    }).bindPopup("<h1>" + data[i].NAME + "</h1> <hr> <h3>Cyclones: " + data[i].CENTRAL_PRES + "</h3>").addTo(myMap);
  }
})