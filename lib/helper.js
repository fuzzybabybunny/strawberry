timeToString = function(totalSeconds) {
  minutes = Math.floor(totalSeconds / 60);
  seconds = Math.floor(totalSeconds % 60);
  if (seconds < 10) {
    return minutes + ":" + "0" + seconds;
  } else return minutes + ":" + seconds;
};