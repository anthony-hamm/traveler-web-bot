/**
 * Created by camilomartinez on 4/7/17.
 */


function initMapTrain() {
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

    var trainPlanCoordinates = [
        {lat: 9.590467, lng: -83.963797},
        {lat: 9.026703, lng: -83.013480},
        {lat: 9.590467, lng: -83.963797},
        {lat: 9.823291, lng: -83.738577},
        {lat: 9.590467, lng: -83.963797},
        {lat: 9.509211, lng: -84.293387},
        {lat: 9.590467, lng: -83.963797},
        {lat: 10.564678, lng: -84.488582},
        {lat: 10.564678, lng: -84.488582},
        {lat: 10.475589, lng: -85.504398},
        {lat: 10.564678, lng: -84.488582},
        {lat: 10.379155, lng: -84.020472},
        {lat: 10.379155, lng: -84.020472},
        {lat: 10.266824, lng: -83.469412},
        {lat: 9.823291, lng: -83.738577},
        {lat: 10.266824, lng: -83.469412},
        {lat: 9.823291, lng: -83.738577},
        {lat: 10.379155, lng: -84.020472}
    ];

    var trainPath = new google.maps.Polyline({
        path: trainPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    var myLatLngGuana = {lat: 10.475589, lng: -85.504398};
    var myLatLngSanCarlos = {lat: 10.564678, lng: -84.488582};
    var myLatLngHeredia = {lat: 10.379155, lng: -84.020472};
    var myLatLngLimon= {lat: 10.266824, lng: -83.469412};
    var myLatLngCartago = {lat: 9.823291, lng: -83.738577};
    var myLatLngSJ = {lat: 9.590467, lng: -83.963797};
    var myLatLngPuntaOeste = {lat: 9.509211, lng: -84.293387};
    var myLatLngPuntaEste = {lat: 9.026703, lng: -83.013480};

    var markerGuana = new google.maps.Marker({
        position: myLatLngGuana,
        map: map,
        title: 'Guanacaste Train Station',
        label: {
            text: 'Guanacaste Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    markerGuana.getLabel();

    var contentStringGuana = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Guanacaste Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowGuana = new google.maps.InfoWindow({
        content: contentStringGuana,
        maxWidth: 80
    });

    markerGuana.addListener('click', function() {
        infowindowGuana.open(map, markerGuana);
        getLabel();
    });

    var markerSanCarlos = new google.maps.Marker({
        position: myLatLngSanCarlos,
        map: map,
        title: 'San Carlos Train Station',
        label: {
            text: 'San Carlos Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringSanCarlos = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">San Carlos Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowSanCarlos = new google.maps.InfoWindow({
        content: contentStringSanCarlos,
        maxWidth: 75
    });

    markerSanCarlos.getLabel();

    markerSanCarlos.addListener('click', function() {
        infowindowSanCarlos.open(map, markerSanCarlos);
        getLabel();
    });

    var markerHeredia = new google.maps.Marker({
        position: myLatLngHeredia,
        map: map,
        title: 'Heredia Train Station',
        label: {
            text: 'Heredia Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringHeredia = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Heredia Train Station</p>'+
        '</div>'+
        '</div>';

    var infowindowHeredia = new google.maps.InfoWindow({
        content: contentStringHeredia,
        maxWidth: 70
    });

    markerHeredia.getLabel();

    markerHeredia.addListener('click', function() {
        infowindowHeredia.open(map, markerHeredia);
        getLabel();
    });


    var markerLimon = new google.maps.Marker({
        position: myLatLngLimon,
        map: map,
        title: 'Limon Train Station',
        label: {
            text: 'Limon Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringLimon = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h7 id="firstHeading" class="firstHeading">Limon Train Station</h7>'+
        '</div>'+
        '</div>';

    var infowindowLimon = new google.maps.InfoWindow({
        content: contentStringLimon,
        maxWidth: 70
    });

    markerLimon.getLabel();

    markerLimon.addListener('click', function() {
        infowindowLimon.open(map, markerLimon);
    });

    var markerCartago = new google.maps.Marker({
        position: myLatLngCartago,
        map: map,
        title: 'Cartago Train Station',
        label: {
            text: 'Cartago Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringCartago = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h7 id="firstHeading" class="firstHeading">Cartago Train Station</h7>'+
        '</div>'+
        '</div>';

    var infowindowCartago = new google.maps.InfoWindow({
        content: contentStringCartago,
        maxWidth: 70
    });

    markerCartago.getLabel();

    markerCartago.addListener('click', function() {
        infowindowCartago.open(map, markerCartago);
    });

    var markerSJ = new google.maps.Marker({
        position: myLatLngSJ,
        map: map,
        title: 'SJ Train Station',
        label: {
            text: 'SJ Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringSJ = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h7 id="firstHeading" class="firstHeading">SJ Train Station</h7>'+
        '</div>'+
        '</div>';

    var infowindowSJ = new google.maps.InfoWindow({
        content: contentStringSJ,
        maxWidth: 70
    });

    markerSJ.getLabel();

    markerSJ.addListener('click', function() {
        infowindowSJ.open(map, markerSJ);
    });

    var markerPuntaOeste = new google.maps.Marker({
        position: myLatLngPuntaOeste,
        map: map,
        title: 'PuntarenasW Train Station',
        label: {
            text: 'PuntarenasW Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringPuntaOeste = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h7 id="firstHeading" class="firstHeading">Puntarenas Oeste Train Station</h7>'+
        '</div>'+
        '</div>';

    var infowindowPuntaOeste = new google.maps.InfoWindow({
        content: contentStringPuntaOeste,
        maxWidth: 70
    });

    markerPuntaOeste.getLabel();

    markerPuntaOeste.addListener('click', function() {
        infowindowPuntaOeste.open(map, markerPuntaOeste);
    });

    var markerPuntaEste = new google.maps.Marker({
        position: myLatLngPuntaEste,
        map: map,
        title: 'PuntarenasE Train Station',
        label: {
            text: 'PuntarenasE Train Station',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringPuntaEste = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h7 id="firstHeading" class="firstHeading">Puntarenas Este Train Station</h7>'+
        '</div>'+
        '</div>';

    var infowindowPuntaEste = new google.maps.InfoWindow({
        content: contentStringPuntaEste,
        maxWidth: 70
    });

    markerPuntaEste.getLabel();

    markerPuntaEste.addListener('click', function() {
        infowindowPuntaEste.open(map, markerPuntaEste);
    });

    trainPath.setMap(map);
}