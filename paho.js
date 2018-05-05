

// Create a client instance
client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");
 
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
 
// connect the client
client.connect({onSuccess:onConnect});
 
 
// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("$/alertas/#");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
  }

