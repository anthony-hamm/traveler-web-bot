/**
 * Created by hamme on 19/04/2017.
 */

var ajax_response;
var transportType;
var shortestPathIDs;
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
            // function getFlightMarkers() {
            $.ajax({
                url: 'http://localhost:8000/getFlightMarkers',
                type: 'GET',
                async: false,
                success: function (response) {
                    transportType = "flight_graph";
                    ajax_response = response;
                    dropdown_options = ajax_response.response;
                    $("#inlineFormCustomSelectOrigin").empty();
                    $("#inlineFormCustomSelectDestination").empty();
                    $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
                    $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
                    var options = $("#inlineFormCustomSelectOrigin");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                    var options = $("#inlineFormCustomSelectDestination");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                    $("#inlineFormCustomSelectOrigin").change(function(){
                       $('#tab').append($('<tr>')).empty();
                       var or_history = $('#inlineFormCustomSelectOrigin option:selected').text();
                       $('#tab').append($('<tr>').append(or_history));

                    });

                    $("#inlineFormCustomSelectDestination").change(function(){
                        $('#tab2').append($('<tr>')).empty();
                        var or_destination = $('#inlineFormCustomSelectDestination   option:selected').text();
                        $('#tab2').append($('<tr>').append(or_destination));
                    });



                },
                error: function (error) {
                    console.log(error);
                }
            });
            break;
        // ID:2 == Train Transport Type
        case 2:
            // function getTrainMarkers() {
            $.ajax({
                url: 'http://localhost:8000/getTrainMarkers',
                type: 'GET',
                async: false,
                success: function (response) {
                    transportType = "train_graph";
                    ajax_response = response;
                    dropdown_options = ajax_response.response;
                    $("#inlineFormCustomSelectOrigin").empty();
                    $("#inlineFormCustomSelectDestination").empty();
                    $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
                    $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
                    var options = $("#inlineFormCustomSelectOrigin");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                    var options = $("#inlineFormCustomSelectDestination");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
            break;
        // ID:3 == Bus Transport Type
        case 3:
            // function getBusMarkers() {
            $.ajax({
                url: 'http://localhost:8000/getBusMarkers',
                type: 'GET',
                async: false,
                success: function (response) {
                    transportType = "bus_graph";
                    ajax_response = response;
                    dropdown_options = ajax_response.response;
                    $("#inlineFormCustomSelectOrigin").empty();
                    $("#inlineFormCustomSelectDestination").empty();
                    $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
                    $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
                    var options = $("#inlineFormCustomSelectOrigin");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                    var options = $("#inlineFormCustomSelectDestination");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
            break;
        // ID:4 == Taxi Transport Type
        case 4:
            // function getTaxiMarkers() {
            $.ajax({
                url: 'http://localhost:8000/getTaxiMarkers',
                type: 'GET',
                async: false,
                success: function (response) {
                    transportType = "taxi_graph";
                    ajax_response = response;
                    dropdown_options = ajax_response.response;
                    $("#inlineFormCustomSelectOrigin").empty();
                    $("#inlineFormCustomSelectDestination").empty();
                    $('#inlineFormCustomSelectOrigin').append('<option>Choose Origin</option>');
                    $('#inlineFormCustomSelectDestination').append('<option>Choose Destination</option>');
                    var options = $("#inlineFormCustomSelectOrigin");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                    var options = $("#inlineFormCustomSelectDestination");
                    $.each(dropdown_options, function () {
                        options.append($("<option />").val(this.id).text(this.id + " - " + this.name));
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
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
    var origin_value = $("#inlineFormCustomSelectOrigin option:selected").val();
    var destination_value = $("#inlineFormCustomSelectDestination option:selected").val();
    var SendInfo = {
        "id1": origin_value,
        "id2": destination_value,
        "graphName": transportType
    };
    data = JSON.stringify(SendInfo)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8000/calculateRoute',
        contentType:"application/json",
        data: data,
        dataType: 'json',
        // traditional: true,
        success: function (response) {
            shortestPathIDs = response;
            // alert(shortestPathIDs);
            // console.log(shortestPathIDs[0]);
            // console.log(shortestPathIDs[1]);
            // console.log(shortestPathIDs[2]);
            // console.log(ajax_response['response'][0].['id']);
        },
        error: function (error) {
            console.log(error);
        }
    });
    // fillCoordinates();
    generatePath();
    // flightPath.setMap(map);

}
//
// function fillCoordinates() {
//     flightPlanCoordinates = [];
//     for (var i = 0; i < ajax_content.response.length; i++) {
//         var item = ajax_content.response[i];
//
//         for (var j = 0; j < item.length; j++){
//             flightPlanCoordinates.append({lat: item.latitude, lng: item.longitude});
//         }
//     }
// }

function generatePath() {

    flightPlanCoordinates = [];
    for (var i = 0; i < ajax_response.response.length; i++) {
        var item = ajax_response.response[i];
        // flightPlanCoordinates.push("{lat: " + Number(item.latitude) + ", lng: " + Number(item.longitude)+ "}");
        flightPlanCoordinates.push("{" + Number(item.latitude), Number(item.longitude)+ "}");
    }
    alert(flightPlanCoordinates);
    // alert(flightPlanCoordinates);

    // var flightPlanCoordinates = [
    //     {lat: 10.542809, lng: -85.596905},
    //     {lat: 10.196989, lng: -83.388653},
    //     {lat: 8.603741, lng: -82.971173},
    //     {lat: 9.998669, lng: -84.203872}
    // ];
    var teta = "[" + flightPlanCoordinates + "]";
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
