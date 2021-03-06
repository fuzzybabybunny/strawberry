Template.videoItem.rendered = function(){

  var videoSourceId = this.data.videoSourceId;
  var videoId = this.data._id;

  var DISPLAY_COMMENT_INTERVAL = 1000;
  var LOAD_COMMENT_INTERVAL = 10000;
  var MIN_TIME_LAPSE = 2;
  var REFRESH_VIDEO_PROGRESS = 1000;

  loadCommentBar = function() {
    $("#commentBar").empty();
    var commentsArray = Comments.find({videoId:videoId}, {sort: {currentTime: 1}}).fetch();
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

    $(".commentBarNotch").hover(
      function() {
        var id = $(this).attr('id');
        var commentObj = Comments.findOne({_id:id});
        $('<div class="comment-line"></div>').text(commentObj.author + " : " + commentObj.text).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
      },
      function() {
    });
  };

  initializePlayer = function() {
    $("#progressBar").progressbar({ value: 0 });
    $("#player-videoduration").html(timeToString(player.getDuration()));
    $("#player-currentplaytime").html("0:00");
  };

  onYouTubeIframeAPIReady = function() {

    player = new YT.Player("player", {

      height: "400",
      width: "600",
      videoId: videoSourceId,

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

          var videoComments = Comments.find({videoId:videoId}).fetch();

          var videoOldTime = 0;

          Meteor.setInterval(function () {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
              var videoCurrentTime = player.getCurrentTime();
              var commentsInInterval = videoComments.filter( function (a) {return a.currentTime >= videoOldTime && a.currentTime <= videoCurrentTime; });

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
            var videoCurrentTime = player.getCurrentTime();
            var videoDuration = player.getDuration();
            var videoProgress = videoCurrentTime / videoDuration;
            $("#player-currentplaytime").html(timeToString(videoCurrentTime));
            updatePlayTime(videoProgress);
          }, REFRESH_VIDEO_PROGRESS);

          Meteor.setInterval(function () {
            if (player.getPlayerState() === YT.PlayerState.PLAYING) {
              videoComments = Comments.find({videoId:videoId}).fetch();
            }
          }, LOAD_COMMENT_INTERVAL);

          $("#progressBar").hover(
            function() {
              $("#progressBar").mousemove(function(e){
                var parentOffset = $(this).parent().offset();
                var clickX = e.pageX - parentOffset.left;
                var parentWidth = $(this).parent().width();
                var videoDuration = player.getDuration();
                var newProgress = clickX / parentWidth;
                var newPlayPosition = newProgress * videoDuration;
                $("#progressBar").tooltip({
                  items: "#progressBar",
                  content: timeToString(newPlayPosition),
                  position: { my: "center bottom-10", at: "center top" },
                  track: true
                }).tooltip("open");
              });
            },
            function() {
          });

          initializePlayer();
          loadCommentBar();

        },
        onStateChange: function (event) {
          if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            $(".play").html("<i class='fa fa-pause'></i>");
          }
          else if (player.getPlayerState() === YT.PlayerState.PAUSED) {
            $(".play").html("<i class='fa fa-play'></i>");
          }

          if ((player.getPlayerState() === YT.PlayerState.PLAYING) || (player.getPlayerState() === YT.PlayerState.BUFFERING)) {
            $(".mid-play-button").css('opacity', 0);
          }
        }
      }
    });

    updatePlayTime = function(progress) {
      $('#progressBar .ui-progressbar-value').show().css({'width': $('#progressBar').width() * progress});
    };

    var updateProgressBasedOnBarClick = function(clickEvent) {
      var parentOffset = $(clickEvent.target).parent().offset();
      var clickX = clickEvent.pageX - parentOffset.left;
      var parentWidth = $(clickEvent.target).parent().width();
      var videoDuration = player.getDuration();
      var newProgress = clickX / parentWidth;
      var newPlayPosition = newProgress * videoDuration;
      updatePlayTime(newProgress);
      player.seekTo(newPlayPosition);
    };

    $("#progressBar, #commentBar").click(updateProgressBasedOnBarClick);

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
      if (e.keyCode == 13) {
        $("#comments").slideUp();
        player.playVideo();
        var commentText = $("#comments").val();
        totalSeconds = player.getCurrentTime();
        var comment = {
          text: commentText,
          currentTime: Math.floor(totalSeconds),
          videoId: videoId,
        };
        Meteor.call('commentInsert', comment, function(error, result) {
          if (error)
            return alert(error.reason);
        });
        $('<div class="comment-line"></div>').text(Meteor.user().username + " : " + commentText + "@ " + timeToString(totalSeconds)).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
        loadCommentBar();
      }
    }, false);

    $(".vote").mouseover(function() {
      if (!($(".vote-msg").hasClass('done'))) {
        $(".vote-msg").show().animate({
          marginTop: "-=150px"
        }, 1000).fadeOut().addClass('done');
      }
    });

    $(".vote").click(
      function() {
        if (!($("#comments").is(":visible")) && !($(".vote-msg").is(':visible')) && !($(".share-icons").is(':visible'))) {
          $("#vote-icons").slideToggle('400');
        }
      });

    $(".share").click(
      function() {
        if (!($("#comments").is(":visible")) && !($(".vote-icons").is(':visible'))) {
          $("#share-icons").slideToggle('400');
        }
      });

    $(".mid-play-button").click(function () {
      player.playVideo();
      $(".mid-play-button").fadeOut('slow', function() {
      });

    });

    $("#mid-overlays").click(function() {
      if (player.getPlayerState() === YT.PlayerState.PLAYING) {
        player.pauseVideo();
      }
      else if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
        player.playVideo();
      }
    });

    $("#lmao, #love, #fku, #magic, #omfg, #shite, #nsfw, #die").click(function() {
      var voteProperties = {
        categoryId: $(this).attr('id'),
        videoId: videoId
      };
      console.log(voteProperties);
      Meteor.call('videoVote', voteProperties, function(error, result) {
        if (error)
          return alert(error.reason);
      });

    });

  };

  YT.load();
};

Handlebars.registerHelper("link", function() {
  return "http://strawberrysite.meteor.com/videos/";
});
