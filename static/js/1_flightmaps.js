/**
 * Created by camilomartinez on 4/7/17.
 */


function initMapFlights() {
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

    var flightPlanCoordinates = [
        {lat: 9.998669, lng: -84.203872},
        {lat: 10.542809, lng: -85.596905},
        {lat: 9.998669, lng: -84.203872},
        {lat: 10.196989, lng: -83.388653},
        {lat: 9.998669, lng: -84.203872},
        {lat: 8.603740, lng: -82.971173}
        ];

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
        });

    var myLatLngSJO = {lat: 9.998669, lng: -84.203872};
    var myLatLngGuana = {lat: 10.542809, lng: -85.596905};
    var myLatLngLimon = {lat: 10.196989, lng: -83.388653};
    var myLatLngPunta = {lat: 8.603740, lng: -82.971173};

    var markerSJO = new google.maps.Marker({
        position: myLatLngSJO,
        map: map,
        title: 'Juan Santa Maria Airport',
        label: {
            text: 'Juan Santa Maria Airport',
            color: '#000',
            fontSize: "15"
        }
        });

    var contentStringSJO = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Juan Santamaría Int. Airport</p>'+
        '</div>'+
        '</div>';

    var infowindowSJO = new google.maps.InfoWindow({
        content: contentStringSJO,
        maxWidth: 80
    });

    markerSJO.addListener('click', function() {
          infowindowSJO.open(map, markerSJO);
        });

    var markerGuana = new google.maps.Marker({
        position: myLatLngGuana,
        map: map,
        title: 'Guanacaste Airport',
        label: {
            text: 'Guanacaste Airport',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringGuana = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Daniel Oduber Int. Airport </p>'+
        '</div>'+
        '</div>';

    var infowindowGuana = new google.maps.InfoWindow({
        content: contentStringGuana,
        maxWidth: 75
    });

    markerGuana.getLabel();

    markerGuana.addListener('click', function() {
        infowindowGuana.open(map, markerGuana);
        getLabel();
    });

    var markerLimon = new google.maps.Marker({
        position: myLatLngLimon,
        map: map,
        title: 'Limon Airport',
        label: {
            text: 'Limon Airport',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringLimon = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<p id="firstHeading" class="firstHeading">Limón Int. Airport</p>'+
        '</div>'+
        '</div>';

    var infowindowLimon = new google.maps.InfoWindow({
        content: contentStringLimon,
        maxWidth: 70
    });

    markerLimon.getLabel();

    markerLimon.addListener('click', function() {
        infowindowLimon.open(map, markerLimon);
        getLabel();
    });

    var markerPuntarenas = new google.maps.Marker({
        position: myLatLngPunta,
        map: map,
        title: 'Puntarenas Airport',
        label: {
            text: 'Puntarenas Airport',
            color: '#000',
            fontSize: "15"
        }
    });

    var contentStringPuntarenas = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h7 id="firstHeading" class="firstHeading">Coto 47 Airport</h7>'+
        '</div>'+
        '</div>';

    var infowindowPuntarenas = new google.maps.InfoWindow({
        content: contentStringPuntarenas,
        maxWidth: 70
    });

    markerPuntarenas.getLabel();

    markerPuntarenas.addListener('click', function() {
        infowindowPuntarenas.open(map, markerPuntarenas);
    });

    flightPath.setMap(map);
    }