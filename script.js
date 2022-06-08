const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorText = document.querySelector('#author')
const twitterBtn = document.querySelector('#twitter')
const quoteBtn = document.querySelector('#quote-button')

function showLoading() {
    const loader = document.querySelector('#loader')
    loader.hidden = false
    quoteContainer.hidden = true
}

function hideLoading() {
    const loader = document.querySelector('#loader')
    loader.hidden = true
    quoteContainer.hidden = false
}

async function getQuote() {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        showLoading()
        const response = await fetch(apiUrl)
        apiData = await response.json()
        const randomQuote = apiData[Math.floor(Math.random() * apiData.length)]
        if (randomQuote.text >= 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.textContent = randomQuote.text
        if (randomQuote.author === '') {
            authorText.textContent = 'Unknown'
        } else {
            authorText.textContent = randomQuote.author
        }
        hideLoading()
    } catch (error) {
        console.log(error)
    }
}

function tweetQuote() {
    const quote = quoteText.textContent
    const author = authorText.textContent
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

twitterBtn.addEventListener('click', tweetQuote)
quoteBtn.addEventListener('click', getQuote)

getQuote()