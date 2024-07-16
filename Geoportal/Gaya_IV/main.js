let menu_btn = document.getElementById('apps');
let menu_box = document.getElementById('menu_box')

menu_btn.addEventListener('click', () => {
  menu_box.classList.toggle('ul_active');
})


var googleLayerHybrid = new ol.layer.Tile({
  title: "Google Satellite & Roads",
  source: new ol.source.TileImage({
    url: "http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  }),
});

var osm = new ol.layer.Tile({
  source: new ol.source.OSM(),
});
var view = new ol.View({
  center: ol.proj.transform([80.01, 20.05], "EPSG:4326", "EPSG:3857"),
  zoom: 4.8,
});
var map = new ol.Map({
  layers: [],
  target: "map",
  view: view,
});
map.addLayer(googleLayerHybrid);

function Get(yourUrl) {
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", yourUrl, false);
  Httpreq.send();
  return Httpreq.responseText;
}

map.on("click", function (evt) {
  var viewResolution = view.getResolution();
  var layers = map.getLayers();
  var url = "";
  layers.forEach(function (layer, i, layers) {
    if (layer.getVisible()) {
      if (osm == layer || googleLayerHybrid == layer) {
      } else {
        url = layer
          .getSource()
          .getGetFeatureInfoUrl(evt.coordinate, viewResolution, "EPSG:3857", {
            INFO_FORMAT: "application/json",
          });
        var res = encodeURIComponent(url);
        var xx = layer.get("name");

        var status = Get("../php/check_data.php?TYPE=" + res);

        if (status == "1") {
          PopupCenter(
            "../php/attribute.php?TYPE=" + res + "&NAME=" + xx,
            0,
            "200",
            "200"
          );
        }
      }
    }
  });
});

function PopupCenter(url, title, w, h) {
  // Fixes dual-screen position                         Most browsers      Firefox
  var dualScreenLeft =
    window.screenLeft != undefined ? window.screenLeft : window.screenX;
  var dualScreenTop =
    window.screenTop != undefined ? window.screenTop : window.screenY;

  var width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  var height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop + title * 30;
  window.open(
    url,
    title,
    "scrollbars=yes, width=" +
    w +
    ", height=" +
    h +
    ", top=" +
    top +
    ", left=" +
    left
  );
}

//LEGEND
function myFunctionLigend() {
  document.getElementById("infoLigend").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigend").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigend").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisner(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:9;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_BaseMap:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigend").innerHTML;
      }
    }
  });
}

function myFunctionLigendTerrain() {
  document.getElementById("infoLigendTerrain").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigendTerrain").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigendTerrain").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisnerTerrain(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_Terrain:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigendTerrain").innerHTML;
      }
    }
  });
}

function myFunctionLigendLULC() {
  document.getElementById("infoLigendLULC").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigendLULC").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigendLULC").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisnerLULC(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_LULC:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigendLULC").innerHTML;
      }
    }
  });
}

function myFunctionLigendSoil() {
  document.getElementById("infoLigendSoil").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigendSoil").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigendSoil").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisnerSoil(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_Soil:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigendSoil").innerHTML;
      }
    }
  });
}

function myFunctionLigendSuitability() {
  document.getElementById("infoLigendSuitability").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigendSuitability").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigendSuitability").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisnerSuitability(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_Suitability:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigendSuitability").innerHTML;
      }
    }
  });
}

function myFunctionLigendHydrology() {
  document.getElementById("infoLigendHydrology").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigend").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigendHydrology").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisnerHydrology(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:9;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_Hydrology:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigendHydrology").innerHTML;
      }
    }
  });
}

function myFunctionLigend_Surface() {
  document.getElementById("infoLigend_Surface").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigend").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigend_Surface").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisner_Surface(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:9;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_Surface:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigend_Surface").innerHTML;
      }
    }
  });
}

function myFunctionLigend_Sub_Surface() {
  document.getElementById("infoLigend_Sub_Surface").innerHTML = "";
  var Div_Legend = document.getElementById("style_Legend");
  Div_Legend.style.display = "none";
  var lay = map.getLayers();

  var url = "";
  lay.forEach(function (layer, i, lay) {
    if (layer.getVisible()) {
      if (osm == layer || layer == googleLayerHybrid) {
      } else {
        Div_Legend.style.display = "block";
        var xx = layer.get("name");

        var opacity = layer.getOpacity();
        opacity = opacity.toFixed(1);
        var vvv = opacity / 0.1;

        // document.getElementById("infoLigend").innerHTML += checkNameLigendNew(layer)+"<br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:"+xx+"'><br>";

        document.getElementById("infoLigend_Sub_Surface").innerHTML =
          checkNameLigendNew(layer) +
          "<br><input class='slider' type='range' min='1' max='10' value=" +
          vvv +
          " id = " +
          xx +
          " onclick='sliderLisner_Sub_Surface(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:9;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_4_Sub_Surface:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigend_Sub_Surface").innerHTML;
      }
    }
  });
}

function checkNameLigendNew(layerName) {
  layerName = layerName.get("name");
  return layerName;
}

function sliderLisner(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigend();
}

function sliderLisnerTerrain(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigendTerrain();
}


function sliderLisnerLULC(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigendLULC();
}

function sliderLisnerSoil(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigendSoil();
}

function sliderLisnerSuitability(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigendSuitability();
}


function sliderLisnerHydrology(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigendHydrology();
}

function sliderLisner_Surface(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigend_Surface();
}

function sliderLisner_Sub_Surface(val, layerN) {
  var lay = map.getLayers();
  lay.forEach(function (layer, i, lay) {
    var xx = layer.get("name");
    if (layerN == xx) {
      layer.setOpacity(val * 0.1);
    }
  });
  myFunctionLigend_Sub_Surface();
}


