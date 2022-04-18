// let's create some data

let data = [
    {
        'id': 0,
        'title':'Taipei',
        'lat': 25.0330,
        'lon': 121.5654,
        'description': "My motherland! I lived here for 7 months last school year during remote learning and had a blast - minus the part where I had to wake up at 4 in the morning to take my midterms and finals.",
        'image' : 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Tower_of_Taipei_101.jpg'
    },
    {
        'id': 1,
        'title':'Vancouver',
        'lat': 49.2827,
        'lon': -123.1207,
        'description': 'Since I used to live in Seattle, my family would often take weekend roadtrips up to Vancouver. Over the years, we got to see many different sights, one of the most memorable being riding a gondola to the top of a snowy mountain!',
        'image' : 'https://604now.com/wp-content/uploads/2018/12/vancouver-mountains-snow.jpg'
    
    },
    {
        'id': 2,
        'title':'Hong Kong',
        'lat': 22.3186,
        'lon': 114.1796,
        'description': 'I got to visit Hong Kong around Christmas in 2017; I was really surprised by how many people there were, despite being used to the crowdedness of Asian countries. Regardless, I had a great time exploring Tsim Sha Tsui and enjoying local delicacies.',
        'image' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tsim_Sha_Tsui_Overview_2018.jpg/300px-Tsim_Sha_Tsui_Overview_2018.jpg'
    },
    {
        'id': 3,
        'title':'Tokyo',
        'lat': 35.6762,
        'lon': 139.6503,
        'description': 'Our family vacation in Winter 2019 led us to Tokyo - our last trip before the pandemic. We stayed in Ueno and got to visit the more touristy areas of Tokyo - I would love to come again and explore more areas.',
        'image' : 'https://lp-cms-production.imgix.net/2021-02/Tokyo%20Main.jpg'
    },
    {
        'id': 4,
        'title':'Seattle',
        'lat': 47.6062,
        'lon': -122.3321,
        'description': "I actually grew up in Seattle and lived here for 9 years! I would love to live here again in the future, if my career leads me back.",
        'image' : 'https://i.natgeofe.com/n/0652a07e-42ed-4f3d-b2ea-0538de0c5ba3/seattle-travel_3x2.jpg'
    }
]

let map = L.map('map').setView([0,0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();

// loop through data
data.forEach(function(item){
	// create marker
	let marker = L.marker([item.lat,item.lon]).bindPopup('<b>' + item.title + '</b> <br>' + "<img class = '.pic' src='" + item.image + "' width='100' height='100'/>" + "<br>" + item.description)

	// add marker to featuregroup
	myMarkers.addLayer(marker)

	// add data to sidebar with onclick event
	$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)
})

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// function to fly to a location by a given id number
function flyToIndex(index){
	map.flyTo([data[index].lat,data[index].lon],12)
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

// make the map zoom to the extent of markers
map.fitBounds(myMarkers.getBounds());