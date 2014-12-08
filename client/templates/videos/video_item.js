Template.videoItem.rendered = function(){

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

        var videoData = Comments.find().fetch();

        var videoOldTime = 0;

        Meteor.setInterval(function () {
          if (player.getPlayerState() === YT.PlayerState.PLAYING) {

            var videoCurrentTime = player.getCurrentTime();
            var commentsInInterval = videoData.filter( function (a) {return a.currentTime >= videoOldTime && a.currentTime <= videoCurrentTime; });

            if (commentsInInterval.length > 0 && videoCurrentTime - videoOldTime <= MIN_TIME_LAPSE) {
              commentsInInterval.forEach(function(commentObj) {
                totalSeconds = videoCurrentTime;
                minutes = Math.floor(totalSeconds / 60);
                seconds = Math.floor(totalSeconds % 60);
                $('<div class="comment"></div>').text(commentObj.author + " : " + commentObj.text + "@ " + minutes + ":" + seconds ).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
              });

            }
            videoOldTime = videoCurrentTime;
          }
        }, DISPLAY_COMMENT_INTERVAL);

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
            videoData = Comments.find().fetch();
          }
        }, LOAD_COMMENT_INTERVAL);

        fillCommentBar();

        },
        onStateChange: function (event) {
          if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            $(".play").html("Pause");
          }
          else if (player.getPlayerState() === YT.PlayerState.PAUSED) {
            $(".play").html("Play");
          }
        }
      }
    });



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

    $(".commentBarNotch").hover(
      function() {
        var id = $(".commentBarNotch").attr('id');
        console.log("mouse in "+id);
      },
      function() {
        console.log("mouse out");
      });

    function fillCommentBar() {
      var videoData = Comments.find().fetch();
      videoData.forEach(function (comment) {
        console.log(comment.text, comment.currentTime);
        $("#commentBar").append('<div class="commentBarNotch" id='+comment._id+'></div>');
      });
    }

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

    var commentInput = document.getElementById("comments");
    commentInput.addEventListener("keydown", function(e) {
      console.log("keydown");
      if (e.keyCode == 13) {
        $("#comments").slideUp();
        player.playVideo();
        var commentText = $("#comments").val();
        totalSeconds = player.getCurrentTime();
        minutes = Math.floor(totalSeconds / 60);
        seconds = Math.floor(totalSeconds % 60);
        var comment = {
          text: commentText,
          currentTime: Math.floor(totalSeconds)
        };
        Meteor.call('commentInsert', comment, function(error, result) {
          if (error)
            return alert(error.reason);
        });
        $('<div class="comment"></div>').text(Meteor.user().username + " : " + commentText + "@ " + minutes + ":" + seconds).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
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
};