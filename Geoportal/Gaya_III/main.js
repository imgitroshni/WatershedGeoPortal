let menu_btn = document.getElementById('apps');
let menu_box = document.getElementById('menu_box')

menu_btn.addEventListener('click', ()=>{
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
          " onclick='sliderLisner(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:9;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer:" +
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
          " onclick='sliderLisnerTerrain(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_3_Terrain:" +
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
          " onclick='sliderLisnerLULC(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_3_LULC:" +
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
          " onclick='sliderLisnerSoil(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer_Soil:" +
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
          " onclick='sliderLisnerSuitability(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:10;bgColor:0xFFFFEE;dpi:180&LAYER=NBSS_GeoServer_Suitability:" +
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
          " onclick='sliderLisnerHydrology(this.value,this.id)'><br><img src='http://localhost:8080/geoserver/wms?Service=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:9;bgColor:0xFFFFEE;dpi:180&LAYER=Gaya_2_3_Hydrology:" +
          xx +
          "'><br>" +
          document.getElementById("infoLigendHydrology").innerHTML;
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

var Gaya_Broad_Landform = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer:Gaya_Broad_Landform" },
  }),
});
Gaya_Broad_Landform.set("name", "Gaya_Broad_Landform");

var Gaya_Landform = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer:Gaya_Landform" },
  }),
});
Gaya_Landform.set("name", "Gaya_Landform");

var Gaya_Landuse = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer:Gaya_Landuse" },
  }),
});
Gaya_Landuse.set("name", "Gaya_Landuse");

var Gaya_TMU = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer:Gaya_TMU" },
  }),
});
Gaya_TMU.set("name", "Gaya_TMU");

var Gaya_Slope = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer:Gaya_Slope" },
  }),
});
Gaya_Slope.set("name", "Gaya_Slope");

//TERRAIN ELEMENTS
var Gaya_2_3_Hillshade = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_Hillshade" },
  }),
});
Gaya_2_3_Hillshade.set("name", "Gaya_2_3_Hillshade");

var Gaya_2_3_Aspect = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_Aspect" },
  }),
});
Gaya_2_3_Aspect.set("name", "Gaya_2_3_Aspect");



var Gaya_2_3_CNBL = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_CNBL" },
  }),
});
Gaya_2_3_CNBL.set("name", "Gaya_2_3_CNBL");

var Gaya_2_3_CND = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_CND" },
  }),
});
Gaya_2_3_CND.set("name", "Gaya_2_3_CND");


var Gaya_2_3_Elevation = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_Elevation" },
  }),
});
Gaya_2_3_Elevation.set("name", "Gaya_2_3_Elevation");

var Gaya_2_3_LS_Factor = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_LS_Factor" },
  }),
});
Gaya_2_3_LS_Factor.set("name", "Gaya_2_3_LS_Factor");

var Gaya_2_3_MRRTF = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_MRRTF" },
  }),
});
Gaya_2_3_MRRTF.set("name", "Gaya_2_3_MRRTF");

var Gaya_2_3_MRVBF = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_MRVBF" },
  }),
});
Gaya_2_3_MRVBF.set("name", "Gaya_2_3_MRVBF");





var Gaya_2_3_Terrain_Slope = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_Terrain_Slope" },
  }),
});
Gaya_2_3_Terrain_Slope.set("name", "Gaya_2_3_Terrain_Slope");

 

var Gaya_2_3_Total_Catchment_Area = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_Total_Catchment_Area" },
  }),
});
Gaya_2_3_Total_Catchment_Area.set("name", "Gaya_2_3_Total_Catchment_Area");

var Gaya_2_3_TWI = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_TWI" },
  }),
});
Gaya_2_3_TWI.set("name", "Gaya_2_3_TWI");

var Gaya_2_3_Valley_Depth = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Terrain:Gaya_2_3_Valley_Depth" },
  }),
});
Gaya_2_3_Valley_Depth.set("name", "Gaya_2_3_Valley_Depth");

