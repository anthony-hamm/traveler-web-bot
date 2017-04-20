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

var json_flights = '{"response":[' +
        '{"id":1","name":"Aeropuerto Guanacaste","latitude":"10.54280900","longitude":"-85.59690500"},' +
        '{"id":"2","name":"Aeropuerto Limon","latitude":"10.196989","longitude":"-83.388653"},' +
        '{"id":"3","name":"Aeropuerto Puntarenas","latitude":"8.603741","longitude":"-82.971173"},' +
        '{"id":"4","name":"Aeropuerto San Jose","latitude":"9.998669","longitude":"-84.203872"}]}';

var json_trains = '{"response": [' +
            '{"id": 1, "name": "Estación de Tren Guanacaste", "latitude": 10.542809, "longitude": -85.596905},' +
            '{"id": 2, "name": "Estación de Tren Limon", "latitude": 10.196989, "longitude": -83.388653},' +
            '{"id": 3, "name": "Estación de Tren Puntarenas", "latitude": 8.603741, "longitude": -82.971173},' +
            '{"id": 4, "name": "Estación de Tren San Jose", "latitude": 9.998669, "longitude": -84.203872}]}';

var json_buses = '{"response": [' +
            '{"id": "1", "name": "Estación de Bus Guanacaste", "latitude": "10.542809", "longitude": "-85.596905"},' +
            '{"id": "2", "name": "Estación de Bus Limon", "latitude": "10.196989", "longitude": "-83.388653"},' +
            '{"id": "3", "name": "Estación de Bus Puntarenas", "latitude": "8.603741", "longitude": "-82.971173"},' +
            '{"id": "4", "name": "Estación de Bus San Jose", "latitude": "9.998669", "longitude": "-84.203872"}]}';

var json_taxis = '{"response": [' +
            '{"id": 1, "name": "Estación de Taxi Guanacaste", "latitude": 10.542809, "longitude": -85.596905},' +
            '{"id": 2, "name": "Estación de Taxi Limon", "latitude": 10.196989, "longitude": -83.388653},' +
            '{"id": 3, "name": "Estación de Taxi Puntarenas", "latitude": 8.603741, "longitude": -82.971173},' +
            '{"id": 4, "name": "Estación de Taxi San Jose", "latitude": 9.998669, "longitude": -84.203872}]}';


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

    var ajax_response;

    switch (transport_id){
        // ID:1 == Flight Transport Type
        case 1:
            // function getFlightMarkers() {
            $.ajax({
                url:'http://localhost:8000/getFlightMarkers',
                type:'GET',
                async: false,
                success: function(response) {
                    ajax_response = response;
                },
                error:function (error) {
                    console.log(error);
                }
            });
            break;
        // ID:2 == Train Transport Type
        case 2:
            // function getTrainMarkers() {
            $.ajax({
                url:'http://localhost:8000/getTrainMarkers',
                type:'GET',
                async: false,
                success: function(response) {
                    console.log(response);
                    ajax_response = response;
                    console.log(ajax_response);
                },
                error:function (error) {
                    console.log(error);
                }
            });
            break;
        // ID:3 == Bus Transport Type
        case 3:
            // function getBusMarkers() {
            $.ajax({
                url:'http://localhost:8000/getBusMarkers',
                type:'GET',
                async: false,
                success: function(response) {
                    ajax_response = response;
                },
                error:function (error) {
                    console.log(error);
                }
            });
            break;
        // ID:4 == Taxi Transport Type
        case 4:
            // function getTaxiMarkers() {
            $.ajax({
                url:'http://localhost:8000/getTaxiMarkers',
                type:'GET',
                async: false,
                success: function(response) {
                    ajax_response = response;
                },
                error:function (error) {
                    console.log(error);
                }
            });
            break;
    }
    setMarkers(map, ajax_response);
}


function setMarkers(map, json_content) {
    for (var i = 0; i < json_content.response.length; i++) {
        var item = json_content.response[i];
        var marker = new google.maps.Marker({
            position: {lat: Number(item.latitude), lng: Number(item.longitude)},
            map: map,
            title: item.name,
            label: {
                text: item.id,
                color: '#000',
                fontSize: "15"
            }
        });
    }
}


/*--------------------------------- Ajax Functions ---------------------------------*/


