
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

/* 
 * assisted by @nosaoasis and @rachelpr
 * take in the information to be rendered
 * loop through it all
 * run createTweetElement on each
 * using jquery render to the page using prepend as we want the newest to be the first shown.
 */

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    let $tweet = createTweetElement(tweet);
    $("#tweet-container").prepend($tweet);
  });
};

const checkTextArea = function(text) {
  if (text === '') {
    return false;
  }
  if (text.length >= 141) {
    return false
  }
  return true;
};

const loadTweets = function () {
  $.ajax({
    url: "http://localhost:8080/tweets",
    dataType: "JSON"
  }).then(function(data) {
    renderTweets(data);
  })
};


/*
 * assisted by @nosaoasis and @rachelpr
 * take in an object
 * deconstruct object by it's keys
 * set up a variable containing the markup for the HTML element
 * using template literals pass the dynamic values from those keys to the html element
 * return the markup
 */

const createTweetElement = function(tweetObj) {
  const { user, content, created_at } = tweetObj;
  let markup = $(`
<article class = "tweet">
          <header>
            <div class="name-ava">
            <img src=${user.avatars} alt="" />
            <p class="name">${user.name}</p>
            </div>
            <p class = "username">${user.handle}</p>
          </header>
          <p class = "tweet">${content.text}</p>
          <footer>
            <p class = "days">${timeago.format(created_at)}</p>
          <div class = "icons">
            <i class="fa-solid fa-flag" name = "flag"></i>
            <i class="fa-solid fa-retweet" name = "arrows"></i>
            <i class="fa-solid fa-heart" name = "heart"></i>
          </div>
          </footer>
        </article>
`);
  return markup;
};

/*
 * 
 */
$(document).ready(function() {
$("#tweetpost").on("submit", function(event) {
  event.preventDefault();
  let textarea = $("textarea").val();
  if (textarea.length > 140) {
    $("textarea").after('<span class=error>Error: You exceeded the post limit!</span>')
  } 
  if (textarea === "") {
    $("textarea").after('<span class=error>Error: You have not written anything!</span>')
  } 
  $.ajax({
    method: "POST",
    url: "/tweets",
    data: $(this).serialize(),
    success: function() {
      loadTweets();
    }
  })
  console.log($(this).serialize());
});
});