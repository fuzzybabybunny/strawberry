Template.commentList.helpers({
  comments: function() {
    return Comment.find({}, {sort: {createdAt: -1}});
  }
});