//====== Legend Mouse Move =============
var mousePositionLegend;
var offsetLegend = [0, 0];
var divLegend;
var isDownLegend = false;

divLegend = document.getElementById("style_Legend");
divLegend.addEventListener(
  "mousedown",
  function (e) {
    isDownLegend = true;
    offsetLegend = [
      divLegend.offsetLeft - e.clientX,
      divLegend.offsetTop - e.clientY,
    ];
  },
  true
);

document.addEventListener(
  "mouseup",
  function () {
    isDownLegend = false;
  },
  true
);

document.addEventListener(
  "mousemove",
  function (event) {
    event.preventDefault();
    if (isDownLegend) {
      mousePositionLegend = {
        x: event.clientX,
        y: event.clientY,
      };
      divLegend.style.left =
        mousePositionLegend.x + offsetLegend[0] - 16 + "px";
      divLegend.style.top = mousePositionLegend.y + offsetLegend[1] + "px";
    }
  },
  true
);

//BASEMAP ELEMENTS

function BaseMap_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_BaseMap:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function BaseMap_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    BaseMap_toggleLayer(layer, checkBoxId);
  });
}

var BaseMap_layers = {
  Gaya_2_4_Broad_Landform: BaseMap_CreateLayer("Gaya_2_4_Broad_Landform"),
  Gaya_2_4_Landform: BaseMap_CreateLayer("Gaya_2_4_Landform"),
  Gaya_2_4_Landuse: BaseMap_CreateLayer("Gaya_2_4_Landuse"),
  Gaya_2_4_TMU: BaseMap_CreateLayer("Gaya_2_4_TMU"),
  Gaya_2_4_Slope: BaseMap_CreateLayer("Gaya_2_4_Slope")
};

function BaseMap_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }
  myFunctionLigend();
}

Object.keys(BaseMap_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  BaseMap_setupLayerToggle(BaseMap_layers[layerName], checkBoxId);
});


//TERRAIN ELEMENTS
function Terrain_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_Terrain:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function Terrain_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    Terrain_toggleLayer(layer, checkBoxId);
  });
}

var Terrain_layers = {
  Gaya_2_4_Hillshade: Terrain_CreateLayer("Gaya_2_4_Hillshade"),
  Gaya_2_4_Aspect: Terrain_CreateLayer("Gaya_2_4_Aspect"),
  Gaya_2_4_CNBL: Terrain_CreateLayer("Gaya_2_4_CNBL"),
  Gaya_2_4_CND: Terrain_CreateLayer("Gaya_2_4_CND"),
  Gaya_2_4_Elevation: Terrain_CreateLayer("Gaya_2_4_Elevation"),
  Gaya_2_4_LS_Factor: Terrain_CreateLayer("Gaya_2_4_LS_Factor"),
  Gaya_2_4_MRRTF: Terrain_CreateLayer("Gaya_2_4_MRRTF"),
  Gaya_2_4_MRVBF: Terrain_CreateLayer("Gaya_2_4_MRVBF"),
  Gaya_2_4_RSP: Terrain_CreateLayer("Gaya_2_4_RSP"),
  Gaya_2_4_Terrain_Slope: Terrain_CreateLayer("Gaya_2_4_Terrain_Slope"),
  Gaya_2_4_Total_Catchment_Area: Terrain_CreateLayer("Gaya_2_4_Total_Catchment_Area"),
  Gaya_2_4_TWI: Terrain_CreateLayer("Gaya_2_4_TWI"),
  Gaya_2_4_Valley_Depth: Terrain_CreateLayer("Gaya_2_4_Valley_Depth"),
};

function Terrain_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }
  myFunctionLigendTerrain();
}

Object.keys(Terrain_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  Terrain_setupLayerToggle(Terrain_layers[layerName], checkBoxId);
});

//HYDROLOGY ELEMENT

function Hydrology_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_Hydrology:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function Hydrology_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    Hydrology_toggleLayer(layer, checkBoxId);
  });
}

