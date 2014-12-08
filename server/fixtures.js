if (Comments.find().count() === 0) {
  var now = new Date().getTime();
  var harryId = Meteor.users.insert({
    profile: { name: 'harryng' }
  });
  var harry = Meteor.users.findOne(harryId);
  var markId = Meteor.users.insert({
    profile: { name: 'markwilson' }
  });
  var mark = Meteor.users.findOne(markId);
  var ferId = Meteor.users.insert({
    profile: { name: 'ferfer' }
  });
  var fer = Meteor.users.findOne(ferId);

  Comments.insert({
    userId: harry._id,
    author: harry.profile.name,
    submitted: new Date(),
    text: "evil laugh evil laugh",
    currentTime: 2
  });

  Comments.insert({
    userId: harry._id,
    author: harry.profile.name,
    submitted: new Date(),
    text: "evil laugh evil laugh",
    currentTime: 4
  });

  Comments.insert({
    userId: mark._id,
    author: mark.profile.name,
    submitted: new Date(),
    text: "yelp yelp yelp",
    currentTime: 1
  });

  Comments.insert({
    userId: mark._id,
    author: mark.profile.name,
    submitted: new Date(),
    text: "wakeboard is fun",
    currentTime: 3
  });

  Comments.insert({
    userId: fer._id,
    author: fer.profile.name,
    submitted: new Date(),
    text: "are you sure about that?",
    currentTime: 5
  });

  Comments.insert({
    userId: fer._id,
    author: fer.profile.name,
    submitted: new Date(),
    text: "soccerballs",
    currentTime: 6
  });

}