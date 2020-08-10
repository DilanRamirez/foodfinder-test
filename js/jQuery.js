import restaurantes, { layerGroupRestaurantes } from "./restaurantes.js";
import fetchData, { layerGroupTuristico } from "./turistico.js";
import map from "./map.js";

$(document).ready(function () {
  $("#mapid").hide();
  $("#buttons").hide();
  $("#container-card").hide();
});

$("#home-btn").click(function () {
  $("#home").hide();
  $("#mapid").show();
  $("#buttons").show();
});

$("#turisitco").click(function () {
  for (var i = 0; i < layerGroupRestaurantes.length; i++) {
    map.removeLayer(layerGroupRestaurantes[i]);
  }
  map.setView([19.03793, -98.20346], 14);
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

$("#like").click(function () {
  $("#likeIcon").toggle("1000");
  $("i", this).toggleClass("far fa-heart fas fa-heart").addClass("likedPink");
});
