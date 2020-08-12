import map from "./map.js";

export var layerGroupRestaurantes = [];
const restaurantes = async () => {
  // const response = await fetch("restaurantes.json");
  const responseServer = await fetch(
    "https://abyssinian-hilarious-rayon.glitch.me/restaurantes"
  );
  if (responseServer.ok) {
    // const data = await response.json();
    const dataServer = await responseServer.json();

    console.log(dataServer);

    // const results = data.result;
    // console.log(results);

    const parsedData = {
      nombre: dataServer.map((item) => item.Nombre),
      telefono: dataServer.map((item) => item.Teléfono),
      horario: dataServer.map((item) => item.Horario),
      costo: dataServer.map((item) => item.Costo),
      lat: dataServer.map((item) => item.Latitud),
      long: dataServer.map((item) => item.Longitud),
    };

    console.log(parsedData.nombre);
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
            console.log(parsedData.nombre[i]);
            var html = [
              '<h2 class="card-title">' +
                parsedData.nombre[i] +
                "</h2>" +
                '<div class="card-subInfo">' +
                "<p>" +
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
