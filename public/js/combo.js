// Create a client instance
client = new Paho.MQTT.Client("34.243.203.139", 8080, "clientId" + parseInt(Math.random() * 10000));
var cheese;

var mutated = false;
/*cheese = "Braga,Braga,Portugal";
$(document).ready(function() {
});
$('#combobox').on('changed.bs.select', function (e) {
  if (!!client.isConnected){
    cheese = e.target.value;
  client.connect({
    onSuccess: onConnect})}
  client.subscribe(cheese);
  setTimeout(  client.disconnect(), 500);
});*/

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
//client.connect({onSuccess:onConnect});



// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(cheese);
  console.log("sub" + cheese);

}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);

  }
}
var obj;
// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
  obj = JSON.parse(message.payloadString);
  document.getElementById("DirecaoVento").innerHTML = obj.measurements[0].series.DirecaoVento[0];
  document.getElementById("VelocidadeVento").innerHTML = obj.measurements[0].series.VelocidadeVento[0];
  document.getElementById("Temperatura").innerHTML = obj.measurements[0].series.Temperatura[0];
  document.getElementById("Pressao").innerHTML = obj.measurements[0].series.Pressao[0];
  document.getElementById("Humidade").innerHTML = obj.measurements[0].series.Humidade[0];
  document.getElementById("Visibilidade").innerHTML = obj.measurements[0].series.Visibilidade[0];
  document.getElementById("NascerSol").innerHTML = obj.measurements[0].series.NascerSol[0];
  document.getElementById("PorSol").innerHTML = obj.measurements[0].series.PorSol[0];
  document.getElementById("ts").innerHTML = obj.measurements[0].ts;

}


$('#combobox').on('changed.bs.select', function (e) {
  if (mutated == true) {
    client.disconnect();
    console.log("disconnect");
    mutated = false;
  }
  mutated = true;
  cheese = e.target.value;
  client.connect({
    onSuccess: onConnect
  });
  mutated = true;
})



var elem = document.getElementById("combobox");
elem.onchange = function () {
  var hiddenDiv = document.getElementById("weathercard");
  hiddenDiv.style.display = (this.value == "") ? "none" : "block";
};



//------------------------------------ MAPA METEOROLOGIA----------------------------------

var data = [
  ['pt-fa', 0],
  ['pt-li', 1],
  ['pt-av', 2],
  ['pt-vc', 3],
  ['pt-be', 4],
  ['pt-ev', 5],
  ['pt-se', 6],
  ['pt-pa', 7],
  ['pt-sa', 8],
  ['pt-br', 9],
  ['pt-le', 10],
  ['pt-ba', 11],
  ['pt-cb', 12],
  ['pt-gu', 13],
  ['pt-co', 14],
  ['pt-po', 15],
  ['pt-vi', 16],
  ['pt-vr', 17],
  ['pt-ma', 18],
  ['pt-ac', 19],
  ['undefined', 20]
];

// Create the chart
Highcharts.mapChart('container', {
  chart: {
      map: 'countries/pt/pt-all'
  },

  title: {
      text: 'Highmaps basic demo'
  },

  subtitle: {
      text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/pt/pt-all.js">Portugal</a>'
  },

  mapNavigation: {
      enabled: true,
      buttonOptions: {
          verticalAlign: 'bottom'
      }
  },

  colorAxis: {
      min: 0
  },

  series: [{
      data: data,
      name: 'Random data',
      states: {
          hover: {
              color: '#BADA55'
          }
      },
      dataLabels: {
          enabled: true,
          format: '{point.name}'
      }
  }, {
      name: 'Separators',
      type: 'mapline',
      data: Highcharts.geojson(Highcharts.maps['countries/pt/pt-all'], 'mapline'),
      color: 'silver',
      showInLegend: false,
      enableMouseTracking: false
  }]
});

//------------------------------------ FIM MAPA METEOROLOGIA----------------------------------

function editarDados() {
  var x = document.getElementById("editardados");
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}
