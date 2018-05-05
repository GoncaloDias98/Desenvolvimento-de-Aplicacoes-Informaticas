// Create a client instance
client = new Paho.MQTT.Client("34.243.203.139", 8080, "clientId");

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







    //--------------------------------------------------------------------------------------------------------------
    function showDiv() {
        document.getElementById('weathercard').style.display = "block";
      }

      function management() {

        window.location = '/admin';
    };
    
    function logout() {
        window.location = '/logout';
    };



// LOGIN MODAL

    $(function() {
    
        var $formLogin = $('#login-form');
        var $formLost = $('#lost-form');
        var $formRegister = $('#register-form');
        var $divForms = $('#div-forms');
        var $modalAnimateTime = 300;
        var $msgAnimateTime = 150;
        var $msgShowTime = 2000;
    
        $("form").submit(function () {
            switch(this.id) {
                case "login-form":
                    var $lg_username=$('#login_username').val();
                    var $lg_password=$('#login_password').val();
                    if ($lg_username == "ERROR") {
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                    } else {
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                    }
                    return false;
                    break;
                case "lost-form":
                    var $ls_email=$('#lost_email').val();
                    if ($ls_email == "ERROR") {
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                    } else {
                        msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                    }
                    return false;
                    break;
                case "register-form":
                    var $rg_username=$('#register_username').val();
                    var $rg_email=$('#register_email').val();
                    var $rg_password=$('#register_password').val();
                    if ($rg_username == "ERROR") {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                    } else {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                    }
                    return false;
                    break;
                default:
                    return false;
            }
            return false;
        });
        
        $('#login_register_btn').click( function () { modalAnimate($formLogin, $formRegister) });
        $('#register_login_btn').click( function () { modalAnimate($formRegister, $formLogin); });
        $('#login_lost_btn').click( function () { modalAnimate($formLogin, $formLost); });
        $('#lost_login_btn').click( function () { modalAnimate($formLost, $formLogin); });
        $('#lost_register_btn').click( function () { modalAnimate($formLost, $formRegister); });
        $('#register_lost_btn').click( function () { modalAnimate($formRegister, $formLost); });
        
        function modalAnimate ($oldForm, $newForm) {
            var $oldH = $oldForm.height();
            var $newH = $newForm.height();
            $divForms.css("height",$oldH);
            $oldForm.fadeToggle($modalAnimateTime, function(){
                $divForms.animate({height: $newH}, $modalAnimateTime, function(){
                    $newForm.fadeToggle($modalAnimateTime);
                });
            });
        }
        
        function msgFade ($msgId, $msgText) {
            $msgId.fadeOut($msgAnimateTime, function() {
                $(this).text($msgText).fadeIn($msgAnimateTime);
            });
        }
        
        function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
            var $msgOld = $divTag.text();
            msgFade($textTag, $msgText);
            $divTag.addClass($divClass);
            $iconTag.removeClass("glyphicon-chevron-right");
            $iconTag.addClass($iconClass + " " + $divClass);
            setTimeout(function() {
                msgFade($textTag, $msgOld);
                $divTag.removeClass($divClass);
                $iconTag.addClass("glyphicon-chevron-right");
                $iconTag.removeClass($iconClass + " " + $divClass);
              }, $msgShowTime);
        }
    });
	
	
	
	
	
	
(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function(e) {
    $(".navbar").addClass("d-none");
  })
  $('.portfolio-modal').on('hidden.bs.modal', function(e) {
    $(".navbar").removeClass("d-none");
  })

})(jQuery); // End of use strict
