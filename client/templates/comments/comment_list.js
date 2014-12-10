Template.commentList.helpers({
  comments: function() {
    return Comments.find({}, {sort: {createdAt: -1}});
  }
});

