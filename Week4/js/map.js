// Global variables
let map;
let lat = 0;
let lon = 0;
let zl = 3;
let markers = L.featureGroup();

// path to csv data
let path = "data/casenumbers_apr24.csv";

// initialize
$( document ).ready(function() {
	createMap(lat,lon,zl);
	readCSV(path);
});

// create the map
function createMap(lat,lon,zl){
	map = L.map('map').setView([lat,lon], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){

    // circle options
        let circleOptions = {
            radius: 3,
            weight: 1,
            color: 'white',
            fillColor: 'dodgerblue',
            fillOpacity: 1
        }
    
        // loop through each entry, skipping null entries
        data.data.forEach(function(item,index){
            if(typeof item.lat !== 'undefined' && typeof item.lng !== 'undefined'){
                // create a marker
                let marker = L.circleMarker([item.lat,item.lng],circleOptions)
                .on('mouseover',function(){
                    this.bindPopup(`${item.city_state}<br>Number of hate crimes: ${item.count_crimes}`).openPopup()
                })
        
                // add marker to featuregroup
                markers.addLayer(marker)

                // add data to sidebar with onclick event
                $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.city_state}</div>`)

         }
        })
    
        // add featuregroup to map
        markers.addTo(map)

    }
// function to fly to a location by a given id number
function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lng],12)
}

// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map)

// function to fly to a location by a given id number
function flyByIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)

	// open the popup
	myMarkers.getLayers()[index].openPopup()
}