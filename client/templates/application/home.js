Template.home.rendered = function() {
  // Meteor.call('fetch');

  // Meteor.call("checkTwitter", function(error, results) {
  //   console.log(results.content); //results.data should be a JSON object
  // });

  Meteor.call("ajax_fetch", function(error, results) {
    console.log("home:"+results); //results.data should be a JSON object
  });

  // var url = "http://gdata.youtube.com/feeds/api/standardfeeds/most_viewed?alt=json";
  // var result = HTTP.get(url, {timeout:30000});
  // var params = {
  //   // access_token: Meteor.user().services.google.accessToken,
  //   part: "snippet"
  // };
  // Meteor.http.get(url, function (err, result) {
  //     console.log("here");
  //     console.log(result.statusCode, result.data);
  //     var retdata =  result.data;
  // });

  $(".carousel-inner").hover(function() {
    $(this).find(".carousel-caption").slideToggle('400');
  });

  $(".carousel-control").hover(function() {
    $(this).find(".fa").toggle('400');
  });
};