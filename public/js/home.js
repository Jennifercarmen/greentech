var inputPartida = document.getElementById('input_going');
var inputDestino = document.getElementById('input_destiny');
var markroute = document.getElementById('trazar-ruta');
var findMe = document.getElementById('findMe');
var btntraceroute = document.getElementById('trazar-ruta');
var btnEstacion = document.getElementById('estacionamiento');


// validar input
var validateButton = function validateButton() {
    var partida = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : inputPartida;

    if (partida.value.length < 1) {
        return false;
    }
    return true;
};
var activeButton = function activeButton() {
    if (validateButton()) {
        markroute.removeAttribute('disabled');
    } else {
        desactiveButton();
    }
};
var desactiveButton = function desactiveButton() {
    markroute.setAttribute('disabled', 'disabled');
};

var getmap = function getmap(zoom, position) {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: position
    });
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    return map;
};
var getmarker = function getmarker(zoom, position, image) {

    var marker = new google.maps.Marker({
        position: position,
        map: getmap(zoom, position),
        draggable: true,
        animation: google.maps.Animation.DROP,
        icon: image
    });
    return marker;
};
var toggleBounce = function toggleBounce(zoom, position, image) {
    if (getmarker(zoom, position, image).getAnimation() !== null) {
        getmarker(zoom, position, image).setAnimation(null);
    } else {
        getmarker(zoom, position, image).setAnimation(google.maps.Animation.BOUNCE);

    }
};
function initMap() {

    var position = {
        lat: -12.0463731,
        lng: -77.042754
    };
    var image = 'assets/image/bici_xHL_icon.ico';

    getmarker(6, position).addListener('click', toggleBounce(14, position, image));

    new google.maps.places.Autocomplete(inputPartida);
    new google.maps.places.Autocomplete(inputDestino);
}

var buscar = function buscar() {
    var Successfunction = function Successfunction(position) {
        latitud = position.coords.latitude;
        longitud = position.coords.longitude;


        localStorage.myLatitude = JSON.stringify(latitud);
        localStorage.myLongitude = JSON.stringify(longitud);
        var pos = { lat: localStorage.myLatitude, lng: localStorage.myLongitude };

        var image = 'assets/image/bici_xHL_icon.ico';

        getmarker(18, pos, image).addListener('click', toggleBounce(18, pos, image));
    };
    var Errorfunction = function Errorfunction(error) {
        alert('tenemos un problema con encontrar tu ubicacion');
    };
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(Successfunction, Errorfunction);
    }
};

// Eventos
inputPartida.addEventListener('keyup', activeButton);



btntraceroute.addEventListener('click', function () {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var map = new google.maps.Map(document.getElementById('map'));
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    directionsDisplay.setMap(map);
});

var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay) {

    directionsService.route({
        origin: inputPartida.value,
        destination: inputDestino.value,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('No encontramos una ruta.');
        }
    });
};


// Buscar estacionamientos
function buscarEstacionamientos() {
    // Creamos un mapa con las coordenadas actuales

    lat = -12.0463731;
    lon = -77.042754;

    var myLatlng = new google.maps.LatLng(lat, lon);

    var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.MAPA
    };

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow();

    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    var request = {
        location: myLatlng,
        radius: 7000,
        query: 'estacion bicicletas'
    };

    // Creamos el servicio PlaceService y enviamos la petición.
    var service = new google.maps.places.PlacesService(map);


    service.textSearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                crearMarcador(results[i]);
            }
        }

    });
}
function crearMarcador(place) {
    // Creamos un marcador
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    // Asignamos el evento click del marcador
    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
btnEstacion.addEventListener('click', buscarEstacionamientos);
