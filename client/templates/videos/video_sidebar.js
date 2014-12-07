$(function() {
  setTimeout(function() {
    $(".animate").hide();
    $(".freeze").show();
    $(".play-gif").show()
  }, 7000);

  $(".play-gif i")
    .click(function() {
      $(this).removeClass('fa-play-circle-o').addClass('fa-pause').css('font-size', '30px');
      $(this).parent().next().next().find(".animate").css("display", "inline");

      var that = this;
      setTimeout(function() {
        $(that).parent().next().next().find(".animate").css("display", "none");
        $(that).removeClass('fa-pause').addClass('fa-play-circle-o').css('font-size', '40px');
      }, 4000);

    });

});
