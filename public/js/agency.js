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


function showDiv() {
  document.getElementById('weathercard').style.display = "none";
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
//login shit
$(function () {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch (this.id) {
            case "login-form":

                var $lg_username = $('#login_username').val();
                var $lg_password = $('#login_password').val();
                if ($lg_username.length < 5) {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Username tem que ter pelo menos 5 caracteres");
                } else if ($lg_password.length < 6) {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Password Inválida");
                } else {


                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/login',
                        data: $('#login-form').serialize(),
                        success: function (valido) {

                            if (valido.status == 200) {

                                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Bem Vindo!");

                                window.location = '/';

                            } else {
                                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Username ou password inválidos");

                            }
                        }
                    });
                }
                return false;
                break;





            case "lost-form":

                $.ajax({
                    datatype: "JSON",
                    type: 'POST',
                    url: '/register/lost',
                    data: $('#lost-form').serialize(),
                    success: function (valido) {

                        if (valido.status == 200) {

                            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Bem Vindo!");

                            window.location = '/';

                        } else {
                            msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Username ou password inválidos");

                        }
                    }
                });
                return false;
                break;

            case "register-form":
                var $rg_nome = $('#register_nome').val();
                var $rg_password = $('#register_password').val();
                var $rg_email = $('#register_email').val();
                var $rg_nif = $('#register_NIF').val();
				var $rg_contacto = $('#register_contacto').val();
				var $rg_morada = $('#register_morada').val();
				
				
				
                if ($rg_nome.length < 5) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "O Nome tem que ter pelo menos 8 caracteres");
                } else if ($rg_password.length < 8) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "A password tem que ter pelo menos 8 caracteres");
                } else if ($rg_email.length < 9) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($rg_nif.length > 13) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($rg_contacto.length > 13) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");
                } else if ($rg_morada.length > 13) {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Número de telemóvel inválido");



                } else {



                    $.ajax({
                        datatype: "JSON",
                        type: 'POST',
                        url: '/registar',
                        data: $('#register-form').serialize(),
                        success: function (valido) {
                            if (valido.status == 200) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "sucess", "glyphicon-ok", "Conta Criada!");


                                location.reload();




                            } else if (valido.status == 400) {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Username já existe");





                            } else {

                                msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Email já existe");




                            }

                        }


                    });
                }





                return false;
                break;
            default:
                return false;
        }
        return false;
    });


    });
    $('#login_register_btn').click(function () {
        modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function () {
        modalAnimate($formRegister, $formLogin);
    });
    });
    $('#login_lost_btn').click(function () {
        modalAnimate($formLogin, $formLost);
    });
    });
    $('#lost_login_btn').click(function () {
        modalAnimate($formLost, $formLogin);
    });

    });
    $('#lost_register_btn').click(function () {
        modalAnimate($formLost, $formRegister);
    });
    });
    $('#register_lost_btn').click(function () {
        modalAnimate($formRegister, $formLost);
    });

    });

    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({
                height: $newH
            }, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }


    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
});