// Template.categoryCarousel.helpers({
//   categories: function() {
//     return Videos.find({}, {sort: {createdAt: -1}});
//   }
// });

Template.categoryCarousel.rendered = function () {

};

Template.categoryCarousel.helpers({
  'videos': function(){
    videos = Videos.find({categoryTopVote: this.category}).fetch();
    return videos;
  }

});