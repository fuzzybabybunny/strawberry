Template.commentList.helpers({
  comments: function() {
    return Comments.find({videoId:this._id}, {sort: {createdAt: -1}});
  }
});

