Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/videos/:_id', {
  name: 'videoShow',
  data: function() { return Videos.findOne(this.params._id); }
});

Router.route('/profile', {
  name: 'userProfile'
});