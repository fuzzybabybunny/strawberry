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
  waitOn: function(){
    return [
      Meteor.subscribe('videos'),
      Meteor.subscribe('comments')
    ];
  },
  data: function() {
    return Videos.findOne(this.params._id);
  }
});

Router.route('/profile', {
  name: 'userProfile'
});

Router.route('/:_category', {
  name: 'categoryPage',
  data: function(){
     var category = this.params._category;
     return {
        category: category,
     };
  }
});

// Router.route('/:_categories', {
//   // layoutTemplate: 'categoryPageLayout',
//   name: 'categoryPage',
//   data: function(){
//      var category = this.params._categories;
//      // Video collection query to return videos matching category
//      return category;
//   }
// });

// Router.route('/love', {
//   layoutTemplate: 'categoryPageLayout',
//   name: 'categoryPage',
//   data: function(){
//      // return this.params.love;
//   }
// });

// Router.route('/fku', {
//   name: 'categoryPage'
// });

// Router.route('/magic', {
//   name: 'categoryPage'
// });

// Router.route('/omfg', {
//   name: 'categoryPage'
// });

// Router.route('/shite', {
//   name: 'categoryPage'
// });

// Router.route('/nsfw', {
//   name: 'categoryPage'
// });

// Router.route('/die', {
//   name: 'categoryPage'
// });