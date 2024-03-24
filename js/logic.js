// import data from './data.json' assert { type: 'json' };
// console.log(data);

url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

fetch('./data/data.json')
  .then(res => res.json())
  .then(data => {

    // Add tile layers.
    const standard = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const water = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg', {
      attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    });

    const toner = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    });

    let myMap = L.map("map", {
      center: [21.3, 49.3],
      zoom: 3,
      layers: [toner]
    });

    const baseMaps = {
      "Standard Map": standard,
      "Watercolor Map": water,
      "Toner": toner
    };

  //   const overlayMaps  = {
  //     "Asteroids": city,
  //     "Earthquakes": state
  // }


    let lat = Object.values(data['lat'])
    let lng = Object.values(data['lng'])
    let energy = Object.values(data['energy'])
    let date = Object.values(data['date'])

    for (let i = 0; i < lat.length; i++) {

      let color = "";
      if (energy[i] > 200) {
        color = "#ff0000";
      }
      else if (energy[i] > 80) {
        color = "#ff6347";
      }
      else if (energy[i] > 40) {
        color = "#ffa500";
      }
      else if (energy[i] > 20) {
        color = "#ffff00";
      }
      else if (energy[i] > 10) {
        color = "#7fff00";
      }
      else {
        color = "#008000";
      }

      L.circle([lat[i], lng[i]], {
        fillOpacity: 0.75,
        radius: (Math.log(energy[i]) / Math.log(10)) * 100000,
        fillColor: color,
        color: "white",
        weight: 1
      }).bindPopup(`<b> Energy: </b> ${energy[i]}, kt <br> <b> Coords: </b> [${lat[i]}°, ${[lng[i]]}°] <hr>  ${date[i]}`).addTo(myMap);
    }

    L.control.layers(baseMaps).addTo(myMap);

    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let colors = ['#ff0000', '#ff6347', '#ffa500', '#ffff00', '#7fff00','#008000']
      let magnitude = ['>200', '80-200', '40-80', '20-40', '10-20', '<10'];
      let legendInfo = "<h2> Meteorite energy (kt) </h2>"
      div.innerHTML = legendInfo;

      for (var i = 0; i < colors.length; i++) {
        div.innerHTML += '<i style = "background-color:' + colors[i] + '"></i> ' + magnitude[i] + '<br>';
      }

      return div;
    };

    legend.addTo(myMap);
  })