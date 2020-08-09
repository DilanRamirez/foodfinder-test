import map from "./map.js";

//function to get user location and set map to this location, but not working yet
const getUserLocation = () => {
  var userCoords = [];
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      userCoords.push(position.coords.latitude, position.coords.longitude);
      console.log(userCoords);
    });
    return userCoords;
  } else {
    alert("Geolocation is not supported by this browser.");
    return null;
  }
};

//array to store all markers to easy remove
export var layerGroupTuristico = [];

//function to fetch data from turistico.json
const fetchData = async () => {
  const response = await fetch("turistico.json");
  if (response.ok) {
    const data = await response.json(); // data from turistico.json is store in data variable
    const results = data.result;

    //parse all data into a object structure for easy development
    const parsedData = {
      nombre: results.records.map((item) => item.Nombre),
      direccion: results.records.map((item) => item.Dirección),
      telefono: results.records.map((item) => item.Teléfono),
      horario: results.records.map((item) => item.Horario),
      costo: results.records.map((item) => item.Costo),
      lat: results.records.map((item) => item.Latitud),
      long: results.records.map((item) => item.Longitud),
      actualizacion: results.records.map((item) => item.actualizacion),
    };

    for (var i = 0; i < parsedData.nombre.length; i++) {
      var firefoxIcon = L.icon({
        iconUrl:
          "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
        iconSize: [50, 50], // size of the icon
        popupAnchor: [0, -15],
      });

      var marker = L.marker([parsedData.lat[i], parsedData.long[i]], {
        // elevation: 260.0,
        title: "Transamerica Pyramid",
        icon: firefoxIcon,
      }).addTo(map);

      layerGroupTuristico.push(marker);

      marker.bindPopup(
        `<b>${parsedData.nombre[i]}</b><br>
           ${parsedData.direccion[i]}<br>
           ${parsedData.telefono[i]}<br>
           ${parsedData.horario[i]}<br>
           ${parsedData.costo[i]}<br>
           ${parsedData.actualizacion[i]}<br>`
      );

      marker.on("click", function (e) {
        map.setView([e.latlng.lat, e.latlng.lng], 18);
        for (var i = 0; i < parsedData.nombre.length; i++) {
          if (
            Number(parsedData.lat[i]) === e.latlng.lat &&
            Number(parsedData.long[i]) === e.latlng.lng
          ) {
            let costo = String(parsedData.costo[i]);
            if (costo.length > 50) {
              costo = costo.substring(0, 50);
            }
            console.log(costo);
            var html = [
              '<h2 class="card-title">' +
                parsedData.nombre[i] +
                "</h2>" +
                '<div class="card-subInfo">' +
                "<p>" +
                parsedData.direccion[i] +
                "</p>" +
                '<p class="black-bold"> <b>' +
                costo +
                "</b></p>" +
                '<div class="card-stars">' +
                '<i class="fa fa-star fa-lg"></i>' +
                '<i class="fa fa-star fa-lg"></i>' +
                '<i class="fa fa-star fa-lg"></i>' +
                "</div>",
            ];

            $("#card-content").append(html);
            map.setView([e.latlng.lat, e.latlng.lng], 13);
          }
        }
        $("#container-card").show();
      });
    }
  }
};

export default fetchData;
