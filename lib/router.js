Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function(){
    return [
      Meteor.subscribe('videos'),
      Meteor.subscribe('comments')
    ];
  }
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/videos/:_id', {
  name: 'videoShow',
  data: function() {
    return Videos.findOne(this.params._id);
  }
});

Router.route('/profile', {
  name: 'userProfile'
});