var Hydrology_layers = {
  Gaya_2_4_Drainage: Hydrology_CreateLayer("Gaya_2_4_Drainage"),
  Gaya_2_4_Ahar: Hydrology_CreateLayer("Gaya_2_4_Ahar"),
  Gaya_2_4_Canal: Hydrology_CreateLayer("Gaya_2_4_Canal"),
  Gaya_2_4_Soil_Water_Conservation: Hydrology_CreateLayer("Gaya_2_4_Soil_Water_Conservation"),
  Gaya_2_4_Ground_Water_Potential: Hydrology_CreateLayer("Gaya_2_4_Ground_Water_Potential"),
  Gaya_2_4_Water_Arsenic: Hydrology_CreateLayer("Gaya_2_4_Water_Arsenic"),
  Gaya_2_4_Water_Bicarbonate: Hydrology_CreateLayer("Gaya_2_4_Water_Bicarbonate"),
  Gaya_2_4_Water_BoronSemiTolerantCrop: Hydrology_CreateLayer("Gaya_2_4_Water_BoronSemiTolerantCrop"),
  Gaya_2_4_Water_BoronSensitiveCrop: Hydrology_CreateLayer("Gaya_2_4_Water_BoronSensitiveCrop"),
  Gaya_2_4_Water_BoronTolerantCrop: Hydrology_CreateLayer("Gaya_2_4_Water_BoronTolerantCrop"),
  Gaya_2_4_Water_Calcium: Hydrology_CreateLayer("Gaya_2_4_Water_Calcium"),
  Gaya_2_4_Water_Carbonate: Hydrology_CreateLayer("Gaya_2_4_Water_Carbonate"),
  Gaya_2_4_Water_PlantSensitivity: Hydrology_CreateLayer("Gaya_2_4_Water_PlantSensitivity"),
  Gaya_2_4_Water_WaterSuitabilityIrrigation: Hydrology_CreateLayer("Gaya_2_4_Water_WaterSuitabilityIrrigation"),
  Gaya_2_4_water_ElectricalConductivity: Hydrology_CreateLayer("Gaya_2_4_water_ElectricalConductivity"),
  Gaya_2_4_Water_Magnesium: Hydrology_CreateLayer("Gaya_2_4_Water_Magnesium"),
  Gaya_2_4_Water_PercentSodium: Hydrology_CreateLayer("Gaya_2_4_Water_PercentSodium"),
  Gaya_2_4_Water_PermeabilityHazardIndex: Hydrology_CreateLayer("Gaya_2_4_Water_PermeabilityHazardIndex"),
  Gaya_2_4_Water_Ph: Hydrology_CreateLayer("Gaya_2_4_Water_Ph"),
  Gaya_2_4_Water_Phosphate: Hydrology_CreateLayer("Gaya_2_4_Water_Phosphate"),
  Gaya_2_4_Water_Potassium: Hydrology_CreateLayer("Gaya_2_4_Water_Potassium"),
  Gaya_2_4_Water_ResidualSodiumBicarbonate: Hydrology_CreateLayer("Gaya_2_4_Water_ResidualSodiumBicarbonate"),
  Gaya_2_4_Water_ResidualSodiumCarbonate: Hydrology_CreateLayer("Gaya_2_4_Water_ResidualSodiumCarbonate"),
  Gaya_2_4_Water_SodicityHazard: Hydrology_CreateLayer("Gaya_2_4_Water_SodicityHazard"),
  Gaya_2_4_Water_WaterClass: Hydrology_CreateLayer("Gaya_2_4_Water_WaterClass"),
  Gaya_2_4_Water_SodiumRatio: Hydrology_CreateLayer("Gaya_2_4_Water_SodiumRatio"),
  Gaya_2_4_Water_Sulphate: Hydrology_CreateLayer("Gaya_2_4_Water_Sulphate"),
  Gaya_2_4_Water_TotalDissolvedSolids: Hydrology_CreateLayer("Gaya_2_4_Water_TotalDissolvedSolids"),
  Gaya_2_4_Water_TotalHardness: Hydrology_CreateLayer("Gaya_2_4_Water_TotalHardness"),
  Gaya_2_4_Water_TotalSaltIndex: Hydrology_CreateLayer("Gaya_2_4_Water_TotalSaltIndex")
};

function Hydrology_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }
  myFunctionLigendHydrology();
}

Object.keys(Hydrology_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  Hydrology_setupLayerToggle(Hydrology_layers[layerName], checkBoxId);
});

//SATELLITE ELEMENT
var Gaya_Satellite = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Satellite:Gaya_Satellite" },
  }),
});
Gaya_Satellite.set("name", "Gaya_Satellite");

function Fun_Gaya_Satellite() {
  var checkBox = document.getElementById("myCheck_Gaya_Satellite");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_Satellite);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(Gaya_Satellite);
  }

}


//LULC ELEMENTS

function LULC_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_LULC:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function LULC_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    LULC_toggleLayer(layer, checkBoxId);
  });
}

var LULC_layers = {
  Gaya_2_4_LULC_2011: LULC_CreateLayer("Gaya_2_4_LULC_2011"),
  Gaya_2_4_LULC_2013: LULC_CreateLayer("Gaya_2_4_LULC_2013"),
  Gaya_2_4_LULC_2015: LULC_CreateLayer("Gaya_2_4_LULC_2015"),
  Gaya_2_4_LULC_2019: LULC_CreateLayer("Gaya_2_4_LULC_2019"),
  Gaya_2_4_LULC_2024: LULC_CreateLayer("Gaya_2_4_LULC_2024")
};

function LULC_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }
  myFunctionLigendLULC();
}

Object.keys(LULC_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  LULC_setupLayerToggle(LULC_layers[layerName], checkBoxId);
});

//BOUNDARY ELEMENTS

function Boundary_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_Boundary:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function Boundary_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    Boundary_toggleLayer(layer, checkBoxId);
  });
}

var Boundary_layers = {
  Gaya_2_4_Watershed_Boundary: Boundary_CreateLayer("Gaya_2_4_Watershed_Boundary"),
  Gaya_2_4_Village_Boundary: Boundary_CreateLayer("Gaya_2_4_Village_Boundary"),
  Gaya_2_4_Microwatershed_Boundary: Boundary_CreateLayer("Gaya_2_4_Microwatershed_Boundary"),

};

function Boundary_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }

}

Object.keys(Boundary_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  Boundary_setupLayerToggle(Boundary_layers[layerName], checkBoxId);
});

//SOIL ELEMENTS

function Soil_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_Soil:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function Soil_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    Soil_toggleLayer(layer, checkBoxId);
  });
}

var Soil_layers = {
  Gaya_2_4_Soil_Map: Soil_CreateLayer("Gaya_2_4_Soil_Map"),
  Gaya_2_4_Soil_Depth: Soil_CreateLayer("Gaya_2_4_Soil_Depth"),
  Gaya_2_4_Soil_Erosion: Soil_CreateLayer("Gaya_2_4_Soil_Erosion"),
  Gaya_2_4_Soil_Drainage: Soil_CreateLayer("Gaya_2_4_Soil_Drainage"),
  Gaya_2_4_Surface_Texture: Soil_CreateLayer("Gaya_2_4_Surface_Texture"),
  Gaya_2_4_Land_Capability: Soil_CreateLayer("Gaya_2_4_Land_Capability")
};

