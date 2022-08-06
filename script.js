const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newquoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//show loading

const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// hide loeading

const completeLoader = function () {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

const newQuote = function () {
  loading();
  //pick a random quote from api array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check for undefined author
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 150) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // set quote, hide loader
  quoteText.textContent = quote.text;
  completeLoader();
};

const getQuotes = async function () {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
};

// tweet quote

const tweetQuote = function () {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

//event listenres

newquoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
