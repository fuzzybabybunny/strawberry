$(function () {
  $('[data-toggle="tooltip"]').tooltip()

  $(".search-button").on('click', function(event) {
    event.preventDefault();
    if ($(".search-field").hasClass('hidden')) {
      $(".search-field").animate({"width": "200px"}, "fast", function() {
        $("input.form-control").focus();
      });
      $(".search-field").removeClass('hidden');
    } else {
      $(".search-field").animate({"width": "0"}, "fast");
      $(".search-field").addClass('hidden');
    }
    return false;
  });

  $(".dropdown-toggle").on('click', function(event) {
    event.preventDefault();
    if ($(".dropdown").hasClass('slided') == false) {
      $(".dropdown").addClass('slided');
      $(".dropdown-menu").slideDown('fast')
    } else {
      $(".dropdown").removeClass('slided');
      $(".dropdown-menu").slideUp('fast')

    }
    return false;
  });


  // $( window ).scroll(function() {
  //   $.data( this, "scrollCheck", setTimeout(function() {
  //     $( "div.navbar.navbar-info.navbar-fixed-top" ).removeClass('box-shadow');
  //   }, 2500) );
  // });

  var CurrentScroll = 0;
  $(window).scroll(function(event){
    if (window.scrollY == 0) {
      $( "div.navbar.navbar-info.navbar-fixed-top" ).removeClass('box-shadow');
    } else {
      $( "div.navbar.navbar-info.navbar-fixed-top" ).addClass('box-shadow');
    }

    var NextScroll = $(this).scrollTop();
    if (NextScroll > CurrentScroll){

      //write the codes related to down-ward scrolling here
      if (window.scrollY >= 300) {
        $( "div.navbar.navbar-info.navbar-fixed-top" ).fadeOut(600);
      }

    } else {

      $( "div.navbar.navbar-info.navbar-fixed-top" ).fadeIn(200);

      //write the codes related to upward-scrolling here
      // $( "div.navbar.navbar-info.navbar-fixed-top" ).fadeIn("fast");
    }
    //Updates current scroll position
    CurrentScroll = NextScroll;
  });

  // if (window.scrollY >= 300) {
  //     $( "div.navbar.navbar-info.navbar-fixed-top" ).delay(2000),fadeOut(1000);
  //   } else if (window.scrollY == 0) {
  //     $( "div.navbar.navbar-info.navbar-fixed-top" ).fadeIn(1000);
  //   }
  // }

})
