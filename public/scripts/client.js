/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

/* 
 * assisted by @nosaoasis
 * take in the information to be rendered
 * loop through it all
 * run createTweetElement on each
 * using jquery render to the page using prepend as we want the newest to be the first shown.
 */

// const renderTweets = function(tweets) {
//   tweets.forEach(tweet => {
//     let $tweet = createTweetElement(tweet);
//     $("#tweet-container").prepend($tweet);
//   });
// };

/*
 * assisted by @nosaoasis
 * take in an object
 * deconstruct object by it's keys
 * set up a variable containing the markup for the HTML element
 * using template literals pass the dynamic values from those keys to the html element
 * return the markup
 */
$( document ).ready(function() {
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
            <p class = "days">${created_at}</p>
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

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}


const $tweet = createTweetElement(tweetData);

console.log($tweet); // to see what it looks like
  $("#tweet-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
// renderTweets(data);

// $( "button" ).click(function() {
//   $( "#tweetpost" ).submit();
//   event.preventDefault();
// });
