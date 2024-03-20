import data from './data.json' assert { type: 'json' };
console.log(data);

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

// data['data'].forEach(item => {
//     let lat = parseFloat(item[3]);
//     let lng = parseFloat(item[5]);
//     console.log(lat, lng)
//     L.circle([lat, lng], {
//         fillOpacity: 0.75,
//         radius: 10000
//       }).addTo(myMap);
// })

let lat = Object.values(data['lat'])
let lng = Object.values(data['lng'])


for (let i = 0; i < lat.length; i++){
    // console.log([lat[i], lng[i]])
    L.circle([lat[i], lng[i]], {
        fillOpacity: 0.75, 
        radius: 10000
    }).addTo(myMap);
}