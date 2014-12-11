Template.home.rendered = function() {
  // result = Meteor.call('fetch');

  var result = Meteor.call("ajax_fetch");
  console.log(result);

  youtubeParser = function(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        var b = match[7];
        return b;
    } else {
        return false;
    }
  };

  var commentInput = document.getElementById("url");
  commentInput.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      var url = $("#url").val();
      var videoSourceId = youtubeParser(url);
      if (videoSourceId !== false) {
        console.log(videoSourceId);
      }

      var comment = {
        videoSourceId: videoSourceId
      };
      Meteor.call('videoInsert', comment, function(error, result) {
        if (error)
          return alert(error.reason);
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