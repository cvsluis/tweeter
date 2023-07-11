/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // function that takes in tweet object and returns HTML structure of tweet
  const createTweetElement = function(tweet) {
    // format date using timeago
    const timeAgo = timeago.format(tweet.created_at);

    // create HTML markup using template literals
    const $tweet = `      
  <article class="tweet">
    <header>
      <div class="user-icon">
        <img src="${tweet.user.avatars}"/>
        <h3>${tweet.user.name}</h3>
      </div>
      <h4>${tweet.user.handle}</h4>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <p>${timeAgo}</p>
      <div class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`;
    return $tweet;
  };

  // function that takes in array of tweets
  // and appends each tweet to tweets container
  const renderTweets = function(tweets) {
    // loop through tweets
    for (const tweet of tweets) {
      // create HTML for the tweet
      const $tweet = createTweetElement(tweet);
      // prepend HTML to tweets container
      $('#tweets-container').prepend($tweet);
    }
  };

  // function that fetches tweets from /tweets and calls 
  // rendering function on tweet data
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      // call render function to add tweets to index.html
      renderTweets(data);
    });
  };

  loadTweets();

  // function that prepends the last added tweet to the page
  const loadOneTweet = function() {
    $.get("/tweets", function(data) {
      renderTweets([data[data.length - 1]]);
    });
  };

  // use jQuery to add event listener for submit on new tweet form
  $("#tweet-form").on("submit", function(event) {
    // prevent default form submission behaviour
    event.preventDefault();

    // serialize the form data
    const $tweet = $(this).serialize();
    // submit POST request using jQuery's Ajax method
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $tweet
    }).then(function() {
      // call function that renders one tweet
      loadOneTweet();
      // reset text area and counter
      $('#tweet-text').val('');
      $('.counter').val(140);
    });
  });
});
