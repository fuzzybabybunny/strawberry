$(function () {
  $('[data-toggle="tooltip"]').tooltip()

  $(".search-button").on('click', function(event) {
    event.preventDefault();
    if ($(".search-field").hasClass('hidden')) {
      $(".search-field").animate({"width": "200px"}, "fast");
      $("input.form-control").focus();
      $(".search-field").removeClass('hidden');
    } else {
      $(".search-field").animate({"width": "0"}, "fast");
      $(".search-field").addClass('hidden');
    }
    return false;
  });

})
