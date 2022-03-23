
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

/*
 * function provided by @LHL
 * using a create text node on the input string from the users and returning as innerHTML,
 * it negates XSS usage in the text area.
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*
 * assisted by @nosaoasis and @rachelpr
 * runs an ajax get request on the requested url
 * specifies the data type to JSON
 * using a .then is does two things
 * slices the last (or most recent) element from the data array of tweets
 * Pops it out and returns it as the variable newTweet.
 * It then runs the render Tweets function on that single tweet element.
 */
const loadTweets = function () {
  $.ajax({
    url: "http://localhost:8080/tweets",
    dataType: "JSON"
  }).then(function(data) {
    const newTweet = [data.slice(-1).pop()];
    renderTweets(newTweet);
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
          <p class = "tweet">${escape(content.text)}</p>
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
 * Post method with validation for server side logic.
 * returns an error if the post exceeds the character limit or is empty.
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
      $("textarea").val("");
      loadTweets();
    }
  })
  console.log($(this).serialize());
});
});