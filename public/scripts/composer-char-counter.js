$(document).ready(function () {
  $(".textarea").keyup( function () {
    let leftover = 140 - $(this).val().length 
    if (leftover >= 0) {
    $(".textarea").parents("form").find("output.counter").html(leftover).css({"color": "black"});
    }
    if (leftover <= 0) {
      $(".textarea").parents("form").find("output.counter").html(leftover).css({"color":"red"});
    }
  });
});

