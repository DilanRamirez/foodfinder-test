import map from "./map.js";

export var layerGroupRestaurantes = [];
const restaurantes = async () => {
  const response = await fetch("restaurantes.json");
  if (response.ok) {
    const data = await response.json();
    const results = data.result;

    const parsedData = {
      nombre: results.records.map((item) => item.Nombre),
      direccion: results.records.map((item) => item.Dirección),
      telefono: results.records.map((item) => item.Teléfono),
      horario: results.records.map((item) => item.Horario),
      costo: results.records.map((item) => item.Costo),
      lat: results.records.map((item) => item.Latitud),
      long: results.records.map((item) => item.Longitud),
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
        title: "Restaurantes",
        icon: firefoxIcon,
      }).addTo(map);

      layerGroupRestaurantes.push(marker);

      marker.bindPopup(
        `<b>${parsedData.nombre[i]}</b><br>
             ${parsedData.direccion[i]}<br>
             ${parsedData.telefono[i]}<br>
             ${parsedData.horario[i]}<br>
             <b>${parsedData.costo[i]}</b><br>`
      );

      marker.on("click", function (e) {
        map.setView([e.latlng.lat, e.latlng.lng], 18);
        for (var i = 0; i < parsedData.nombre.length; i++) {
          if (
            Number(parsedData.lat[i]) === e.latlng.lat &&
            Number(parsedData.long[i]) === e.latlng.lng
          ) {
            var html = [
              '<h2 class="card-title">' +
                parsedData.nombre[i] +
                "</h2>" +
                '<div class="card-subInfo">' +
                "<p>" +
                parsedData.direccion[i] +
                "</p>" +
                '<p class="black-bold"> <b>' +
                parsedData.costo[i] +
                "</div>" +
                "</b></p>" +
                '<div class="card-stars">' +
                '<i class="fa fa-star fa-lg"></i>' +
                '<i class="fa fa-star fa-lg"></i>' +
                '<i class="fa fa-star fa-lg"></i>' +
                "</div>",
            ];

            $("#card-content").append(html);
            map.setView([e.latlng.lat, e.latlng.lng], 12);
          }
        }
        $("#container-card").show();
      });
    }
  }
};

export default restaurantes;
