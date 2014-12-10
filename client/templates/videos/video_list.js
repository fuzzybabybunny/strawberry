Template.videoList.helpers({
  videos: function() {
    return Videos.find({}, {sort: {createdAt: -1}});
  }
});