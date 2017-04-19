/**
 * Created by hamme on 19/04/2017.
 */

function costaRicaMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: 9.934739, lng: -84.087502},
        styles: [
            {
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        visibility: 'on'
                    }
                ]
            }
        ]
    });
}

var json_flights = '{"response": [' +
        '{"id": 1, "name": "Aeropuerto Guanacaste", "latitude": 10.542809, "longitud": -85.596905},' +
        '{"id": 2, "name": "Aeropuerto Limon", "latitude": 10.196989, "longitud": -83.388653},' +
        '{"id": 3, "name": "Aeropuerto Puntarenas", "latitude": 8.603741, "longitud": -82.971173},' +
        '{"id": 4, "name": "Aeropuerto San Jose", "latitude": 9.998669, "longitud": -84.203872}]}';

var json_trains = '{"response": [' +
            '{"id": 1, "name": "Estación de Tren Guanacaste", "latitude": 10.542809, "longitud": -85.596905},' +
            '{"id": 2, "name": "Estación de Tren Limon", "latitude": 10.196989, "longitud": -83.388653},' +
            '{"id": 3, "name": "Estación de Tren Puntarenas", "latitude": 8.603741, "longitud": -82.971173},' +
            '{"id": 4, "name": "Estación de Tren San Jose", "latitude": 9.998669, "longitud": -84.203872}]}';

var json_buses = '{"response": [' +
            '{"id": 1, "name": "Estación de Bus Guanacaste", "latitude": 10.542809, "longitud": -85.596905},' +
            '{"id": 2, "name": "Estación de Bus Limon", "latitude": 10.196989, "longitud": -83.388653},' +
            '{"id": 3, "name": "Estación de Bus Puntarenas", "latitude": 8.603741, "longitud": -82.971173},' +
            '{"id": 4, "name": "Estación de Bus San Jose", "latitude": 9.998669, "longitud": -84.203872}]}';

var json_taxis = '{"response": [' +
            '{"id": 1, "name": "Estación de Taxi Guanacaste", "latitude": 10.542809, "longitud": -85.596905},' +
            '{"id": 2, "name": "Estación de Taxi Limon", "latitude": 10.196989, "longitud": -83.388653},' +
            '{"id": 3, "name": "Estación de Taxi Puntarenas", "latitude": 8.603741, "longitud": -82.971173},' +
            '{"id": 4, "name": "Estación de Taxi San Jose", "latitude": 9.998669, "longitud": -84.203872}]}';


function initMap(transport_id) {
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

    switch (transport_id){
        // ID:1 == Flight Transport Type
        case 1:
            // TODO: INSERTAR AQUÍ EL METODO AJAX QUE RETORNE JSON CON INFORMACIÓN DE GRAFO SEGÚN EL TIPO DE TRANSPORTE
                var json_response = json_flights;
            break;
        // ID:2 == Train Transport Type
        case 2:
            // TODO: INSERTAR AQUÍ EL METODO AJAX QUE RETORNE JSON CON INFORMACIÓN DE GRAFO SEGÚN EL TIPO DE TRANSPORTE
            var json_response = json_trains;
            break;
        // ID:3 == Bus Transport Type
        case 3:
            // TODO: INSERTAR AQUÍ EL METODO AJAX QUE RETORNE JSON CON INFORMACIÓN DE GRAFO SEGÚN EL TIPO DE TRANSPORTE
            var json_response = json_buses;
            break;
        // ID:4 == Taxi Transport Type
        case 4:
            // TODO: INSERTAR AQUÍ EL METODO AJAX QUE RETORNE JSON CON INFORMACIÓN DE GRAFO SEGÚN EL TIPO DE TRANSPORTE
            var json_response = json_taxis;
            break;
    }

    // json_content = al response tipo json que viene de Ajax.
    json_content = JSON.parse(json_response);
    setMarkers(map, json_content);
}


function setMarkers(map, json_content) {
    for (var i = 0; i < json_content.response.length; i++) {
        var item = json_content.response[i];
        var item_id = String(item.id);
        var marker = new google.maps.Marker({
            position: {lat: item.latitude, lng: item.longitud},
            map: map,
            title: item.name,
            label: {
                text: item_id,
                color: '#000',
                fontSize: "15"
            }
        });
    }
}

