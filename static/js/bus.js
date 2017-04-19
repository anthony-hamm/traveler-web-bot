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

var json_flights = '{"response": [' +
        '{"id": 1, "name": "Aeropuerto Guanacaste", "latitude": 10.542809, "longitud": -85.596905},' +
        '{"id": 2, "name": "Aeropuerto Limon", "latitude": 10.196989, "longitud": -83.388653},' +
        '{"id": 3, "name": "Aeropuerto Puntarenas", "latitude": 8.603741, "longitud": -82.971173},' +
        '{"id": 4, "name": "Aeropuerto San Jose", "latitude": 9.998669, "longitud": -84.203872}]}',

flight_marker = JSON.parse(json_flights);

function setMarkers(map) {
    for (var i = 0; i < flight_marker.response.length; i++) {
        var flight = flight_marker.response[i];
        var flight_id = String(flight.id);
        var marker = new google.maps.Marker({
            position: {lat: flight.latitude, lng: flight.longitud},
            map: map,
            title: flight.name,
            label: {
                text: flight_id,
                color: '#000',
                fontSize: "15"
            }
        });
    }
}
