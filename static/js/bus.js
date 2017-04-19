function initMapBus() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 9.934739, lng: -84.087502},
        styles: [
            {
                elementType: 'labels.text',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            }
        ]
    });
    setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var flights = [
    [1,'Aeropuerto Guanacaste',10.542809,-85.596905,4],
    [2,'Aeropuerto Limon',10.196989,-83.388653,3],
    [3,'Aeropuerto Puntarenas',8.603741,-82.971173,2],
    [4,'Aeropuerto San Jose',9.998669,-84.203872,1]
];

// var data = {
//     "response": [{
//         "id": 1,
//         "name": "Aeropuerto Guanacaste",
//         "latitude": 10.542809,
//         "longitud": -85.596905
//     }]
// }

// var data = {
//     "name": "John",
//     "age": 30,
//     "city": "New York"
// }
//
// obj = JSON.parse(data);
// var algo = obj.name + ", " + obj.age;
// console.log(algo);

var json = '{"id":1, name": "John","age": 30,"city": "New York"}',
    obj = JSON.parse(json);

console.log(obj.city);

function setMarkers(map) {
    for (var i = 0; i < flights.length; i++) {
        var flight = flights[i];
        var flight_id = String(flight[0]);
        console.log(flight[0].toString());
        var marker = new google.maps.Marker({
            position: {lat: flight[2], lng: flight[3]},
            map: map,
            title: flight[1],
            zIndex: flight[4],
            label: {
                text: flight_id,
                color: '#000',
                fontSize: "15"
            }
        });
    }
}