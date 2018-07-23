// Initialize and add the map
var button = document.querySelector("#mainButton");
var wrapper = document.querySelector("#wrapper");
// var input = document.querySelector("#input");
var types_select = document.querySelector("#type")

document.addEventListener('DOMContentLoaded', function() {
      const options = {
          
      }
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

console.log(button)

button.addEventListener("click", e => {
  var search = types_select.value
  // var search2 = input.value
  console.log(search)
  resetMap(search)
})

var map
var infowindow
var userLocation
var allTypes = []

function resetMap(newType){
  allTypes.push(newType)
  infowindow = new google.maps.InfoWindow()
  var service = new google.maps.places.PlacesService(map)
  service.nearbySearch({
    location: userLocation,
    radius: 1000,
    type: allTypes
  }, callback)
      

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i])
      }
    }
  }

  function createMarker(place) {
    console.log(place)
    var placeLoc = place.geometry.location
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    })
    
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name)
    
      infowindow.open(map, this)
    })
  }  
}
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var infoWindow
var mapStyle = document.mapStyle

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 14,
    styles: [{
        "elementType": "geometry.fill",
        "stylers": [{
          "weight": 0.5
        }]
      },
      {
        "elementType": "labels.text",
        "stylers": [{
            "color": "#1a1a1a"
          },
          {
            "lightness": -5
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "administrative",
        "stylers": [{
            "color": "#505050"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [{
            "color": "#ce00f9"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#000000"
          },
          {
            "weight": 1
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "stylers": [{
            "color": "#e8d1f2"
          },
          {
            "lightness": -5
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [{
          "visibility": "off"
        }]
      },
      {
        "featureType": "poi.attraction",
        "stylers": [{
          "visibility": "simplified"
        }]
      },
      {
        "featureType": "poi.attraction",
        "elementType": "labels.text",
        "stylers": [{
            "color": "#153ff1"
          },
          {
            "lightness": 15
          },
          {
            "visibility": "simplified"
          },
          {
            "weight": 0.5
          }
        ]
      },
      {
        "featureType": "poi.park",
        "stylers": [{
            "color": "#b9dd2a"
          },
          {
            "lightness": 30
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [{
            "color": "#5364f1"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [{
            "color": "#eff1f0"
          },
          {
            "lightness": 30
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text",
        "stylers": [{
          "color": "#f1ee7d"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#161616"
          },
          {
            "visibility": "on"
          },
          {
            "weight": 0.5
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#9fabb6"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#d4e3f2"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }
    ]
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      infoWindow.setPosition(userLocation);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(userLocation);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}