Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
  this.render('home');
});

Router.route('/videos/:_id', {
  name: 'videoShow'
});

Router.route('/userprofile', {
  name: 'userProfile'
});