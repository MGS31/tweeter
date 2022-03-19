$(document).ready(function () {
  $(".textarea").keyup( function () {
    let leftover = 140 - $(this).val().length 
    const elem1 = $(this).parent();
    const elem2 = $(elem1).children()[2];
    const elem3 = $(elem2).children()[1];
    if (leftover >= 0) {
    $(elem3).html(leftover).removeClass("countRed")
    }
    if (leftover <= 0) {
      $(elem3).html(leftover).addClass("countRed")
    }
  });
});