function Soil_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }
  myFunctionLigendSoil();
}

Object.keys(Soil_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  Soil_setupLayerToggle(Soil_layers[layerName], checkBoxId);
});

//SUITABILITY ELEMENTS

function Suitability_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_Suitability:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function Suitability_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    Suitability_toggleLayer(layer, checkBoxId);
  });
}

var Suitability_layers = {
  Gaya_2_4_Arhar: Suitability_CreateLayer("Gaya_2_4_Arhar"),
  Gaya_2_4_Horsegram: Suitability_CreateLayer("Gaya_2_4_Horsegram"),
  Gaya_2_4_Kharif_Maize: Suitability_CreateLayer("Gaya_2_4_Kharif_Maize"),
  Gaya_2_4_Kharif_Paddy: Suitability_CreateLayer("Gaya_2_4_Kharif_Paddy"),
  Gaya_2_4_Lentil: Suitability_CreateLayer("Gaya_2_4_Lentil"),
  Gaya_2_4_Potato: Suitability_CreateLayer("Gaya_2_4_Potato"),
  Gaya_2_4_Sesame: Suitability_CreateLayer("Gaya_2_4_Sesame"),
  Gaya_2_4_Summer_Paddy: Suitability_CreateLayer("Gaya_2_4_Summer_Paddy"),
  Gaya_2_4_Wheat: Suitability_CreateLayer("Gaya_2_4_Wheat"),
  Gaya_2_4_Vegetables: Suitability_CreateLayer("Gaya_2_4_Vegetables"),

};

function Suitability_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }
  myFunctionLigendSuitability();
}

Object.keys(Suitability_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  Suitability_setupLayerToggle(Suitability_layers[layerName], checkBoxId);
});

//SURFACE ELEMENTS

function Surface_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_Surface:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function Surface_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    Surface_toggleLayer(layer, checkBoxId);
  });
}

var Surface_layers = {
  Gaya_2_4_Boron: Surface_CreateLayer("Gaya_2_4_Boron"),
  Gaya_2_4_Calcium_Carbonate: Surface_CreateLayer("Gaya_2_4_Calcium_Carbonate"),
  Gaya_2_4_Clay: Surface_CreateLayer("Gaya_2_4_Clay"),
  Gaya_2_4_Copper: Surface_CreateLayer("Gaya_2_4_Copper"),
  Gaya_2_4_Electrical_Conductivity: Surface_CreateLayer("Gaya_2_4_Electrical_Conductivity"),
  Gaya_2_4_Iron: Surface_CreateLayer("Gaya_2_4_Iron"),
  Gaya_2_4_Manganese: Surface_CreateLayer("Gaya_2_4_Manganese"),
  Gaya_2_4_Nitrogen: Surface_CreateLayer("Gaya_2_4_Nitrogen"),
  Gaya_2_4_Organic_Carbon: Surface_CreateLayer("Gaya_2_4_Organic_Carbon"),
  Gaya_2_4_Phosphorus: Surface_CreateLayer("Gaya_2_4_Phosphorus"),
  Gaya_2_4_Potassium: Surface_CreateLayer("Gaya_2_4_Potassium"),
  Gaya_2_4_Sand: Surface_CreateLayer("Gaya_2_4_Sand"),
  Gaya_2_4_Silt: Surface_CreateLayer("Gaya_2_4_Silt"),
  Gaya_2_4_Soil_Reaction: Surface_CreateLayer("Gaya_2_4_Soil_Reaction"),
  Gaya_2_4_Sulphur: Surface_CreateLayer("Gaya_2_4_Sulphur"),
  Gaya_2_4_Zinc: Surface_CreateLayer("Gaya_2_4_Zinc")
};

function Surface_toggleLayer(layer, checkBoxId) {
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

Object.keys(Surface_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  Surface_setupLayerToggle(Surface_layers[layerName], checkBoxId);
});


//SUB_SURFACE ELEMENTS
function Sub_Surface_CreateLayer(layerName) {
  var layer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: { LAYERS: "Gaya_2_4_Sub_Surface:" + layerName },
    }),
  });
  layer.set("name", layerName);
  return layer;
}

function Sub_Surface_setupLayerToggle(layer, checkBoxId) {
  document.getElementById(checkBoxId).addEventListener('change', function () {
    Sub_Surface_toggleLayer(layer, checkBoxId);
  });
}

var Sub_Surface_layers = {
  Gaya_2_4_Sub_Calcium_Carbonate: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Calcium_Carbonate"),
  Gaya_2_4_Sub_Clay: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Clay"),
  Gaya_2_4_Sub_Copper: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Copper"),
  Gaya_2_4_Sub_Electrical_Conductivity: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Electrical_Conductivity"),
  Gaya_2_4_Sub_Iron: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Iron"),
  Gaya_2_4_Sub_Manganese: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Manganese"),
  Gaya_2_4_Sub_Nitrogen: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Nitrogen"),
  Gaya_2_4_Sub_Organic_Carbon: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Organic_Carbon"),
  Gaya_2_4_Sub_Phosphorus: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Phosphorus"),
  Gaya_2_4_Sub_Potassium: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Potassium"),
  Gaya_2_4_Sub_Sand: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Sand"),
  Gaya_2_4_Sub_Silt: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Silt"),
  Gaya_2_4_Sub_Soil_Reaction: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Soil_Reaction"),
  Gaya_2_4_Sub_Sulphur: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Sulphur"),
  Gaya_2_4_Sub_Zinc: Sub_Surface_CreateLayer("Gaya_2_4_Sub_Zinc"),
};

