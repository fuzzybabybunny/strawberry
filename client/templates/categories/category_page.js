Template.categoryPage.helpers({

  'category': function(){
    return this.category;
  }

});

Template.categoryPage.rendered = function(){

  console.log(this.data);
};