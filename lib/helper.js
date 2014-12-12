// Formats time from seconds
timeToString = function(totalSeconds) {
  minutes = Math.floor(totalSeconds / 60);
  seconds = Math.floor(totalSeconds % 60);
  if (seconds < 10) {
    return minutes + ":" + "0" + seconds;
  } else return minutes + ":" + seconds;
};

// Toggles video fullscreen mode
toggleFullScreen = function() {
  var videoElement = document.getElementById("myvideo");
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
};

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