function Sub_Surface_toggleLayer(layer, checkBoxId) {
  var checkBox = document.getElementById(checkBoxId);
  if (checkBox.checked == true) {
    map.addLayer(layer);
    map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);
  } else {
    map.removeLayer(layer);
  }
  myFunctionLigend_Sub_Surface();
}

Object.keys(Sub_Surface_layers).forEach(function (layerName) {
  var checkBoxId = "myCheck_" + layerName;
  Sub_Surface_setupLayerToggle(Sub_Surface_layers[layerName], checkBoxId);
});

//MAP SWITCHER FUNCTIONS
function Fun_Hybrid() {
  map.addLayer(googleLayerHybrid);

  map
    .getView()
    .setCenter(ol.proj.transform([80.01, 20.05], "EPSG:4326", "EPSG:3857"));
  map.getView().setZoom(4.8);
}

function Fun_Street() {
  map.addLayer(osm);

  map
    .getView()
    .setCenter(ol.proj.transform([80.01, 20.05], "EPSG:4326", "EPSG:3857"));
  map.getView().setZoom(4.8);
}



//SURFACE FUNCTIONS





//START single layer olptions



//Layer ARRAY
let layerOption = [
  "Select Layer",
  "Base Map",
  "Soil",
  "Suitability",
  "Hydrology",
  "Soil Water Conservation",
  "Ground Water Potential",
]


//ATTRIBUTE ARRAYS

let basemapAttibute = [

  "Broad Landform",
  "Landform",
  "Landuse",
  "Slope",
  "TMU"
];

let soilAttibute = [
  "Soil Map",
  "Soil Depth",
  "Soil Erosion",
  "Soil Drainage",
  "Surface Texture",
  "Land Capability",
];

let suitabilityAttribute = [
  "Arhar",
  "Horsegram",
  "Kharif Maize",
  "Kharif Paddy",
  "Lentil",
  "Potato",
  "Sesame",
  "Summer Paddy",
  "Wheat",
  "Vegetables",
];

let surfaceAttribute = [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
];

let hydrologyAttribute = [];


//VALUES ARRAYS

