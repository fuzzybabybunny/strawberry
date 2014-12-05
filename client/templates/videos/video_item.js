// YouTube API will call onYouTubeIframeAPIReady() when API ready.
// Make sure it's a global variable.
onYouTubeIframeAPIReady = function () {

  // New Video Player, the first argument is the id of the div.
  // Make sure it's a global variable.
  player = new YT.Player("player", {

    height: "400",
    width: "600",

    // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
    videoId: "LdH1hSWGFGU",

    //playerVars
    playerVars: {
      controls: 1,
      rel: 0,
      modestbranding: 1,
      showinfo: 0

    },

    // Events like ready, state change,
    events: {
      onReady: function (event) {
        console.log("video is ready");
        // Play video when player ready.
        // event.target.playVideo();
        // ^^^^^^^^^^^^^^^^^^^^^^^^ commented out for now so it doesn't autoplay every hot code push

      var defaultVolume = player.getVolume();

      $("#volumeSlider").slider({
        range: "min",
        value: defaultVolume,

        slide: function(event, ui) {
          player.setVolume(ui.value);
          }
        });
      }

    }
  });

  var videoData = Comment.find().fetch();

  var commentInterval = 1000;
  var refreshDataInterval = 10000;
  var minTimeLapse = 2;

  var videoOldTime = 0;

  Meteor.setInterval(function () {
    if (player.getPlayerState() === 1) {

      var videoCurrentTime = player.getCurrentTime();
      // console.log(videoCurrentTime);
      var commentsInInterval = videoData.filter( function (a) {return a.currentTime >= videoOldTime && a.currentTime <= videoCurrentTime; });
      // console.log("between" + videoOldTime + " and " + videoCurrentTime + " : " + commentsInInterval.length);

      if (commentsInInterval.length > 0 && videoCurrentTime - videoOldTime <= minTimeLapse) {

        commentsInInterval.forEach(function(commentObj) {
          // console.log(comment);
          totalSeconds = videoCurrentTime;
          minutes = Math.floor(totalSeconds / 60);
          seconds = Math.floor(totalSeconds % 60);
          $('<div class="comment"></div>').text(commentObj.text +"@ "+ minutes + ":" + seconds ).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
        });

      }
      videoOldTime = videoCurrentTime;
    }
  }, commentInterval);

  Meteor.setInterval(function () {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      videoData = Comment.find().fetch();
      console.log(videoData);
    }
  }, refreshDataInterval);

  $("#progressBar").progressbar({
    value: 0
  });

  updatePlayTime = function(progress) {
    $('#progressBar .ui-progressbar-value').show().css({'width': $('#progressBar').width() * progress});
  };

  Meteor.setInterval(function () {
    if(player.getPlayerState() === YT.PlayerState.PLAYING) {
      var VCT = player.getCurrentTime();
      var DUR = player.getDuration();
      var progress = VCT / DUR;
      updatePlayTime(progress);
    }
  }, 1000);

  $("#progressBar").click(function(e) {
    var parentOffset = $(this).parent().offset();
    var clickX = e.pageX - parentOffset.left;
    var parentWidth = $(this).parent().width();
    var videoDuration = player.getDuration();
    var newProgress = clickX / parentWidth;
    var newPlayPosition = newProgress * videoDuration;
    updatePlayTime(newProgress);
    player.seekTo(newPlayPosition);
  });

  $(".play").click(function() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
      $(".play").html("Play");
    }
    else if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
      player.playVideo();
      $(".play").html("Pause");
    }
  });

  $(".comment").click(function() {
    if ($("#comments").is(":visible")) {
      $("#comments").slideUp();
    } else {
      player.pauseVideo();
      var comment = $("#comments").val('');
      $("#comments").slideDown().focus();
    }
  });

  $(".fullscreen").click(function() {
    toggleFullScreen();
  });

  var el = document.getElementById("comments");
  el.addEventListener("keydown", function(e) {
    console.log("keydown");
    if (e.keyCode == 13) {
      $("#comments").slideUp();
      player.playVideo();
      // $(".comment-box").css('right', '-1100px');
      var comment = $("#comments").val();
      totalSeconds = player.getCurrentTime();
      minutes = Math.floor(totalSeconds / 60);
      seconds = Math.floor(totalSeconds % 60);
      console.log("keydown: enter",comment);
      // $(".comment-box").text(comment +"@ "+ minutes + ":" + seconds ).animate({'right': '200px'},2000);
      // $(".comment-box").text(comment +"@ "+ minutes + ":" + seconds ).fadeIn('500').delay('1000').fadeOut('500');
      Comment.insert({text: comment, currentTime: Math.floor(totalSeconds), createdAt: new Date()});
      $('<div class="comment"></div>').text(comment +"@ "+ minutes + ":" + seconds ).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
    }
  }, false);

  var videoElement = document.getElementById("myvideo");

  function toggleFullScreen() {
    if (!document.mozFullScreen && !document.webkitFullScreen) {
      if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else {
        videoElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }
};

YT.load();