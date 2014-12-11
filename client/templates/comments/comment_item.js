// helper function to change currentTime seconds into minute:seconds

Handlebars.registerHelper("timeToString", function(totalSeconds) {
  return timeToString(totalSeconds);
});

Handlebars.registerHelper("dateRange", function(createdAt) {
  var dateRange = function(createdAt) {
    createdDateTime = new Date(createdAt);
    createdDate = createdDateTime.getDate();
    createdMonth = createdDateTime.getMonth();
    createdYear = createdDateTime.getFullYear();
    createdHour = createdDateTime.getHours();
    createdMinutes = createdDateTime.getMinutes();

    currentDateTime = new Date();
    currentDate = currentDateTime.getDate();
    currentMonth = currentDateTime.getMonth();
    currentYear = currentDateTime.getFullYear();
    currentHour = currentDateTime.getHours();
    currentMinutes = currentDateTime.getMinutes();

    if (createdAt.isUndefined) {
      return "";
    } else if ((createdDate === currentDate) && (createdMonth === currentMonth) && (createdYear === currentYear)) {
      if (createdHour === currentHour) {
        return "a few moments ago";
      } else {
        if ((currentHour - createdHour) === 1) {
          return (currentHour - createdHour) + " hour ago";
        } else {
          return (currentHour - createdHour) + " hours ago";
        }
      }
    } else if ((createdMonth === currentMonth) && (createdYear === currentYear)) {
      if ((currentDate - createdDate) === 1) {
        return (currentDate - createdDate) + " day ago";
      } else {
        return (currentDate - createdDate) + " days ago";
      }
    } else if (createdYear === currentYear) {
      if ((currentMonth - createdMonth) === 1) {
        return (currentMonth - createdMonth) + " month ago";
      } else {
        return (currentMonth - createdMonth) + " months ago";
      }
    } else {
      if ((currentYear - createdYear) === 1) {
        return (currentYear - createdYear) + " year ago";
      } else {
        return (currentYear - createdYear) + " years ago";
      }
    }
  };

  return dateRange(createdAt);
});