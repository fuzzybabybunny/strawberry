var DISPLAY_COMMENT_INTERVAL = 1000;
var LOAD_COMMENT_INTERVAL = 10000;
var MIN_TIME_LAPSE = 2;
var REFRESH_VIDEO_PROGRESS = 1000;

onYouTubeIframeAPIReady = function () {

  player = new YT.Player("player", {

    height: "400",
    width: "600",
    videoId: "LdH1hSWGFGU",

    playerVars: {
      controls: 0,
      rel: 0,
      modestbranding: 1,
      showinfo: 0
    },

    events: {
      onReady: function (event) {
        console.log("video is ready");
        // Play video when player ready.
        // event.target.playVideo();

      var defaultVolume = player.getVolume();

      $("#volumeSlider").slider({
        range: "min",
        value: defaultVolume,
        slide: function(event, ui) {
          player.setVolume(ui.value);
        }
      });

      Meteor.setInterval(function () {
        if(player.getPlayerState() === YT.PlayerState.PLAYING) {
          var videoCurrentTime = player.getCurrentTime();
          var videoDuration = player.getDuration();
          var videoProgress = videoCurrentTime / videoDuration;
          updatePlayTime(videoProgress);
        }
      }, REFRESH_VIDEO_PROGRESS);

      Meteor.setInterval(function () {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
          videoData = Comment.find().fetch();
        }
      }, LOAD_COMMENT_INTERVAL);

      },
      onStateChange: function (event) {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
          $(".play").html("Pause");
          console.log("set pause");
        }
        else if (player.getPlayerState() === YT.PlayerState.PAUSED) {
          $(".play").html("Play");
          console.log("set play");
        }
      }
    }
  });

  var videoData = Comment.find().fetch();

  var videoOldTime = 0;

  Meteor.setInterval(function () {
    if (player.getPlayerState() === 1) {

      var videoCurrentTime = player.getCurrentTime();
      var commentsInInterval = videoData.filter( function (a) {return a.currentTime >= videoOldTime && a.currentTime <= videoCurrentTime; });

      if (commentsInInterval.length > 0 && videoCurrentTime - videoOldTime <= MIN_TIME_LAPSE) {
        commentsInInterval.forEach(function(commentObj) {
          totalSeconds = videoCurrentTime;
          minutes = Math.floor(totalSeconds / 60);
          seconds = Math.floor(totalSeconds % 60);
          $('<div class="comment"></div>').text(commentObj.text +"@ "+ minutes + ":" + seconds ).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
        });

      }
      videoOldTime = videoCurrentTime;
    }
  }, DISPLAY_COMMENT_INTERVAL);

  $("#progressBar").progressbar({
    value: 0
  });

  updatePlayTime = function(progress) {
    $('#progressBar .ui-progressbar-value').show().css({'width': $('#progressBar').width() * progress});
  };

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

  $("#commentBar div").hover(
    function() {
      var id = $("#commentBar div").attr('id');
      console.log("mouse in "+id);
    },
    function() {
      console.log("mouse out");
    });

  function fillCommentBar() {
    videoData.forEach(function (comment) {
      console.log(comment.text, comment.currentTime);
      $("#commentBar").append('<div class="commentBarNotch" id='+comment._id+'></div>');
    });
  }

  fillCommentBar();

  $(".play").click(function() {
    if (player.getPlayerState() === YT.PlayerState.PLAYING) {
      player.pauseVideo();
    }
    else if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
      player.playVideo();
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
      var comment = $("#comments").val();
      totalSeconds = player.getCurrentTime();
      minutes = Math.floor(totalSeconds / 60);
      seconds = Math.floor(totalSeconds % 60);
      console.log("keydown: enter", comment);
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