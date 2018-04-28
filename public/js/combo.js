// Create a client instance
client = new Paho.MQTT.Client("34.246.160.88", 8080, "clientId");

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
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);

    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var obj = JSON.parse(message.payloadString);
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






$(function() {
    $.widget("custom.combobox", {
        _create: function() {
            this.wrapper = $("<span>")
                .addClass("custom-combobox")
                .insertAfter(this.element);

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children(":selected"),
                value = selected.val() ? selected.text() : "";

            this.input = $("<input>")
                .appendTo(this.wrapper)
                .val(value)
                .attr("title", "")
                .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left")
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy(this, "_source")
                })
                .tooltip({
                    classes: {
                        "ui-tooltip": "ui-state-highlight"
                    }
                });

            this._on(this.input, {
                autocompleteselect: function(event, ui) {
                    ui.item.option.selected = true;
                    this._trigger("select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $("<a>")
                .attr("tabIndex", -1)
                .attr("title", "Show All Items")
                .tooltip()
                .appendTo(this.wrapper)
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass("ui-corner-all")
                .addClass("custom-combobox-toggle ui-corner-right")
                .on("mousedown", function() {
                    wasOpen = input.autocomplete("widget").is(":visible");
                })
                .on("click", function() {
                    input.trigger("focus");

                    // Close if already visible
                    if (wasOpen) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete("search", "");
                });
        },

        _source: function(request, response) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
            response(this.element.children("option").map(function() {
                var text = $(this).text();
                if (this.value && (!request.term || matcher.test(text)))
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }));
        },

        _removeIfInvalid: function(event, ui) {

            // Selected an item, nothing to do// por aqui o subscribe/////////////////////////////////
            if (ui.item) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children("option").each(function() {
                if ($(this).text().toLowerCase() === valueLowerCase) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if (valid) {
                return;

            }

            // Remove invalid value
            this.input
                .val("")

                .tooltip("open");
            this.element.val("");
            this._delay(function() {
                this.input.tooltip("close").attr("title", "");
            }, 2500);
            this.input.autocomplete("instance").term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });

    $("#combobox").combobox();
    $("#toggle").on("click", function() {
        $("#combobox").toggle();
    });
});


var cheese;
var mutated = false;   
function search() {
//$( "#search" ).click(function() {
document.getElementById("searchbtn").style.pointerEvents = 'none';
setTimeout(function() {
        document.getElementById("searchbtn").style.pointerEvents = 'auto';
    }, 1500);
console.log("sea");
       if (mutated == true) {
              
		client.disconnect();
		 
                    mutated = false;
                }
mutated = true;
                cheese = $('#combobox').find(":selected").text();
                client.connect({
                    onSuccess: onConnect});

                mutated = true;
                
  
};
function clear() { $('input:text').focus(
    function(){
        $(this).val('');
    });}