//HYDROLOGY ELEMENT

var Gaya_2_3_Drainage = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Hydrology:Gaya_2_3_Drainage" },
  }),
});
Gaya_2_3_Drainage.set("name", "Gaya_2_3_Drainage");

var Gaya_2_3_Ahar = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Hydrology:Gaya_2_3_Ahar" },
  }),
});
Gaya_2_3_Ahar.set("name", "Gaya_2_3_Ahar");

var Gaya_2_3_Canal = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Hydrology:Gaya_2_3_Canal" },
  }),
});
Gaya_2_3_Canal.set("name", "Gaya_2_3_Canal");

var Soil_Water_Conservation = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Hydrology:Soil_Water_Conservation" },
  }),
});
Soil_Water_Conservation.set("name", "Soil_Water_Conservation");

var Ground_Water_Potential = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Hydrology:Ground_Water_Potential" },
  }),
});
Ground_Water_Potential.set("name", "Ground_Water_Potential");



//SATELLITE ELEMENT
var Gaya_Satellite = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Satellite:Gaya_Satellite" },
  }),
});
Gaya_Satellite.set("name", "Gaya_Satellite");

var Banka_satellite = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Satellite:Banka_Satellite" },
  }),
});
Banka_satellite.set("name", "Banka_satellite");


//LULC ELEMENTS
var Gaya_2_3_LULC_2011 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_LULC:Gaya_2_3_LULC_2011" },
  }),
});
Gaya_2_3_LULC_2011.set("name", "Gaya_2_3_LULC_2011");

var Gaya_2_3_LULC_2013 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_LULC:Gaya_2_3_LULC_2013" },
  }),
});
Gaya_2_3_LULC_2013.set("name", "Gaya_2_3_LULC_2013");

var Gaya_2_3_LULC_2016 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_LULC:Gaya_2_3_LULC_2016" },
  }),
});
Gaya_2_3_LULC_2016.set("name", "Gaya_2_3_LULC_2016");

var Gaya_2_3_LULC_2019 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_LULC:Gaya_2_3_LULC_2019" },
  }),
});
Gaya_2_3_LULC_2019.set("name", "Gaya_2_3_LULC_2019");

var Gaya_2_3_LULC_2024 = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_LULC:Gaya_2_3_LULC_2024" },
  }),
});
Gaya_2_3_LULC_2024.set("name", "Gaya_2_3_LULC_2024");


//BOUNDARY ELEMENTS
var Gaya_2_3_Watershed_Boundary = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Boundary:Gaya_2_3_Watershed_Boundary" },
  }),
});
Gaya_2_3_Watershed_Boundary.set("name", "Gaya_2_3_Watershed_Boundary");

var Gaya_2_3_Village_Boundary = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Boundary:Gaya_2_3_Village_Boundary" },
  }),
});
Gaya_2_3_Village_Boundary.set("name", "Gaya_2_3_Village_Boundary");

var Gaya_2_3_Micro_Watershed_Boundary = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "Gaya_2_3_Boundary:Gaya_2_3_Micro_Watershed_Boundary" },
  }),
});
Gaya_2_3_Micro_Watershed_Boundary.set("name", "Gaya_2_3_Micro_Watershed_Boundary");



//SOIL ELEMENTS

var Soil_Map = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Soil:Soil_Map" },
  }),
});
Soil_Map.set("name", "Soil_Map");

var Soil_Depth = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Soil:Soil_Depth" },
  }),
});
Soil_Depth.set("name", "Soil_Depth");

var Soil_Erosion = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Soil:Soil_Erosion" },
  }),
});
Soil_Erosion.set("name", "Soil_Erosion");

var Soil_Gaya_2_3_Drainage = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Soil:Soil_Gaya_2_3_Drainage" },
  }),
});
Soil_Gaya_2_3_Drainage.set("name", "Soil_Gaya_2_3_Drainage");

var Surface_Texture = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "	NBSS_GeoServer_Soil:Surface_Texture" },
  }),
});
Surface_Texture.set("name", "Surface_Texture");

