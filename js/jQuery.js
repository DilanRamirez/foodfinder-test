import restaurantes, { layerGroupRestaurantes } from "./restaurantes.js";
import fetchData, { layerGroupTuristico } from "./turistico.js";
import map from "./map.js";

$(document).ready(function () {
  $("#mapid").hide();
  $("#buttons").hide();
  $("#container-card").hide();
});

$("#home-btn").click(function () {
  console.log("clicked");
  $("#home").hide();
  $("#mapid").show();
  $("#buttons").show();
});

$("#turisitco").click(function () {
  for (var i = 0; i < layerGroupRestaurantes.length; i++) {
    map.removeLayer(layerGroupRestaurantes[i]);
  }
  fetchData();
});

$("#restaurantes").click(function () {
  for (var i = 0; i < layerGroupTuristico.length; i++) {
    map.removeLayer(layerGroupTuristico[i]);
  }
  map.setView([19.03793, -98.20346], 12);
  restaurantes();
});

$("#close-card").click(function () {
  $("#container-card").hide();
  document.getElementById("card-content").innerHTML = "";
});
