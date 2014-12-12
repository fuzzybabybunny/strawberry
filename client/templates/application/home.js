Template.home.rendered = function() {
  // result = Meteor.call('fetch');

  // var result = Meteor.call("ajax_fetch");
  // console.log(result);

  var urlInput = document.getElementById("url");
  urlInput.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      var url = $("#url").val();
      var videoSourceId = youtubeParser(url);
      if (videoSourceId !== false) {
      }

      var videoAttributes = {
        videoSourceId: videoSourceId
      };

      Meteor.call('videoInsert', videoAttributes, function(error, result) {
        if (error) {
          return alert(error.reason);
        } else {
          // Router.go('/videos/'+videoSourceId);
        }
      });
    }
  }, false);

  $(".carousel-inner.jumbo").hover(
    function() {
      $(this).find(".carousel-caption").slideDown('400');
    }, function() {
      $(this).find(".carousel-caption").slideUp('400');
    }
  );

  $(".carousel-control.jumbo").hover(
    function() {
      $(this).find(".fa").show('400');
    }, function() {
      $(this).find(".fa").hide('400');
    }
  );

};