var Land_Capability = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Soil:Land_Capability" },
  }),
});
Land_Capability.set("name", "Land_Capability");


//SUITABILITY ELEMENTS
var Arhar = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Arhar" },
  }),
});
Arhar.set("name", "Arhar");

var Horsegram = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Horsegram" },
  }),
});
Horsegram.set("name", "Horsegram");

var Kharif_Maize = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Kharif_Maize" },
  }),
});
Kharif_Maize.set("name", "Kharif_Maize");

var Kharif_Paddy = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Kharif_Paddy" },
  }),
});
Kharif_Paddy.set("name", "Kharif_Paddy");

var Lentil = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Lentil" },
  }),
});
Lentil.set("name", "Lentil");

var Potato = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Potato" },
  }),
});
Potato.set("name", "Potato");


var Sesame = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Sesame" },
  }),
});
Sesame.set("name", "Sesame");


var Summer_Paddy = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Summer_Paddy" },
  }),
});
Summer_Paddy.set("name", "Summer_Paddy");

var Wheat = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Wheat" },
  }),
});
Wheat.set("name", "Wheat");


var Vegetables = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/wms",
    params: { LAYERS: "NBSS_GeoServer_Suitability:Vegetables" },
  }),
});
Vegetables.set("name", "Vegetables");


//BASEMAP FUNCTIONS

function Fun_Gaya_Broad_Landform() {
  var checkBox = document.getElementById("myCheck_Gaya_Broad_Landform");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_Broad_Landform);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_Broad_Landform);
  }
  myFunctionLigend();
}

function Fun_Gaya_Landform() {
  var checkBox = document.getElementById("myCheck_Gaya_Landform");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_Landform);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_Landform);
  }
  myFunctionLigend();
}

function Fun_Gaya_Landuse() {
  var checkBox = document.getElementById("myCheck_Gaya_Landuse");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_Landuse);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_Landuse);
  }
  myFunctionLigend();
}

function Fun_Gaya_TMU() {
  var checkBox = document.getElementById("myCheck_Gaya_TMU");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_TMU);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_TMU);
  }
  myFunctionLigend();
}
function Fun_Gaya_Slope() {
  var checkBox = document.getElementById("myCheck_Gaya_Slope");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_Slope);

    //Gaya_Slope.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_Slope);
  }
  myFunctionLigend();
}

//TERRAIN FUNCTIONS

function Fun_Gaya_2_3_Hillshade() {
  var checkBox = document.getElementById(
    "myCheck_Gaya_2_3_Hillshade"
  );
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Hillshade);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Hillshade);
  }
  myFunctionLigendTerrain();
}

function Fun_Gaya_2_3_Aspect() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Aspect");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Aspect);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Aspect);
  }
  myFunctionLigendTerrain();
}



function Fun_Gaya_2_3_CNBL() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_CNBL");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_CNBL);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_CNBL);
  }
  myFunctionLigendTerrain();
}

function Fun_Gaya_2_3_CND() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_CND");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_CND);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_CND);
  }
  myFunctionLigendTerrain();
}



function Fun_Gaya_2_3_Elevation() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Elevation");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Elevation);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Elevation);
  }
  myFunctionLigendTerrain();
}

function Fun_Gaya_2_3_LS_Factor() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_LS_Factor");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_LS_Factor);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_LS_Factor);
  }
  myFunctionLigendTerrain();
}

function Fun_Gaya_2_3_MRRTF() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_MRRTF");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_MRRTF);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_MRRTF);
  }
  myFunctionLigendTerrain();
}

function Fun_Gaya_2_3_MRVBF() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_MRVBF");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_MRVBF);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_MRVBF);
  }
  myFunctionLigendTerrain();
}


function Fun_Gaya_2_3_Terrain_Slope() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Terrain_Slope");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Terrain_Slope);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Terrain_Slope);
  }
  myFunctionLigendTerrain();
}


