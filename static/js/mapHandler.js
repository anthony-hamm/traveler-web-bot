/**
 * Created by hamme on 19/04/2017.
 */

var ajax_response;
var transportType;
var shortestPathIDs;

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
            alert(shortestPathIDs);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
/*--------------------------------- Ajax Functions ---------------------------------*/


