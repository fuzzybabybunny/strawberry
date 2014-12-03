Template.body.helpers({
  comments: function() {
    return Comments.find({}, {sort: {createdAt: -1}});
  }
});

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

        // Play video when player ready.
        // event.target.playVideo();
      }

    }

  });

  var videoData = Comments.find().fetch();

  var commentInterval = 1000;
  var minTimeLapse = 2;
  var videoOldTime = 0;
  var refreshDataInterval = 10000;

  Meteor.setInterval(function () {
    if (player.getPlayerState() === 1) {
      var videoCurrentTime = player.getCurrentTime();
      // console.log(videoCurrentTime);
      dataArray = videoData.filter( function (a) {return a.currentTime >= videoOldTime && a.currentTime <= videoCurrentTime; });
      // console.log("between" + videoOldTime + " and " + videoCurrentTime + " : " + dataArray.length);

      if (dataArray !== [] && videoCurrentTime - videoOldTime <= minTimeLapse) {
        var arrayLength = dataArray.length;
        for (var i = 0; i < arrayLength; i++) {
          var comment = dataArray[i].text;
          // console.log(comment);
          totalSeconds = videoCurrentTime;
          minutes = Math.floor(totalSeconds / 60);
          seconds = Math.floor(totalSeconds % 60);
          $('<div class="comment"></div>').text(comment +"@ "+ minutes + ":" + seconds ).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
        }
      }
      videoOldTime = videoCurrentTime;
    }
  }, commentInterval);

  Meteor.setInterval(function () {
    if (player.getPlayerState() === 1) {
      videoData = Comments.find().fetch();
      console.log(videoData);
    }
  }, refreshDataInterval);

  // Meteor.setInterval(function () {
  //   if (player.getPlayerState() === 1) {
  //     videoCurrentTime = Math.floor(player.getCurrentTime());
  //     console.log(videoCurrentTime);
  //     if (Comments.findOne({currentTime: videoCurrentTime}) !== undefined ) {
  //       var comment = Comments.findOne({currentTime: videoCurrentTime}).text;
  //       console.log(comment);
  //       totalSeconds = player.getCurrentTime();
  //       minutes = Math.floor(totalSeconds / 60);
  //       seconds = Math.floor(totalSeconds % 60);
  //       // $(".comment-box").text(comment +"@ "+ minutes + ":" + seconds ).fadeIn('500').delay('1000').fadeOut('500');
  //       $('<div class="comment"></div>').text(comment +"@ "+ minutes + ":" + seconds ).appendTo('.comment-box').fadeIn(500).delay(1000).fadeOut(500);
  //     }
  //   }
  // }, 1000);

  $(".play").click(function() {
    player.playVideo();
    // toggleFullScreen();
  });

  $(".pause").click(function() {
    player.pauseVideo();
    // $(".duration").html(player.getDuration());
  });

  $(".comment").click(function() {
    player.pauseVideo();
    // $(".duration").html(player.getDuration());
    var comment = $("#comments").val('');
    $("#comments").slideDown().focus();
  });



  var el = document.getElementById("comments")
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
      Comments.insert({text: comment, currentTime: Math.floor(totalSeconds), createdAt: new Date()})
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

  // document.addEventListener("keydown", function(e) {
  //   if (e.keyCode == 13) {
  //     toggleFullScreen();
  //   }
  // }, false);



};

YT.load();