function Fun_Gaya_2_3_Total_Catchment_Area() {
  var checkBox = document.getElementById(
    "myCheck_Gaya_2_3_Total_Catchment_Area"
  );
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Total_Catchment_Area);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Total_Catchment_Area);
  }
  myFunctionLigendTerrain();
}

function Fun_Gaya_2_3_TWI() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_TWI");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_TWI);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_TWI);
  }
  myFunctionLigendTerrain();
}

function Fun_Gaya_2_3_Valley_Depth() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Valley_Depth");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Valley_Depth);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Valley_Depth);
  }
  myFunctionLigendTerrain();
}

//HYDROLOGY FUNCTIONS

function Fun_Gaya_2_3_Drainage() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Drainage");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Drainage);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_2_3_Drainage);
  }
}

function Fun_Gaya_2_3_Ahar() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Ahar");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Ahar);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_2_3_Ahar);
  }
}

function Fun_Gaya_2_3_Canal() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Canal");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Canal);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_2_3_Canal);
  }
}

function Fun_Soil_Water_Conservation() {
  var checkBox = document.getElementById("myCheck_Soil_Water_Conservation");
  if (checkBox.checked == true) {
    map.addLayer(Soil_Water_Conservation);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Soil_Water_Conservation);
  }
  myFunctionLigendHydrology();
}

function Fun_Ground_Water_Potential() {
  var checkBox = document.getElementById("myCheck_Ground_Water_Potential");
  if (checkBox.checked == true) {
    map.addLayer(Ground_Water_Potential);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Ground_Water_Potential);
  }
  myFunctionLigendHydrology();
}



//SATELLITE FUNCTIONS
function Fun_Gaya_Satellite() {
  var checkBox = document.getElementById("myCheck_Gaya_Satellite");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_Satellite);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Gaya_Satellite);
  }
  
}
function Fun_Banka_satellite() {
  var checkBox = document.getElementById("myCheck_Banka_satellite");
  if (checkBox.checked == true) {
    map.addLayer(Banka_satellite);

    map
      .getView()
      .setCenter(ol.proj.transform([86.67, 24.61], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Banka_satellite);
  }
  
}

//LULC FUNCTIONS
function Fun_Gaya_2_3_LULC_2011() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_LULC_2011");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_LULC_2011);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_LULC_2011);
  }
  myFunctionLigendLULC();
  }

function Fun_Gaya_2_3_LULC_2013() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_LULC_2013");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_LULC_2013);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_LULC_2013);
  }
  myFunctionLigendLULC()
  }
  function Fun_Gaya_2_3_LULC_2016() {
    var checkBox = document.getElementById("myCheck_Gaya_2_3_LULC_2016");
    if (checkBox.checked == true) {
      map.addLayer(Gaya_2_3_LULC_2016);
  
      map
        .getView()
        .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
      map.getView().setZoom(12.5);
    } else {
      map.removeLayer(Gaya_2_3_LULC_2016);
    }
    myFunctionLigendLULC()
    }
function Fun_Gaya_2_3_LULC_2019() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_LULC_2019");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_LULC_2019);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_LULC_2019);
  }
  myFunctionLigendLULC()
}
function Fun_Gaya_2_3_LULC_2024() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_LULC_2024");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_LULC_2024);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_LULC_2024);
  }
  myFunctionLigendLULC()
}

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


//BOUNDARY FUNCTION
function Fun_Gaya_2_3_Watershed_Boundary() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Watershed_Boundary");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Watershed_Boundary);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Watershed_Boundary);
  }
}
function Fun_Gaya_2_3_Village_Boundary() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Village_Boundary");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Village_Boundary);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Village_Boundary);
  }
}
function Fun_Gaya_2_3_Micro_Watershed_Boundary() {
  var checkBox = document.getElementById("myCheck_Gaya_2_3_Micro_Watershed_Boundary");
  if (checkBox.checked == true) {
    map.addLayer(Gaya_2_3_Micro_Watershed_Boundary);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(12.5);
  } else {
    map.removeLayer(Gaya_2_3_Micro_Watershed_Boundary);
  }
}


