/**
 * Created by camilomartinez on 4/7/17.
 */


function initMapTaxi() {
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

    var myLatLngSJO = {lat: 9.685056, lng: -84.055006};
    var myLatLngSJOWest = {lat: 9.831225, lng: -84.521925};
    var myLatLngSJOEast = {lat: 9.332907, lng: -83.483717};
    var myLatLngSJONorth = {lat: 9.938629, lng: -84.138075};
    var myLatLngPun = {lat: 9.527158, lng: -84.390760};
    var myLatLngPunSouth = {lat: 8.653868, lng: -83.588967};
    var myLatLngPunEast = {lat: 8.621283, lng: -83.001199};
    var myLatLngLimonSouth = {lat: 9.819574, lng: -82.967124};
    var myLatLngCartago = {lat: 9.841224, lng: -83.686729};
    var myLatLngLimonNorth = {lat: 10.403618, lng: -83.642783};
    var myLatLngHeredia = {lat: 10.411722, lng: -84.052024};
    var myLatLngAlajuela = {lat: 10.238788, lng: -84.431052};
    var myLatLngAlajuelaNorth = {lat: 10.778888, lng: -84.897971};
    var myLatLngGuanaNorth = {lat: 10.481950, lng: -85.3484111};
    var myLatLngPunNorth = {lat: 10.004413, lng: -84.834494};
    var myLatLngGuanaSouth = {lat: 10.074730, lng: -85.5046601};

    var markerSJO = new google.maps.Marker({
        position: myLatLngSJO,
        map: map,
        title: 'SJO Taxi Station',
        label: {
            text: '10000000',
            color: '#000',
            fontSize: "15"
        }
    });

    markerSJO.getLabel();

    var contentStringSJO = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">San Jose Taxi Station</p>'+
        '</div>'+
        '</div>';

    var infowindowSJO = new google.maps.InfoWindow({
        content: contentStringSJO,
        maxWidth: 80
    });

    markerSJO.addListener('click', function() {
        infowindowSJO.open(map, markerSJO);
        getLabel();
    });

    var markerSJOWest = new google.maps.Marker({
        position: myLatLngSJOWest,
        map: map,
        title: 'SJO West Taxi Station',
        label: {
            text: '2',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringSJOWest = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">San Jose West Taxi Station</p>'+
        '</div>'+
        '</div>';

    var infowindowSJOWest = new google.maps.InfoWindow({
        content: contentStringSJOWest,
        maxWidth: 80
    });

    markerSJOWest.addListener('click', function() {
        infowindowSJOWest.open(map, markerSJOWest);
        getLabel();
    });

    var markerSJOEast = new google.maps.Marker({
        position: myLatLngSJOEast,
        map: map,
        title: 'San Jose East Taxi Station',
        label: {
            text: '3',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringSJOEast = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">San Jose East Taxi Station</p>'+
        '</div>'+
        '</div>';

    var infowindowSJOEast = new google.maps.InfoWindow({
        content: contentStringSJOEast,
        maxWidth: 80
    });

    markerSJOEast.addListener('click', function() {
        infowindowSJOEast.open(map, markerSJOEast);
        getLabel();
    });

    var markerSJONorth = new google.maps.Marker({
        position: myLatLngSJONorth,
        map: map,
        title: 'San Jose North Taxi Station',
        label: {
            text: '4',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringSJONorth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">San Jose North Taxi Station</p>'+
        '</div>'+
        '</div>';

    var infowindowSJONorth = new google.maps.InfoWindow({
        content: contentStringSJONorth,
        maxWidth: 80
    });

    markerSJONorth.addListener('click', function() {
        infowindowSJONorth.open(map, markerSJONorth);
        getLabel();
    });

    var markerPun = new google.maps.Marker({
        position: myLatLngPun,
        map: map,
        title: 'Puntarenas East Taxi Station',
        label: {
            text: '5',
            color: '#000',
            fontSize: "15"
        }
    });


    var contentStringPunEast = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Puntarenas East Taxi Station</p>'
        '</div>'+
        '</div>';

    var infowindowPunEast = new google.maps.InfoWindow({
        content: contentStringPunEast,
        maxWidth: 80
    });

    markerPun.addListener('click', function() {
        infowindowPunEast.open(map, markerPun);
        getLabel();
    });

    var markerPunSouth = new google.maps.Marker({
        position: myLatLngPunSouth,
        map: map,
        title: 'Puntarenas South Taxi Station',
        label: {
            text: '6',
            color: '#000',
            fontSize: "15"
        }
    });

    markerPunSouth.getLabel();

    var contentStringPunSouth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Puntarenas South Taxi Station</p>'+
        '</div>'+
        '</div>';

    var infowindowPunSouth = new google.maps.InfoWindow({
        content: contentStringPunSouth,
        maxWidth: 80
    });

    markerPunSouth.addListener('click', function() {
        infowindowPunSouth.open(map, markerPunSouth);
        getLabel();
    });

    var markerPunEast = new google.maps.Marker({
        position: myLatLngPunEast,
        map: map,
        title: 'Puntarenas East Taxi Station',
        label: {
            text: '7',
            color: '#000',
            fontSize: "15"
        }
    });

    markerPunEast.getLabel();

    var contentStringPunEast = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Puntarenas East Taxi Station</p>'+
        '</div>'+
        '</div>';

    var infowindowPunWest = new google.maps.InfoWindow({
        content: contentStringPunEast,
        maxWidth: 80
    });

    markerPunEast.addListener('click', function() {
        infowindowPunWest.open(map, markerPunEast);
        getLabel();
    });

    var markerLimonSouth = new google.maps.Marker({
        position: myLatLngLimonSouth,
        map: map,
        title: 'LimonSouth Taxi Station',
        label: {
            text: '8',
            color: '#000',
            fontSize: "15"
        }
    });

    markerLimonSouth.getLabel();

    var contentStringLimonSouth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">LimonSouthcaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowLimonSouth = new google.maps.InfoWindow({
        content: contentStringLimonSouth,
        maxWidth: 80
    });

    markerLimonSouth.addListener('click', function() {
        infowindowLimonSouth.open(map, markerLimonSouth);
        getLabel();
    });

    var markerLimonNorth = new google.maps.Marker({
        position: myLatLngLimonNorth,
        map: map,
        title: 'LimonNorht Taxi Station',
        label: {
            text: 'LimonNorht Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerLimonNorth.getLabel();

    var contentStringLimonNorth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">LimonNorhtcaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowLimonNorht = new google.maps.InfoWindow({
        content: contentStringLimonNorth,
        maxWidth: 80
    });

    markerLimonNorth.addListener('click', function() {
        infowindowLimonNorht.open(map, markerLimonNorth);
        getLabel();
    });

    var markerCartago = new google.maps.Marker({
        position: myLatLngCartago,
        map: map,
        title: 'Cartago Taxi Station',
        label: {
            text: 'Cartago Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerCartago.getLabel();

    var contentStringCartago = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Cartagocaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowCartago = new google.maps.InfoWindow({
        content: contentStringCartago,
        maxWidth: 80
    });

    markerCartago.addListener('click', function() {
        infowindowCartago.open(map, markerCartago);
        getLabel();
    });

    var markerHeredia = new google.maps.Marker({
        position: myLatLngHeredia,
        map: map,
        title: 'Heredia Taxi Station',
        label: {
            text: 'Heredia Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerHeredia.getLabel();

    var contentStringHeredia = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Herediacaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowHeredia = new google.maps.InfoWindow({
        content: contentStringHeredia,
        maxWidth: 80
    });

    markerHeredia.addListener('click', function() {
        infowindowHeredia.open(map, markerHeredia);
        getLabel();
    });

    var markerAlajuela = new google.maps.Marker({
        position: myLatLngAlajuela,
        map: map,
        title: 'Alajuela Taxi Station',
        label: {
            text: 'Alajuela Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerAlajuela.getLabel();

    var contentStringAlajuela = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Alajuelacaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowAlajuela = new google.maps.InfoWindow({
        content: contentStringAlajuela,
        maxWidth: 80
    });

    markerAlajuela.addListener('click', function() {
        infowindowAlajuela.open(map, markerAlajuela);
        getLabel();
    });

    var markerAlajuelaNorth = new google.maps.Marker({
        position: myLatLngAlajuelaNorth,
        map: map,
        title: 'AlajuelaNorth Taxi Station',
        label: {
            text: 'AlajuelaNorth Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerAlajuelaNorth.getLabel();

    var contentStringAlajuelaNorth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">AlajuelaNorthcaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowAlajuelaNorth = new google.maps.InfoWindow({
        content: contentStringAlajuelaNorth,
        maxWidth: 80
    });

    markerAlajuelaNorth.addListener('click', function() {
        infowindowAlajuelaNorth.open(map, markerAlajuelaNorth);
        getLabel();
    });

    var markerGuanaNorth = new google.maps.Marker({
        position: myLatLngGuanaNorth,
        map: map,
        title: 'GuanaNorth Taxi Station',
        label: {
            text: 'GuanaNorth Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerGuanaNorth.getLabel();

    var contentStringGuanaNorth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">GuanaNorthcaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowGuanaNorth = new google.maps.InfoWindow({
        content: contentStringGuanaNorth,
        maxWidth: 80
    });

    markerGuanaNorth.addListener('click', function() {
        infowindowGuanaNorth.open(map, markerGuanaNorth);
        getLabel();
    });

    var markerPunNorth = new google.maps.Marker({
        position: myLatLngPunNorth,
        map: map,
        title: 'PunNorth Taxi Station',
        label: {
            text: 'PunNorth Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerPunNorth.getLabel();

    var contentStringPunNorth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">PunNorthcaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowPunNorth = new google.maps.InfoWindow({
        content: contentStringPunNorth,
        maxWidth: 80
    });

    markerPunNorth.addListener('click', function() {
        infowindowPunNorth.open(map, markerPunNorth);
        getLabel();
    });

    var markerGuanaSouth = new google.maps.Marker({
        position: myLatLngGuanaSouth,
        map: map,
        title: 'GuanaSouth Taxi Station',
        label: {
            text: 'GuanaSouth Taxi Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerGuanaSouth.getLabel();

    var contentStringGuanaSouth = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">GuanaSouthcaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowGuanaSouth = new google.maps.InfoWindow({
        content: contentStringGuanaSouth,
        maxWidth: 80
    });

    markerGuanaSouth.addListener('click', function() {
        infowindowGuanaSouth.open(map, markerGuanaSouth);
        getLabel();
    });
   }