/**
 * Created by hamme on 19/04/2017.
 */

var ajax_response;
var nodesFromDB;
var transportType;
var shortestPathIDs;
var teta;
var map;
var flightPlanCoordinates = [];
var transport_id;
var flightPath;
var numberOfEdges;

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


function initMap(transportID) {
    transport_id = transportID;
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
    switch (transport_id) {
        // ID:1 == Flight Transport Type
        case 1:
            //TODO: modificar back-end de getMarkers para retornar toda la información del nodo.
            getMarkers('getFlightMarkers','flight_graph');
            break;
        // ID:2 == Train Transport Type
        case 2:
            getMarkers('getTrainMarkers','train_graph');
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
    for (var i = 0; i < ajax_content.length; i++) {
        var item = ajax_content[i];
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
    alert("Number of Edges: " + numberOfEdges);
}


// Print the shortes path between origin and destination
function generatePath(shortestPathIDs) {
    // Clean paths from map by reloding the map and markers
    initMap(transport_id);
    // Get the corresponding edges from the received nodes
    numberOfEdges = getEdgesFromPath(shortestPathIDs).length;
    var pathEdges =  getEdgesFromPath(shortestPathIDs);
    // Iterate through each Edge and print the corresponding path
    for (var i = 0; i < pathEdges.length; i++) {
        // Get latitude and longitude from edge pair
        flightPlanCoordinates = getLatLngFromEdge(pathEdges[i]);
        flightPath = new google.maps.Polyline({
            path: flightPlanCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
        // Print the edge path
        flightPath.setMap(map);
    }
}


function getEdgesFromPath(nodes) {
    pathEdges = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i+1]){
            var temp = [nodes[i], nodes[i+1]];
            pathEdges.push(temp);
        }
    }
    return pathEdges;
}

function getLatLngFromEdge(edgePair) {
    var coordinatesArray = [];
    for (var i = 0; i < edgePair.length; i++) {
        for (var node = 0; node < ajax_response.length; node++) {
            if (edgePair[i] == ajax_response[node].id){
                var item = ajax_response[node];
                temp = new google.maps.LatLng(Number(item.latitude), Number(item.longitude));
                coordinatesArray.push(temp);
            }
        }
    }
    return coordinatesArray;
}


function getMarkers(urlParameter, type) {
    $.ajax({
        url: 'http://localhost:8000/' + urlParameter,
        type: 'GET',
        async: false,
        success: function (response) {
            transportType = type;
            ajax_response = response;
            //Load the options tied up to each transportation method
            ajax_response = ajax_response.response;
            //Clean the dropdowns of origin and destination when entering the transportation methods and also appends the default option
            cleanDropdowns();
            //Add dynamically the origins into the dropdown
            fillDropdown("#inlineFormCustomSelectOrigin", ajax_response);
            //Add dynamically the destination into the dropdown
            fillDropdown("#inlineFormCustomSelectDestination", ajax_response);
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

//Clean the dropdowns of origin and destination when entering the transportation methods and also appends the default option
function cleanDropdowns() {
    $("#inlineFormCustomSelectOrigin").empty();
    $("#inlineFormCustomSelectDestination").empty();
    $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
    $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
}

//Add options dynamically to the dropdown
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