//SOIL FUNCTIONS

function Fun_Soil_Map() {
  var checkBox = document.getElementById("myCheck_Soil_Map");
  if (checkBox.checked == true) {
    map.addLayer(Soil_Map);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Soil_Map);
  }
  myFunctionLigendSoil();
  }

function Fun_Soil_Depth() {
    var checkBox = document.getElementById("myCheck_Soil_Depth");
    if (checkBox.checked == true) {
      map.addLayer(Soil_Depth);
  
      map
        .getView()
        .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
      map.getView().setZoom(13);
    } else {
      map.removeLayer(Soil_Depth);
    }
    myFunctionLigendSoil();
    }

function Fun_Soil_Erosion() {
      var checkBox = document.getElementById("myCheck_Soil_Erosion");
      if (checkBox.checked == true) {
        map.addLayer(Soil_Erosion);
    
        map
          .getView()
          .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
        map.getView().setZoom(13);
      } else {
        map.removeLayer(Soil_Erosion);
      }
      myFunctionLigendSoil();
      }

function Fun_Soil_Gaya_2_3_Drainage() {
        var checkBox = document.getElementById("myCheck_Soil_Gaya_2_3_Drainage");
        if (checkBox.checked == true) {
          map.addLayer(Soil_Gaya_2_3_Drainage);
      
          map
            .getView()
            .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
          map.getView().setZoom(13);
        } else {
          map.removeLayer(Soil_Gaya_2_3_Drainage);
        }
        myFunctionLigendSoil();
        }

function Fun_Surface_Texture() {
          var checkBox = document.getElementById("myCheck_Surface_Texture");
          if (checkBox.checked == true) {
            map.addLayer(Surface_Texture);
        
            map
              .getView()
              .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
            map.getView().setZoom(13);
          } else {
            map.removeLayer(Surface_Texture);
          }
          myFunctionLigendSoil();
          }

function Fun_Land_Capability() {
            var checkBox = document.getElementById("myCheck_Land_Capability");
            if (checkBox.checked == true) {
              map.addLayer(Land_Capability);
          
              map
                .getView()
                .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
              map.getView().setZoom(13);
            } else {
              map.removeLayer(Land_Capability);
            }
            myFunctionLigendSoil();
            }


//SUITABILITY FUNCTION

function Fun_Arhar() {
  var checkBox = document.getElementById("myCheck_Arhar");
  if (checkBox.checked == true) {
    map.addLayer(Arhar);

    //Arhar.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Arhar);
  }
  myFunctionLigendSuitability();
}

function Fun_Horsegram() {
  var checkBox = document.getElementById("myCheck_Horsegram");
  if (checkBox.checked == true) {
    map.addLayer(Horsegram);

    //Horsegram.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Horsegram);
  }
  myFunctionLigendSuitability();
}

function Fun_Kharif_Maize() {
  var checkBox = document.getElementById("myCheck_Kharif_Maize");
  if (checkBox.checked == true) {
    map.addLayer(Kharif_Maize);

    //Kharif_Maize.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Kharif_Maize);
  }
  myFunctionLigendSuitability();
}

function Fun_Kharif_Paddy() {
  var checkBox = document.getElementById("myCheck_Kharif_Paddy");
  if (checkBox.checked == true) {
    map.addLayer(Kharif_Paddy);

    //Kharif_Paddy.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Kharif_Paddy);
  }
  myFunctionLigendSuitability();
}


function Fun_Lentil() {
  var checkBox = document.getElementById("myCheck_Lentil");
  if (checkBox.checked == true) {
    map.addLayer(Lentil);

    //Lentil.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Lentil);
  }
  myFunctionLigendSuitability();
}

function Fun_Potato() {
  var checkBox = document.getElementById("myCheck_Potato");
  if (checkBox.checked == true) {
    map.addLayer(Potato);

    //Potato.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Potato);
  }
  myFunctionLigendSuitability();
}

