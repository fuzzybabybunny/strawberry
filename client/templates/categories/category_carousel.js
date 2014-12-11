// Template.categoryCarousel.helpers({
//   categories: function() {
//     return Videos.find({}, {sort: {createdAt: -1}});
//   }
// });

Template.categoryCarousel.rendered = function () {

};

Template.categoryCarousel.helpers({
  'videos': function(){
    console.log(this);
    videos = Videos.find({categoryTopVote: this.foo}).fetch();
    return videos;
  }

});