Videos = new Mongo.Collection("videos");

Meteor.methods({
  fetch: function() {
    // var url = "http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed";
    // var result = HTTP.call("GET",url, {timeout:30000});

    // console.log(result);



  },
  checkTwitter: function () {
    this.unblock();
    return Meteor.http.call("GET", "http://search.twitter.com/search.json?q=perkytweets");
  },
  ajax_fetch: function() {
    return $.ajax({
      dataType: "json",
      url: "http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?alt=json"
    }).done(function(events) {
      var data = events.feed.entry;

      console.log("ajax_fetch:" + data);

      // Meteor._sleepForMs(2000);

      return data;

    });
  }

});