function Fun_Sesame() {
  var checkBox = document.getElementById("myCheck_Sesame");
  if (checkBox.checked == true) {
    map.addLayer(Sesame);

    //Sesame.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Sesame);
  }
  myFunctionLigendSuitability();
}


function Fun_Summer_Paddy() {
  var checkBox = document.getElementById("myCheck_Summer_Paddy");
  if (checkBox.checked == true) {
    map.addLayer(Summer_Paddy);

    //Summer_Paddy.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Summer_Paddy);
  }
  myFunctionLigendSuitability();
}

function Fun_Wheat() {
  var checkBox = document.getElementById("myCheck_Wheat");
  if (checkBox.checked == true) {
    map.addLayer(Wheat);

    //Wheat.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Wheat);
  }
  myFunctionLigendSuitability();
}

function Fun_Vegetables() {
  var checkBox = document.getElementById("myCheck_Vegetables");
  if (checkBox.checked == true) {
    map.addLayer(Vegetables);

    //Vegetables.getSource().updateParams({'cql_filter':"Slope='2'"});alert(1);

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);
  } else {
    map.removeLayer(Vegetables);
  }
  myFunctionLigendSuitability();
}

//START single layer olptions
let layerOption = [
  "Select Layer",
  "Gaya TMU",
  "Gaya Landform",
  "Gaya Landuse",
  "Gaya Slope",
];
let tmuLegends = [
  "B",
  "Bf",
  "G2f",
  "G2m",
  "G2Os",
  "G2T",
  "G3f",
  "G3Os",
  "G3P",
  "G3Pf",
  "G3T",
  "G4f",
  "G4Os",
  "G4P",
  "H4f",
  "H4F",
  "H4Os",
  "H5a",
  "H5F",
  "H5Os",
  "H6a",
  "H6F",
  "Hc",
  "Hf4a",
  "Hf4f",
  "Hf4F",
  "Hf4Os",
  "Hf4P",
  "Ht4Os",
  "PeL2a",
  "PeL2Os",
  "PeL3a",
  "PeL3f",
  "PeL3m",
  "PeL3Os",
  "PeL3P",
  "PeL3Pf",
  "PeL3T",
  "PeL4a",
  "PeL4Os",
  "PeU2a",
  "PeU2f",
  "PeU2Os",
  "PeU3a",
  "PeU3f",
  "PeU3F",
  "PeU3m",
  "PeU3Os",
  "PeU3Pf",
  "PeU4a",
  "PeU4f",
  "PeU4F",
  "PeU4Os",
  "PeU4P",
  "PeU4Pf",
  "Pt3F",
  "Pt3Os",
  "Pt4Os",
  "R",
  "Rh5Os",
  "Rh6Os",
  "Rh6P",
  "UUn2a",
  "UUn3a",
  "UUn4a",
  "UUn4Os",
  "Vb1f",
  "Vb1F",
  "Vb1Os",
  "Vb2a",
  "Vb2F",
  "Vb2Os",
  "Vb2Pf",
  "Vb3a",
  "Vb3f",
  "Vb3F",
  "Vb3Os",
  "Vb3Pf",
  "Vb4a",
  "Vb4f",
  "Vb4F",
  "Vb4Os",
  "Vb4Pf",
  "Vf2a",
  "Vf2Pf",
  "Vh3a",
  "Vh4F",
  "Vh4Os",
  "W",
  "W_Seasonal",
];
let landFormLegends = [
  "B",
  "Bf",
  "G2",
  "G3",
  "G4",
  "H4",
  "H5",
  "H6",
  "Hc",
  "Hf4",
  "Ht4",
  "PeL2",
  "PeL3",
  "PeL4",
  "PeU2",
  "PeU3",
  "PeU4",
  "Pt3",
  "Pt4",
  "R",
  "Rh5",
  "Rh6",
  "UUn2",
  "UUn3",
  "UUn4",
  "Vb1",
  "Vb2",
  "Vb3",
  "Vb4",
  "Vf2",
  "Vh3",
  "Vh4",
  "W",
  "W_Seasonal",
];
let landUseLegends = [
  "a",
  "B",
  "Bf",
  "f",
  "F",
  "HC",
  "m",
  "Os",
  "P",
  "Pf",
  "R",
  "T",
  "W",
  "W_Seasonal",
];
let slopeLegends = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "B",
  "Hc",
  "R",
  "W",
  "W_Seasonal",
];

