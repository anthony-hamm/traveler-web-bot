/**
 * Created by hamme on 19/04/2017.
 */

var ajax_response;
var transportType;
var shortestPathIDs;
var teta;
var map;
var flightPlanCoordinates = [];
var transport_id;

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


function initMap(transport_id) {
    transport_id = transport_id;
    map = new google.maps.Map(document.getElementById('map'), {
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

    // var ajax_response;

    switch (transport_id) {
        // ID:1 == Flight Transport Type
        case 1:
            getMarkers('getFlightMarkers','flight_graph');
            break;
        // ID:2 == Train Transport Type
        case 2:
            getMarkers('getTrainMarkers','flight_graph');
            break;
        // ID:3 == Bus Transport Type
        case 3:
            getMarkers('getBusMarkers','bus_graph');
            break;
        // ID:4 == Taxi Transport Type
        case 4:
            getMarkers('getTaxiMarkers','taxi_graph');
            break;
    }
    setMarkers(map, ajax_response);
}

function setMarkers(map, ajax_content) {
    for (var i = 0; i < ajax_content.response.length; i++) {
        var item = ajax_content.response[i];
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

function calculateRoute() {
    // initMap(transportId);
    var origin_value = $("#inlineFormCustomSelectOrigin option:selected").val();
    var destination_value = $("#inlineFormCustomSelectDestination option:selected").val();
    var SendInfo = {
        "id1": origin_value,
        "id2": destination_value,
        "graphName": transportType
    };
    var teta;
    data = JSON.stringify(SendInfo)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/calculateRoute',
        contentType:"application/json",
        data: data,
        dataType: 'json',
        async: false,
        // traditional: true,
        success: function (response) {
            shortestPathIDs = response;
        },
        error: function (error) {
            console.log(error);
        }
    });
    generatePath(shortestPathIDs);
}


function generatePath(shortestPathIDs) {
    for (var i = 0; i < ajax_response.response.length; i++) {
        var item = ajax_response.response[i];
        for (var j = 0; j < shortestPathIDs.length; j++) {
            if (shortestPathIDs[j] == item.id){
                temp = new google.maps.LatLng(Number(item.latitude), Number(item.longitude));
                flightPlanCoordinates.push(temp);
            }
        }
        // temp = new google.maps.LatLng(Number(item.latitude), Number(item.longitude));
        // flightPlanCoordinates.push(temp);
    }

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
}


/*--------------------------------- Ajax Functions ---------------------------------*/


function getMarkers(urlParameter, type) {
    $.ajax({
        url: 'http://localhost:8000/' + urlParameter,
        type: 'GET',
        async: false,
        success: function (response) {
            transportType = type;
            ajax_response = response;
            //Load the options tied up to each transportation method
            dropdown_options = ajax_response.response;
            //Clean the dropdowns of origin and destination when entering the transportation methods and also appends the default option
            cleanDropdowns();
            //Add dynamically the origins into the dropdown
            fillDropdown("#inlineFormCustomSelectOrigin", dropdown_options);
            //Add dynamically the destination into the dropdown
            fillDropdown("#inlineFormCustomSelectDestination", dropdown_options);
            //Add dynamically the option selected into the table origin
            fillInfoTables("#inlineFormCustomSelectOrigin", '#tab');
            //Add dynamically the option selected into the table destination
            fillInfoTables("#inlineFormCustomSelectDestination", '#tab2');
        },
        error: function (error) {
            console.log(error);
        }
    })
};


function cleanDropdowns() {
    //Clean the dropdowns of origin and destination when entering the transportation methods and also appends the default option
    $("#inlineFormCustomSelectOrigin").empty();
    $("#inlineFormCustomSelectDestination").empty();
    $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
    $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
}


function fillDropdown(dropdownID, dropdownOptions){
    var dropdown = $(dropdownID);
    $.each(dropdownOptions, function () {
        dropdown.append($("<option />").val(this.id).text(this.id + " - " + this.name));
    });
}


function  fillInfoTables(tableID, row) {
    $(tableID).change(function () {
        $(row).append($('<tr>')).empty();
        var dropdown = $(tableID + ' option:selected').text();
        $(row).append($('<tr>').append(dropdown));
    });
}