$(document).ready(function() {

  // use jquery to get dom object with id of tweet-text
  // set input event handler and callback function
  $('#tweet-text').on('input', function() {

    // set characters availalbe to 140 minus length of text area input
    const charsAvailable = 140 - $(this).val().length;
    // set variable to dom object with class of counter
    const $counter = $(this).parent().find(".counter");

    // update jQuery counter text to be the current value of chars available
    $counter.text(charsAvailable);

    // if characters available is less than 0, apply counter-red class
    if (charsAvailable < 0) {
      $counter.addClass("counter-red");
      // if characters available is more than 0, remove counter-red class
    } else {
      $counter.removeClass("counter-red");
    }

  });
});