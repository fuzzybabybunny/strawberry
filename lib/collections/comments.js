Comments = new Mongo.Collection("comments");

Meteor.methods({
  commentInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      text: String,
      currentTime: Number
    });


    console.log("here");


    var user = Meteor.user();
    var comment = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      createdAt: new Date()
    });

    Comments.insert(comment);

  }
});