let selectLayer = document.getElementById("selectLayer");
let selectAttribute = document.getElementById("selectAttribute");

layerOption.forEach(function addLayerOption(item) {
  let option = document.createElement("option");
  option.text = item;
  option.value = item;
  selectLayer.appendChild(option);
});

selectLayer.onchange = function () {
  selectAttribute.innerHTML = "<option></option>";
  if (this.value == "Gaya TMU") {
    addToSelectAttribute(tmuLegends);
  }
  if (this.value == "Gaya Landform") {
    addToSelectAttribute(landFormLegends);
  }
  if (this.value == "Gaya Landuse") {
    addToSelectAttribute(landUseLegends);
  }
  if (this.value == "Gaya Slope") {
    addToSelectAttribute(slopeLegends);
  }
};

function addToSelectAttribute(arr) {
  arr.forEach(function (item) {
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    selectAttribute.appendChild(option);
  });
}

//END single layer olptions

//START SINGLE LAYER QUERY

function singleQueryRun() {
  if (selectLayer.value == "Gaya TMU") {
    clearLayers();
    map.addLayer(Gaya_TMU);

    Gaya_TMU.getSource().updateParams({
      cql_filter: "TMUEdit2='" + selectAttribute.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }
  if (selectLayer.value == "Gaya Landform") {
    clearLayers();
    map.addLayer(Gaya_Landform);

    Gaya_Landform.getSource().updateParams({
      cql_filter: "Landform='" + selectAttribute.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }
  if (selectLayer.value == "Gaya Landuse") {
    clearLayers();
    map.addLayer(Gaya_Landuse);

    Gaya_Landuse.getSource().updateParams({
      cql_filter: "Landuse='" + selectAttribute.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }

  if (selectLayer.value == "Gaya Slope") {
    clearLayers();
    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + selectAttribute.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }
}

//END SINGLE LAYER QUERY


//START multi layer olptions
/* let multiSelectLayer1 = document.getElementById("multiSelectLayer1");
let multiSelectAttribute1 = document.getElementById("multiSelectAttribute1");
let multiSelectLayer2 = document.getElementById("multiSelectLayer2");
let multiSelectAttribute2 = document.getElementById("multiSelectAttribute2");
let multiSelectLayer3 = document.getElementById("multiSelectLayer3");
let multiSelectAttribute3 = document.getElementById("multiSelectAttribute3");
let multiSelectLayer4 = document.getElementById("multiSelectLayer4");
let multiSelectAttribute4 = document.getElementById("multiSelectAttribute4");

layerOption.forEach(function addLayerOption(item) {
  let option = document.createElement("option");
  option.text = item;
  option.value = item;
  multiSelectLayer1.appendChild(option);
});
layerOption.forEach(function addLayerOption(item) {
  let option = document.createElement("option");
  option.text = item;
  option.value = item;
  multiSelectLayer2.appendChild(option);
});
layerOption.forEach(function addLayerOption(item) {
  let option = document.createElement("option");
  option.text = item;
  option.value = item;
  multiSelectLayer3.appendChild(option);
});
layerOption.forEach(function addLayerOption(item) {
  let option = document.createElement("option");
  option.text = item;
  option.value = item;
  multiSelectLayer4.appendChild(option);
});

multiSelectLayer1.onchange = function () {
  multiSelectAttribute1.innerHTML = "<option></option>";
  if (this.value == "Gaya TMU") {
    addTomultiSelectAttribute1(tmuLegends);
  }
  if (this.value == "Gaya Landform") {
    addTomultiSelectAttribute1(landFormLegends);
  }
  if (this.value == "Gaya Landuse") {
    addTomultiSelectAttribute1(landUseLegends);
  }
  if (this.value == "Gaya Slope") {
    addTomultiSelectAttribute1(slopeLegends);
  }
};
multiSelectLayer2.onchange = function () {
  multiSelectAttribute2.innerHTML = "<option></option>";
  if (this.value == "Gaya TMU") {
    addTomultiSelectAttribute2(tmuLegends);
  }
  if (this.value == "Gaya Landform") {
    addTomultiSelectAttribute2(landFormLegends);
  }
  if (this.value == "Gaya Landuse") {
    addTomultiSelectAttribute2(landUseLegends);
  }
  if (this.value == "Gaya Slope") {
    addTomultiSelectAttribute2(slopeLegends);
  }
};
multiSelectLayer3.onchange = function () {
  multiSelectAttribute3.innerHTML = "<option></option>";
  if (this.value == "Gaya TMU") {
    addTomultiSelectAttribute3(tmuLegends);
  }
  if (this.value == "Gaya Landform") {
    addTomultiSelectAttribute3(landFormLegends);
  }
  if (this.value == "Gaya Landuse") {
    addTomultiSelectAttribute3(landUseLegends);
  }
  if (this.value == "Gaya Slope") {
    addTomultiSelectAttribute3(slopeLegends);
  }
};
multiSelectLayer4.onchange = function () {
  multiSelectAttribute4.innerHTML = "<option></option>";
  if (this.value == "Gaya TMU") {
    addTomultiSelectAttribute4(tmuLegends);
  }
  if (this.value == "Gaya Landform") {
    addTomultiSelectAttribute4(landFormLegends);
  }
  if (this.value == "Gaya Landuse") {
    addTomultiSelectAttribute4(landUseLegends);
  }
  if (this.value == "Gaya Slope") {
    addTomultiSelectAttribute4(slopeLegends);
  }
};

function addTomultiSelectAttribute1(arr) {
  arr.forEach(function (item) {
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    multiSelectAttribute1.appendChild(option);
  });
}
function addTomultiSelectAttribute2(arr) {
  arr.forEach(function (item) {
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    multiSelectAttribute2.appendChild(option);
  });
}
function addTomultiSelectAttribute3(arr) {
  arr.forEach(function (item) {
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    multiSelectAttribute3.appendChild(option);
  });
}
function addTomultiSelectAttribute4(arr) {
  arr.forEach(function (item) {
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    multiSelectAttribute4.appendChild(option);
  });
} */
// Option Creation
function addLayerOptions(selectElement) {
  layerOption.forEach(function(item) {
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
  multiSelectLayer.onchange = function() {
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

    legends.forEach(function(item) {
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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }

  if (multiSelectLayer1.value == "Gaya Slope") {
    
    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute1.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }

  if (multiSelectLayer2.value == "Gaya Slope") {
    
    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute2.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }

  if (multiSelectLayer3.value == "Gaya Slope") {
    
    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute3.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

    myFunctionLigend();
  }

  if (multiSelectLayer4.value == "Gaya Slope") {
    
    map.addLayer(Gaya_Slope);

    Gaya_Slope.getSource().updateParams({
      cql_filter: "Slope='" + multiSelectAttribute4.value + "'",
    });

    map
      .getView()
      .setCenter(ol.proj.transform([85.28, 24.90], "EPSG:4326", "EPSG:3857"));
    map.getView().setZoom(13);

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
  map.removeLayer(Gaya_TMU);
  map.removeLayer(Gaya_Landform);
  map.removeLayer(Gaya_Landuse);
  map.removeLayer(Gaya_Slope);
  map.removeLayer(myFunctionLigend());

  Gaya_TMU.getSource().updateParams({ cql_filter: null });
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