let broadLandformLegends = [
  "Hills",
  "Residual Hills",
  "Foothills",
  "Valley",
  "Plateau",
  "Pediment",
  "Gullied land",
  "Undulating upland",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let landFormLegends = [
  "Moderately sloping hill top",
  "Steeply sloping hills",
  "Moderately steeply sloping hills",
  "Moderately sloping hills",
  "Moderately sloping foothills",
  "Steeply sloping residual hill",
  "Moderately steeply sloping residual hill",
  "Gently sloping plateau top",
  "Moderately sloping plateau top",
  "Moderately sloping interhill valley",
  "Gently sloping interhill valley",
  "Moderately sloping broad valley",
  "Gently sloping broad valley",
  "Very gently sloping broad valley",
  "Nearly level broad valley",
  "Very gently sloping valley fill",
  "Moderately sloping upper pediment",
  "Gently sloping upper pediment",
  "Very gently sloping upper pediment",
  "Moderately sloping lower pediment",
  "Gently sloping lower pediment",
  "Very gently sloping lower pediment",
  "Moderately sloping undulating upland",
  "Gently sloping undulating upland",
  "Very gently sloping undulating upland",
  "Moderately sloping gullied land",
  "Very gently sloping gullied land",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let landUseLegends = [
  "Forest",
  "Open scrub",
  "Plantation",
  "Cultivable land",
  "Present fallow",
  "Trees",
  "Fallow",
  "Marshy land",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let slopeLegends = [
  "Gently sloping (3-5%)",
  "Level to nearly level (0-1%)",
  "Moderately sloping (5-10%)",
  "Moderately steeply sloping (10-15%)",
  "Very gently sloping (1-3%)",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let tmuLegends = [
  "G2Os",
  "G2T",
  "G2f",
  "G3Os",
  "G3P",
  "G3Pf",
  "G3T",
  "G3f",
  "G4Os",
  "G4P",
  "G4Pf",
  "G4f",
  "H4F",
  "H4Os",
  "H4a",
  "H4f",
  "H5F",
  "H5Os",
  "H5a",
  "H6F",
  "H6a",
  "Hf4F",
  "Hf4Os",
  "Hf4P",
  "Hf4a",
  "Hf4f",
  "Ht4Os",
  "PeL2Os",
  "PeL2a",
  "PeL3Os",
  "PeL3P",
  "PeL3Pf",
  "PeL3T",
  "PeL3a",
  "PeL3f",
  "PeL3m",
  "PeL4Os",
  "PeL4a",
  "PeU2Os",
  "PeU2a",
  "PeU2f",
  "PeU3F",
  "PeU3Os",
  "PeU3P",
  "PeU3Pf",
  "PeU3a",
  "PeU3f",
  "PeU4F",
  "PeU4Os",
  "PeU4P",
  "PeU4Pf",
  "PeU4a",
  "PeU4f",
  "Pt3F",
  "Pt3Os",
  "Pt4Os",
  "Rh5Os",
  "Rh6Os",
  "Rh6P",
  "UUn2a",
  "UUn3a",
  "UUn4Os",
  "UUn4a",
  "Vb1F",
  "Vb1Os",
  "Vb1f",
  "Vb2F",
  "Vb2Os",
  "Vb2Pf",
  "Vb2a",
  "Vb3F",
  "Vb3Os",
  "Vb3a",
  "Vb3f",
  "Vb4F",
  "Vb4Os",
  "Vb4Pf",
  "Vb4a",
  "Vb4f",
  "Vf2P",
  "Vf2Pf",
  "Vf2a",
  "Vh3a",
  "Vh4F",
  "Vh4Os",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let soilMapLegends = [
  "Bad5cD3",
  "Bag6dC2",
  "Bag6eD1",
  "Bag6fB1",
  "Bag6fD1",
  "Bag6fD2",
  "Bag6gC1",
  "Bag6hB2",
  "Gul6dC3",
  "Gul6mC2",
  "Gur2cF4",
  "Gur2hE4",
  "Kew4cE4g3",
  "Kod5eD3",
  "Lod5cD3",
  "Moc6dB2Cal",
  "Reh6eC2",
  "Ren5cD3",
  "Rud5cB4",
  "Rud5cC4",
  "Rud5cC5",
  "Rud5fC4",
  "Rud5fC5",
  "Tar6mB2",
  "Tar6mB3",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let soilDepthLegends = [
  "Deep",
  "Very deep",
  "Moderately deep",
  "Shallow",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let soilErosionLegends = [
  "Very severe",
  "Severe",
  "Moderate",
  "Slight",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let soilDrainageLegends = [
  "Excessive",
  "Well",
  "Somewhat poor",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let surfaceTextureLegends = [
  "Clay",
  "Loam",
  "Clay loam",
  "Silty clay loam",
  "Silt loam",
  "Sandy loam",
  "Sandy clay loam",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let landCapabilityLegends = [
  "IVe4s3t3",
  "IIe3s2t2",
  "IIe2s3t1",
  "IIe2s2t3",
  "IIe2s2t2",
  "IIe2s2t1",
  "IIe2s1t2",
  "IIIe4s3t2",
  "IIIe3s3t3",
  "IIIe3s3t2",
  "IIIe3s3t1",
  "IIIe3s2t3",
  "IIIe3s2t2",
  "IIIe3s1t3",
  "IIIe2s3t1",
  "IIIe2s2t2",
  "IIIe2s2t1",
  "IIIe2s1t3",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];

let ArharLegends = [
  "S1",
  "S2f",
  "S2fs",
  "S2fst",
  "S2fw",
  "S3fs",
  "S3st",
  "S3fst",
  "S3fw",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let HorsegramLegends = [
  "S1",
  "S2f",
  "S2fs",
  "S2fst",
  "S2fw",
  "S3st",
  "S3fw",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let KharifMaizeLegends = [
  "N2",
  "S2f",
  "S2fs",
  "S2fw",
  "S3f",
  "S3fs",
  "S3fst",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let KharifPaddyLegends = [
  "N1fs",
  "N1fst",
  "N2",
  "S1",
  "S2f",
  "S2s",
  "S3fs",
  "S3fst",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let LentilLegends = [
  "N1fs",
  "N1fst",
  "N2",
  "S1",
  "S2f",
  "S2fs",
  "S2fw",
  "S3fs",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let PotatoLegends = [
  "N2",
  "S2f",
  "S2fs",
  "S2fw",
  "S3f",
  "S3fs",
  "S3fst",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let SesameLegends = [
  "N2",
  "S1",
  "S2f",
  "S2fs",
  "S2fw",
  "S3fs",
  "S3fst",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let SummerPaddyLegends = [
  "N1fs",
  "N1fst",
  "N2",
  "S1",
  "S2f",
  "S2s",
  "S3fs",
  "S3fst",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let WheatLegends = [
  "N2",
  "S2f",
  "S2fs",
  "S2fw",
  "S3f",
  "S3fs",
  "S3fst",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];
let VegetablesLegends = [
  "N1fst",
  "N2",
  "S2f",
  "S2fs",
  "S2fw",
  "S3f",
  "S3fs",
  "Brick kiln",
  "Built up",
  "Habitation with cultivation",
  "Charland",
  "River",
  "Waterbody",
  "Waterbody seasonal"
];


let selectLayer = document.getElementById("selectLayer");
let selectAttribute = document.getElementById("selectAttribute");
let selectValue = document.getElementById("selectValue");


const attributeMapping = {
  "Base Map": basemapAttibute,
  "Soil": soilAttibute,
  "Suitability": suitabilityAttribute,
  "Surface": surfaceAttribute,
};
const valueMapping = {
  "Broad Landform": broadLandformLegends,
  "Landform": landFormLegends,
  "Landuse": landUseLegends,
  "Slope": slopeLegends,
  "TMU": tmuLegends,
  "Soil Map": soilMapLegends,
  "Soil Depth": soilDepthLegends,
  "Soil Erosion": soilErosionLegends,
  "Soil Drainage": soilDrainageLegends,
  "Surface Texture": surfaceTextureLegends,
  "Land Capability": landCapabilityLegends,
  "Arhar": ArharLegends,
  "Horsegram": HorsegramLegends,
  "Kharif Maize": KharifMaizeLegends,
  "Kharif Paddy": KharifPaddyLegends,
  "Lentil": LentilLegends,
  "Potato": PotatoLegends,
  "Sesame": SesameLegends,
  "Summer Paddy": SummerPaddyLegends,
  "Wheat": WheatLegends,
  "Vegetables": VegetablesLegends
};

layerOption.forEach(item => addOption(selectLayer, item));

selectLayer.onchange = function () {
  updateSelectOptions(selectAttribute, "Select Layer", attributeMapping[this.value]);
};

selectAttribute.onchange = function () {
  updateSelectOptions(selectValue, "Select Layer", valueMapping[this.value]);
};

function addOption(select, item) {
  let option = document.createElement("option");
  option.text = item;
  option.value = item;
  select.appendChild(option);
}

function updateSelectOptions(select, defaultText, options) {
  select.innerHTML = `<option>${defaultText}</option>`;
  if (options) options.forEach(item => addOption(select, item));
}
//END single layer olptions

/* Main Var For Single layer Query */

var Gaya_2_4_BaseMap = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_4_BaseMap:Gaya_2_4_BaseMap" },
  }),
});
Gaya_2_4_BaseMap.set("name", "Gaya_2_4_BaseMap");

var Gaya_2_4_Soil = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_4_Soil:Gaya_2_4_Soil" },
  }),
});
Gaya_2_4_Soil.set("name", "Gaya_2_4_Soil");

var Gaya_2_4_Suitability = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_4_Suitability:Gaya_2_4_Suitability" },
  }),
});
Gaya_2_4_Suitability.set("name", "Gaya_2_4_Suitability");

//START SINGLE LAYER QUERY
function updateMapBaseMap(cqlFilter) {
  clearLayers();
  map.addLayer(Gaya_2_4_BaseMap);

  Gaya_2_4_BaseMap.getSource().updateParams({
    cql_filter: cqlFilter,
  });

  map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
  map.getView().setZoom(12);

  myFunctionLigend();
}

function updateMapSoil(cqlFilter) {
  clearLayers();
  map.addLayer(Gaya_2_4_Soil);

  Gaya_2_4_Soil.getSource().updateParams({
    cql_filter: cqlFilter,
  });

  map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
  map.getView().setZoom(12);

  myFunctionLigendSoil();
}

function updateMapSuitability(cqlFilter) {
  clearLayers();
  map.addLayer(Gaya_2_4_Suitability);

  Gaya_2_4_Suitability.getSource().updateParams({
    cql_filter: cqlFilter,
  });

  map.getView().setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
  map.getView().setZoom(12);

  myFunctionLigendSuitability();
}

function singleQueryRun() {
  const attribute = selectAttribute.value;
  const value = selectValue.value;

  switch (attribute) {
    case "Broad Landform":
      updateMapBaseMap(`BroadLandf='${value}'`);
      break;
    case "Landform":
      updateMapBaseMap(`Landform='${value}'`);
      break;
    case "Landuse":
      updateMapBaseMap(`Landuse='${value}'`);
      break;
    case "Slope":
      updateMapBaseMap(`Slope='${value}'`);
      break;
    case "TMU":
      updateMapBaseMap(`TMU='${value}'`);
      break;
    case "Soil Map":
      updateMapSoil(`SoilLegend='${value}'`);
      break;
    case "Soil Depth":
      updateMapSoil(`SoilDepth='${value}'`);
      break;
    case "Soil Erosion":
      updateMapSoil(`Erosion='${value}'`);
      break;
    case "Soil Drainage":
      updateMapSoil(`Drainage='${value}'`);
      break;
    case "Surface Texture":
      updateMapSoil(`SurfacText='${value}'`);
      break;
    case "Land Capability":
      updateMapSoil(`Landcapabi='${value}'`);
      break;
    case "Arhar":
      updateMapSuitability(`Arhar='${value}'`);
      break;
    case "Horsegram":
      updateMapSuitability(`Horsegram='${value}'`);
      break;
    case "Kharif Maize":
      updateMapSuitability(`KharifMaiz='${value}'`);
      break;
    case "Kharif Paddy":
      updateMapSuitability(`KharifPadd='${value}'`);
      break;
    case "Lentil":
      updateMapSuitability(`Lentil='${value}'`);
      break;
    case "Potato":
      updateMapSuitability(`Potato='${value}'`);
      break;
    case "Sesame":
      updateMapSuitability(`Sesame='${value}'`);
      break;
    case "Summer Paddy":
      updateMapSuitability(`SummerPadd='${value}'`);
      break;
    case "Wheat":
      updateMapSuitability(`Wheat='${value}'`);
      break;
    case "Vegetables":
      updateMapSuitability(`Vegetables='${value}'`);
      break;
  }
}
//End SINGLE LAYER QUERY


//START multi layer olptions

// Option Creation
function addLayerOptions(selectElement) {
  layerOption.forEach(function (item) {
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    selectElement.appendChild(option);
  });
}

addLayerOptions(multiSelectLayer1);
addLayerOptions(multiSelectLayer2);
addLayerOptions(multiSelectLayer3);
addLayerOptions(multiSelectLayer4);

// Event Handling
function handleLayerChange(multiSelectLayer, multiSelectAttribute) {
  multiSelectLayer.onchange = function () {
    multiSelectAttribute.innerHTML = "<option></option>";
    let legends = [];

    switch (this.value) {
      case "Gaya TMU":
        legends = tmuLegends;
        break;
      case "Gaya Landform":
        legends = landFormLegends;
        break;
      case "Gaya Landuse":
        legends = landUseLegends;
        break;
      case "Gaya Slope":
        legends = slopeLegends;
        break;
    }

    legends.forEach(function (item) {
      let option = document.createElement("option");
      option.text = item;
      option.value = item;
      multiSelectAttribute.appendChild(option);
    });
  };
}

handleLayerChange(multiSelectLayer1, multiSelectAttribute1);
handleLayerChange(multiSelectLayer2, multiSelectAttribute2);
handleLayerChange(multiSelectLayer3, multiSelectAttribute3);
handleLayerChange(multiSelectLayer4, multiSelectAttribute4);
//END multi layer olptions



//START MULTi LAYER QUERY
function multiQueryRun() {


  if (multiSelectLayer1.value) {
    multiQuery1();
  }
  if (multiSelectLayer2.value) {
    multiQuery2();
  }
  if (multiSelectLayer3.value) {
    multiQuery3();
  }
  if (multiSelectLayer4.value) {
    multiQuery4();
  }
}


function multiQuery1() {
  if (multiSelectLayer1.value == "Gaya TMU") {
    map.removeLayer(Gaya_TMU);
    map.addLayer(Gaya_TMU);

    Gaya_TMU.getSource().updateParams({
      cql_filter: "TMUEdit2='" + multiSelectAttribute1.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer1.value == "Gaya Landform") {
    map.removeLayer(Gaya_Landform);
    map.addLayer(Gaya_Landform);

    Gaya_Landform.getSource().updateParams({
      cql_filter: "Landform='" + multiSelectAttribute1.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer1.value == "Gaya Landuse") {
    map.removeLayer(Gaya_Landuse);
    map.addLayer(Gaya_Landuse);

    Gaya_Landuse.getSource().updateParams({
      cql_filter: "Landuse='" + multiSelectAttribute1.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }

  if (multiSelectLayer1.value == "Gaya Slope") {

    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute1.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  return true;
}
function multiQuery2() {
  if (multiSelectLayer2.value == "Gaya TMU") {
    map.removeLayer(Gaya_TMU);
    map.addLayer(Gaya_TMU);

    Gaya_TMU.getSource().updateParams({
      cql_filter: "TMUEdit2='" + multiSelectAttribute2.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer2.value == "Gaya Landform") {
    map.removeLayer(Gaya_Landform);
    map.addLayer(Gaya_Landform);

    Gaya_Landform.getSource().updateParams({
      cql_filter: "Landform='" + multiSelectAttribute2.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer2.value == "Gaya Landuse") {
    map.removeLayer(Gaya_Landuse);
    map.addLayer(Gaya_Landuse);

    Gaya_Landuse.getSource().updateParams({
      cql_filter: "Landuse='" + multiSelectAttribute2.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }

  if (multiSelectLayer2.value == "Gaya Slope") {

    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute2.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  return true;
}
function multiQuery3() {
  if (multiSelectLayer3.value == "Gaya TMU") {
    map.removeLayer(Gaya_TMU);
    map.addLayer(Gaya_TMU);

    Gaya_TMU.getSource().updateParams({
      cql_filter: "TMUEdit2='" + multiSelectAttribute3.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer3.value == "Gaya Landform") {
    map.removeLayer(Gaya_Landform);
    map.addLayer(Gaya_Landform);

    Gaya_Landform.getSource().updateParams({
      cql_filter: "Landform='" + multiSelectAttribute3.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer3.value == "Gaya Landuse") {

    map.removeLayer(Gaya_Landuse);
    map.addLayer(Gaya_Landuse);

    Gaya_Landuse.getSource().updateParams({
      cql_filter: "Landuse='" + multiSelectAttribute3.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }

  if (multiSelectLayer3.value == "Gaya Slope") {

    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute3.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  return true;
}

function multiQuery4() {
  if (multiSelectLayer4.value == "Gaya TMU") {
    map.removeLayer(Gaya_TMU);
    map.addLayer(Gaya_TMU);

    Gaya_TMU.getSource().updateParams({
      cql_filter: "TMUEdit2='" + multiSelectAttribute4.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer4.value == "Gaya Landform") {
    map.removeLayer(Gaya_Landform);
    map.addLayer(Gaya_Landform);

    Gaya_Landform.getSource().updateParams({
      cql_filter: "Landform='" + multiSelectAttribute4.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  if (multiSelectLayer4.value == "Gaya Landuse") {
    map.removeLayer(Gaya_Landuse);
    map.addLayer(Gaya_Landuse);

    Gaya_Landuse.getSource().updateParams({
      cql_filter: "Landuse='" + multiSelectAttribute4.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }

  if (multiSelectLayer4.value == "Gaya Slope") {

    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute4.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.54], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12);

    myFunctionLigend();
  }
  return true;
}

function multiQueryRun() {
  return multiQuery1() &&
    multiQuery2() &&
    multiQuery3() &&
    multiQuery4();
}


//END MULTi LAYER QUERY

function clearLayers() {
  map.removeLayer(Gaya_2_4_BaseMap);
  map.removeLayer(Gaya_2_4_Soil);
  map.removeLayer(Gaya_2_4_Suitability);
  map.removeLayer(myFunctionLigend());

  /* Gaya_2_4_TMU.getSource().updateParams({ cql_filter: null });
  Gaya_2_4_Landform.getSource().updateParams({ cql_filter: null }); */
}

const singleQueryContainer = document.querySelector("#attQueryDiv");
const multiQueryContainer = document.querySelector("#multiAttQueryDiv");
let isClick = true;
/* function singleQueryBoxShowOrHide(){
  if(isClick){
     singleQueryContainer.style.display = 'block';
     isClick = false;
  }
  else{
    singleQueryContainer.style.display = 'none';
    isClick = true;
  }
 
}

function MultiQueryBoxShowOrHide(){
  if(isClick){
     multiQueryContainer.style.display = 'block';
     
     isClick = false;
  }
  else{
    multiQueryContainer.style.display = 'none';
    isClick = true;
  }
 
} */

function singleQueryBoxShowOrHide() {
  if (isClick) {
    singleQueryContainer.style.display = "block";
    multiQueryContainer.style.display = "none";
    isClick = false;
  } else {
    singleQueryContainer.style.display = "none";
    isClick = true;
  }
}

function MultiQueryBoxShowOrHide() {
  if (isClick) {
    singleQueryContainer.style.display = "none";
    multiQueryContainer.style.display = "block";

    isClick = false;
  } else {
    multiQueryContainer.style.display = "none";
    isClick = true;
  }
}

const navbarContainer = document.querySelector("#navbar");

function navbarShowOrHide() {
  if (isClick) {
    navbarContainer.style.display = "none";

    isClick = false;
  } else {
    navbarContainer.style.display = "block";

    isClick = true;
  }
}
