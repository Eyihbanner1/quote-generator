const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const quoteBtn = document.querySelector('#quote-button')
const loader = document.querySelector('#loader')

let apiQuotes = []

// show loading
function showLoading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

// hide loading
function hideLoading() {
    loader.hidden = true
    quoteContainer.hidden = false
}

// show new quote

function newQuote() {
    showLoading()
    const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    quoteText.textContent = randomQuote.text

    // check if author is empty and replace with 'unknown'
    if (randomQuote.author === '') {
        authorText.textContent = 'Unknown'
    } else {
        authorText.textContent = randomQuote.author
    }

    if (randomQuote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    hideLoading()
}

// get quotes from api

async function getQuotes() {
    showLoading()
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        console.error(error)
    }
}


function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

twitterBtn.addEventListener('click', tweetQuote)
quoteBtn.addEventListener('click', newQuote)

// on load
getQuotes()