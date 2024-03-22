// Create a map object.
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// City markers
// let NY = L.marker([40.7128, -74.0059],{
//   draggable: true,
//   title: "NY marker"
// }).addTo(myMap)

// let LA = L.marker([34.0522, -118.2437],{
//   draggable: true,
//   title: "LA marker"
// }).addTo(myMap)

// let Houston = L.marker([29.7604, -95.3698],{
//   draggable: true,
//   title: "Houston marker"
// }).addTo(myMap)

// let Omaha = L.marker([41.2524, -95.9980],{
//   draggable: true,
//   title: "Omaha marker"
// }).addTo(myMap)

// let Chicago = L.marker([41.8781, -87.6298],{
//   draggable: true,
//   title: "Chicago marker"
// }).addTo(myMap)

const cities = [
  {
    name: "NY",
    location: [40.7128, -74.0059]
  },
  {
    name: "LA",
    location: [34.0522, -118.2437]
  }
];

for (let i = 0; i < cities.length; i++) {
  console.log(cities[i]);
}
// Add code to create a marker for each of the following cities and to add it to the map.

// newyork;
// chicago;
// houston;
// la;
// omaha;
