// Create a client instance
client = new Paho.MQTT.Client("34.243.203.139", 8080, "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
//client.connect({onSuccess:onConnect});

var cheese;
var mutated = false;   
//function search() {
$( "#searchbtn" ).click(function() {
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

// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    client.subscribe("/kpi");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);

    }
}

// called when a message arrives
function onMessageArrived(message) {
    var obj = JSON.parse(message.payloadString);

    google.charts.load('44', {
        callback: drawChart,
        packages: ['corechart']
      });
      
      // init array data
      var time = obj.measurements[0].series.$_time[0];
      var suseptible = obj.measurements[0].series.Uptime[0];
      
      function drawChart(){
        // create DataTable
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Id');
        data.addColumn('number', 'Time');
        data.addColumn('number', 'Suseptible');
      
        // load data
        for (var i = 0; i < time.length; i++) {
          var row = [i, time[i], suseptible[i]];
          data.addRow(row);
        }
      
        var options = {};
      
        var chart = new  google.visualization.LineChart(document.getElementById('chart_id'));
        chart.draw(data, options);
      }


    

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



function clear() { $('input:text').focus(
    function(){
        $(this).val('');
    });}








	
	
