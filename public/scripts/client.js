/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  // function that takes in tweet object and returns HTML structure of tweet
  const createTweetElement = function(tweet) {
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
      <p>${tweet.created_at}</p>
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
      // append HTML to tweets container
      $('#tweets-container').append($tweet);
    }
  };

  // call render function to add tweets to index.html
  renderTweets(data);

  // use jQuery to add event listener for submit on new tweet form
  $("#tweet-form").on("submit", function(event) {
    // prevent default form submission behaviour
    event.preventDefault();
    // serialize the form data
    const $tweet = $(this).serialize();
    // submit POST request using jQuery
    $.post("/tweets", $tweet);
  });
});
