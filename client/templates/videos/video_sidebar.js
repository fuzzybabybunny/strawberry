Template.videoSidebar.rendered = function(){

  $(function() {
    setTimeout(function() {
      $(".animate").hide();
      $(".freeze").show();
      $(".play-gif").show()
    }, 7000);

    $(".play-gif i")
      .mouseenter(function() {
        $(this).removeClass('fa-play-circle-o').addClass('fa-pause').css('font-size', '30px');
        $(this).parent().next().next().find(".animate").css("display", "inline");

      })
      .mouseleave(function() {
        $(this).parent().next().next().find(".animate").css("display", "none");
        $(this).removeClass('fa-pause').addClass('fa-play-circle-o').css('font-size', '40px');
      });
  });

};