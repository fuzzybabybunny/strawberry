Comments = new Mongo.Collection("comments");

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(Meteor.userId(), String);
    check(commentAttributes, {
      text: String,
      currentTime: Number,
      videoId: String
    });

    var user = Meteor.user();
    var comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      createdAt: new Date()
    });

    Comments.insert(comment);

  }
});