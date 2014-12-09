Template.videoItem.rendered = function(){

  var DISPLAY_COMMENT_INTERVAL = 1000;
  var LOAD_COMMENT_INTERVAL = 10000;
  var MIN_TIME_LAPSE = 2;
  var REFRESH_VIDEO_PROGRESS = 1000;

  timeToString = function(totalSeconds) {
    minutes = Math.floor(totalSeconds / 60);
    seconds = Math.floor(totalSeconds % 60);
    return minutes + ":" + seconds;
  };

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
                $('<div class="comment-line"></div>').text(commentObj.author + " : " + commentObj.text + "@ " + timeToString(totalSeconds)).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
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
            $("#player-currentplaytime").html(timeToString(videoCurrentTime));
            updatePlayTime(videoProgress);
          }
        }, REFRESH_VIDEO_PROGRESS);

        Meteor.setInterval(function () {
          if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            videoData = Comments.find().fetch();
          }
        }, LOAD_COMMENT_INTERVAL);

        fillCommentBar();

        $(".commentBarNotch").hover(
          function() {
            var id = $(this).attr('id');
            var commentObj = Comments.findOne({_id:id});
            $('<div class="comment-line"></div>').text(commentObj.author + " : " + commentObj.text).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
          },
          function() {
        });

        $("#progressBar").hover(
          function() {
            console.log("Mouse in: progress bar");
            $("#progressBar").mousemove(function(e){
              var parentOffset = $(this).parent().offset();
              var clickX = e.pageX - parentOffset.left;
              var parentWidth = $(this).parent().width();
              var videoDuration = player.getDuration();
              var newProgress = clickX / parentWidth;
              var newPlayPosition = newProgress * videoDuration;
              console.log(timeToString(newPlayPosition));
              minutes = Math.floor(newPlayPosition / 60);
              seconds = Math.floor(newPlayPosition % 60);
              $("#progressBar").attr('title',minutes + ":" + seconds);
              $(document).tooltip({
                // content: minutes + ":" + seconds,
                track:true,
                position: { my: "left+15 center", at: "right center" }
              });
            });
          },
          function() {
            console.log("Mouse out: progress bar");
        });

        $("#player-videoduration").html(timeToString(player.getDuration()));

        $("#player-currentplaytime").html("0:00");

        },
        onStateChange: function (event) {
          if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            $(".play").html("<i class='fa fa-pause'></i>");
          }
          else if (player.getPlayerState() === YT.PlayerState.PAUSED) {
            $(".play").html("<i class='fa fa-play'></i>");
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

    $("#commentBar").click(function(e) {
      var parentOffset = $(this).parent().offset();
      var clickX = e.pageX - parentOffset.left;
      var parentWidth = $(this).parent().width();
      var videoDuration = player.getDuration();
      var newProgress = clickX / parentWidth;
      var newPlayPosition = newProgress * videoDuration;
      updatePlayTime(newProgress);
      player.seekTo(newPlayPosition);
    });

    function fillCommentBar() {
      $("#commentBar").empty();
      var commentsArray = Comments.find({}, {sort: {currentTime: 1}}).fetch();
      var commentsCount = commentsArray.length;
      var commentBarWidth = $("#commentBar").width();
      var spacingWidth = commentBarWidth - commentsCount;
      var videoDuration = player.getDuration();
      var pixelPerSecond = spacingWidth / videoDuration;
      var timeOld = 0;
      commentsArray.forEach(function (comment) {
        var timeNew = comment.currentTime;
        var spacing = (timeNew - timeOld) * pixelPerSecond;
        $("#commentBar").append('<div class="spacing" id='+comment._id+' style=width:'+spacing+'px></div>');
        $("#commentBar").append('<div class="commentBarNotch" id='+comment._id+' style=width:'+1+'px></div>');
        timeOld = timeNew;
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
        var comment = {
          text: commentText,
          currentTime: Math.floor(totalSeconds)
        };
        Meteor.call('commentInsert', comment, function(error, result) {
          if (error)
            return alert(error.reason);
        });
        $('<div class="comment-line"></div>').text(Meteor.user().username + " : " + commentText + "@ " + timeToString(totalSeconds)).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
        fillCommentBar();
      }
    }, false);

    var videoElement = document.getElementById("myvideo");
    function toggleFullScreen() {
      if (!document.fullscreenElement &&
          !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
        if (document.documentElement.requestFullscreen) {
          videoElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
          videoElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          videoElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
          videoElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }

    $(".vote").mouseover(function() {
      if (!($(".vote-msg").hasClass('done'))) {
        $(".vote-msg").show().animate({
          marginTop: "-=150px"
        }, 1000).fadeOut().addClass('done');
      }
    });

    $(".vote").click(
      function() {
        if (!($("#comments").is(":visible"))) {
          $("#vote-icons").slideToggle('400');
        }
      });

  };

  YT.load();
};