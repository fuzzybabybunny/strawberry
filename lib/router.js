Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function(){
    return [Meteor.subscribe('videos'), Meteor.subscribe('comments')];
  }
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/videos/:_id', {
  name: 'videoShow',
  // waitOn: function() {
  //   return [
  //     Meteor.subscribe('videos'),
  //     Meteor.subscribe('comments')
  //   ];
  // },
  data: function() {
    return Videos.findOne(this.params._id);
  }
});

Router.route('/profile', {
  name: 'userProfile'
});

Router.route('/:_category', {
  name: 'categoryPage',
  // waitOn: function() {
  //   Meteor.subscribe('videos');
  // },
  data: function(){
     var category = this.params._category;
     return {
        category: category,
        videos: Videos.find({categoryTopVote:category})
     };
  }
});