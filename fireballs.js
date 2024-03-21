import data from './data.json' assert { type: 'json' };
console.log(data);

let myMap = L.map("map", {
    center: [0, 0],
    zoom: 2
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

let lat = Object.values(data['lat'])
let lng = Object.values(data['lng'])
let energy = Object.values(data['energy'])


for (let i = 0; i < lat.length; i++){

    let color = "";
    if (energy[i] > 300) {
      color = "red";
    }
    else if (energy[i] > 200) {
      color = "orange";
    }
    else if (energy[i] > 10) {
      color = "yellow";
    }
    else {
      color = "blue";
    }
    // console.log([lat[i], lng[i]])
    L.circle([lat[i], lng[i]], {
        fillOpacity: 0.75, 
        radius: Math.log(energy[i]) * 30000,
        fillColor: color
    }).addTo(myMap);
}