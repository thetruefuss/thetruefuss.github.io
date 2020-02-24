(function($) {
  "use strict";

  $(window).load(function() {
    $("#page-loader")
      .delay(300)
      .fadeOut(400, function() {});

    $("#loader-name").addClass("loader-left");
    $("#loader-job").addClass("loader-right");
    $("#loader-animation").addClass("loader-hide");
  });

  $(document).ready(function() {
    $("#loading-wraper").fadeIn(300);
    $("#testimonial-carousel").owlCarousel({
      navigation: false,
      slideSpeed: 300,
      paginationSpeed: 400,
      responsiveRefreshRate: 200,
      responsiveBaseWidth: window,
      pagination: true,
      singleItem: true,
      navigationText: [
        "<span class='fa fa-chevron-left'></span>",
        "<span class='fa fa-chevron-right'></span>"
      ]
    });

    $(".map").on("click", function() {
      $(".map-overlay").hide();
    });

    $(".map").on("mouseleave", function() {
      $(".map-overlay").show();
    });

    $("a.nivobox").nivoLightbox({ effect: "fade" });

    $(".section-vcardbody").perfectScrollbar({
      wheelSpeed: 0.9
    });

    var linkHome = 0;
    var linkPage = "";

    function pageOn() {
      $("#main-menu").addClass("main-menu-pgactive");
      $("#section-home").addClass("section-vcardbody-pgactive");
      $(".profileActive").removeClass("profileActive");
      $("#profile2").addClass("profileActive");

      linkHome = 1;
    }

    function pageOff() {
      $(".section-page-active").removeClass("section-page-active");
      $("#main-menu").removeClass("main-menu-pgactive");
      $("#section-home").removeClass("section-vcardbody-pgactive");
      $(".profileActive").removeClass("profileActive");
      $("#profile1").addClass("profileActive");
      linkHome = 0;
    }

    $(".link-page").on("click", function(event) {
      event.preventDefault();
      $(".menuActive").removeClass("menuActive");
      $(this).addClass("menuActive");
      linkPage = $(this).attr("href");
      $(".section-page-active").removeClass("section-page-active");
      $(linkPage).addClass("section-page-active");
      pageOn();
    });

    $(".link-home").on("click", function(event) {
      event.preventDefault();

      if (linkHome == 0) {
      } else if (linkHome == 1) {
        $(".menuActive").removeClass("menuActive");
        $(this).addClass("menuActive");
        pageOff();
      }
    });

    function loadPost() {
      $.ajax({
        url: "single.html",
        type: "GET",
        success: function(html) {
          var $lis = $(html).find("#blogPost");
          $("#postHere").html($lis);
        }
      });
    }

    $(".loadPost").on("click", function(event) {
      event.preventDefault();
      $(".section-page-active").removeClass("section-page-active");
      $("#page-blog-single").addClass("section-page-active");
      pageOn();
      loadPost();
    });

    $("#contactForm").validate({
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "php/contact-form.php",
          data: {
            name: $("#contactForm #name").val(),
            email: $("#contactForm #email").val(),
            subject: $("#contactForm #subject").val(),
            message: $("#contactForm #message").val()
          },
          dataType: "json",
          success: function(data) {
            if (data.response == "success") {
              $("#contactSuccess").fadeIn(300);
              $("#contactError").addClass("hidden");

              $(
                "#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message"
              )
                .val("")
                .blur()
                .closest(".control-group")
                .removeClass("success")
                .removeClass("error");
            } else {
              $("#contactError").fadeIn(300);
              $("#contactSuccess").addClass("hidden");
            }
          }
        });
      }
    });

    $(".modal-wrap").click(function() {
      $(".modal-wrap").fadeOut(300);
    });
  });
})(jQuery);
