const city = 'Toronto'
const state = 'ON'
const country = 'Canada'

const api_key = '98d68f0f1edc40509a3d70094122d945'

const url = `https://api.geoapify.com/v1/geocode/search?apiKey=${api_key}&city=${city}&state=${state}&country=${country}`;

d3.json(url).then(function(data) {
    // ----------------
    // geoapify calls
    // ----------------
    const long = data.features[0].properties.lon
    const lat = data.features[0].properties.lat
    const popularity = data.features[0].properties.rank.popularity
    console.log(`Longitude is ${long}`)
    console.log(`Latitude is ${lat}`)
    console.log(`Popularity is ${popularity}`);
    
    // -------------
    // LAYERS
    // -------------
    const street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    const water = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
        attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    });

    const baseMaps = {
        "Watercolor Map": water,
        "Street Map": street
      };

    const overlayMaps  = {
        "City Population": city,
        "State Population": state
    }

    // -------------
    // CREATE THE MAP
    // -------------
    let myMap = L.map("map", {
        center: [lat, long], 
        zoom: 3,
        layers: [water]
    })

    // -------------
    // MARKERS
    // -------------
    let marker = L.marker([lat, long],{
        draggable: true,
        title: "NY marker"
      }).addTo(myMap)
      
      let circle = L.circle([lat, long], {
          fillOpacity: 0.75,
          color: "black",
          fillColor: "white",
          radius: popularity * 500
      }).bindPopup(`<h1>${city}</h1> <hr> <h3>Popularity: ${popularity}</h3>`).addTo(myMap);
  
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    });

    L.control.layers(baseMaps).addTo(myMap);
});