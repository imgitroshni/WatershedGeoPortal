function Satellite_CreateLayer(layerName) {
    var layer = new ol.layer.Tile({
      source: new ol.source.TileWMS({
        url: "http://localhost:8080/geoserver/wms",
        params: { LAYERS: "NBSS_GeoServer_Satellite:" + layerName },
      }),
    });
    layer.set("name", layerName);
    return layer;
  }
  
  function Satellite_setupLayerToggle(layer, checkBoxId) {
    document.getElementById(checkBoxId).addEventListener('change', function() {
      Satellite_toggleLayer(layer, checkBoxId);
    });
  }
  
  var Satellite_layers = {
    Gaya_Satellite: Satellite_CreateLayer("Gaya_Satellite")
  };
  
  function Satellite_toggleLayer(layer, checkBoxId) {
    var checkBox = document.getElementById(checkBoxId);
    if (checkBox.checked == true) {
      map.addLayer(layer);
      map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
      map.getView().setZoom(12);
    } else {
      map.removeLayer(layer);
    }
    myFunctionLigend_Surface();
  }
  
  Object.keys(Satellite_layers).forEach(function(layerName) {
    var checkBoxId = "myCheck_" + layerName;
    Satellite_setupLayerToggle(Satellite_layers[layerName], checkBoxId);
  });
  