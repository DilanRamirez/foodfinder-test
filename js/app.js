var map = L.map("mapid").setView([19.03793, -98.20346], 14);

L.tileLayer(
  "https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=ULohX30zZKHpFLtElHY4",
  {
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
  }
).addTo(map);

const fetchData = async () => {
  const response = await fetch("test.json");
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    const results = data.result;
    console.log(results);

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
      var html = [
        '<div class="col-md-auto">' +
          `<div class="card" id=${i}>` +
            '<div class="card-body">' +
              '<h5 class="card-title">' +
              parsedData.nombre[i] +
              "</h5>" +
              '<p class="card-text">' +
              parsedData.direccion[i] +
              "</p>" +
            "</div>" +
          "</div>" +
        "</div>"
      ];

      $("#container").append(html);

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

      marker
        .bindPopup(
          `<b>${parsedData.nombre[i]}</b><br>
           ${parsedData.direccion[i]}<br>
           ${parsedData.telefono[i]}<br>
           ${parsedData.horario[i]}<br>
           ${parsedData.costo[i]}<br>`
          // '<b>Hello world!</b><br>I am a popup.'
        )
        .openPopup();
    }
    
  }
};
fetchData();
