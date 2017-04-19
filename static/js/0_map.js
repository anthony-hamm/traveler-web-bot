/**
 * Created by camilomartinez on 4/7/17.
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