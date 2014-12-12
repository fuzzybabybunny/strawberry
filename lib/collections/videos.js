Videos = new Mongo.Collection("videos");

Meteor.methods({
  videoInsert: function(videoAttributes) {
  check(Meteor.userId(), String);
  check(videoAttributes, {
    videoSourceId: String
  });

  // ********************************************************************************
  // ******************      Get Video Details        *******************************
  // ********************************************************************************

  var user = Meteor.user();
  var comment = _.extend(videoAttributes, {
    userId: user._id,
    author: user.username,
    createdAt: new Date(),
    categoryTopVote: [
      "lmao",
      "love"
    ],
    categoryVotes: {
      lmao: 0,
      love: 0,
      fku: 0,
      magic: 0,
      omfg: 0,
      shite: 0,
      nsfw: 0,
      die: 0
    }
  });

  Videos.insert(comment);

  },
  videoVote: function(voteProperties) {
  check(Meteor.userId(), String);
  check(voteProperties, {
    categoryId: String,
    videoId: String
  });
  var user = Meteor.user();

  var categoryIdLocation = "categoryVotes.".concat(voteProperties.categoryId);
  var a = {};
  a[categoryIdLocation] = 1;

  var affected = Videos.update({
    _id: voteProperties.videoId,
    // upvoters: {$ne: user}
  }, {
    // $addToSet: {upvoters: user},
    $inc: a
  });

  if (! affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");

  // ********************************************************************************
  // ******************      Calculate Top Votes      *******************************
  // ********************************************************************************

  },
  fetch: function() {
    // var url = "http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?alt=json";
    // var result = HTTP.call("GET",url, {timeout:30000});

    // console.log(result);

    // return result;
  },
  ajax_fetch: function() {
    return $.ajax({
      dataType: "json",
      url: "http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?alt=json"
    }).done(function(events) {
      var data = events.feed.entry;

      console.log("ajax_fetch:" + data);

      return data;

    });
  }

});