var html = [
    '<div class="row-md-auto">' +
      `<div class="card" id=${i}>` +
      '<div class="card-body">' +
      '<h5 class="card-title">' +
      parsedData.nombre[i] +
      "</h5>" +
      '<p class="card-text">' +
      parsedData.direccion[i] + '<br>'+
      '<b>'+parsedData.costo[i] +'</b>'+
      "</p>" +
      "</div>" +
      "</div>" +
      "</div>",
  ];