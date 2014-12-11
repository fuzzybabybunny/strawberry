Template.categoryPage.helpers({

  'category': function(){
    return this;
  }

});

Template.categoryPage.rendered = function(){

  console.log(this.data.videos);

};