// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 

const QUOTE_FORM = document.getElementById('new-quote-form');
const QUOTE_LIST = document.getElementById('quote-list');

document.addEventListener("DOMContentLoaded", () => {
    API.getQuotes().then(quotes => renderQuotes(quotes))
    QUOTE_FORM.addEventListener('submit', createNewQuote)
})

function renderQuotes(quotes){
    quotes.forEach(quote => {
        renderQuote(quote);
    })
}

function renderQuote(quote){
    let quoteListItem = generateQuoteListItem(quote);
    let quoteBlockquote = generateQuoteBlockquote(quote, quoteListItem);
    generateQuoteListItemContent(quote, quoteBlockquote);
}

// RENDER QUOTE HELPER FUNCTIONS

function generateQuoteListItem(quote){
    let quoteListItem = document.createElement('li');
    quoteListItem.className = "quote-card";
    QUOTE_LIST.appendChild(quoteListItem);
    return quoteListItem;
}

function generateQuoteBlockquote(quote, quoteListItem){
    let quoteBlockquote = document.createElement('blockquote');
    quoteBlockquote.className = "blockquote";
    quoteListItem.append(quoteBlockquote);
    return quoteBlockquote;
}

function generateQuoteListItemContent(quote, quoteBlockquote){
    let quoteText = document.createElement('p');
    quoteText.className = "mb-0"
    quoteText.innerText = quote.quote;

    let quoteFooter = document.createElement('footer');
    quoteFooter.className = "blockquote-footer";
    quoteFooter.innerText = quote.author;

    let quoteBreak = document.createElement('br');

    let quoteLikeButton = document.createElement('button');
    quoteLikeButton.className = "btn-success";
    quoteLikeButton.innerText = "Likes: ";
    if (quote.likes){
        debugger
        quoteLikeButton.insertAdjacentHTML('beforeend', `<span>${quote.likes.length}</span>`);
    } else {
        quoteLikeButton.insertAdjacentHTML('beforeend', `<span>0</span>`);
    }
    quoteLikeButton.addEventListener('click', () => {
        likeQuote(event, quote);
    })

    let quoteDeleteButton = document.createElement('button');
    quoteDeleteButton.className = "btn-danger";
    quoteDeleteButton.innerText = "Delete";
    quoteDeleteButton.addEventListener('click', () => {
        deleteQuote(event, quote)
    });
    quoteBlockquote.append(quoteText, quoteFooter, quoteBreak, quoteLikeButton, quoteDeleteButton)
}

// Submitting the form creates a new quote and adds it to the list of quotes

function createNewQuote(event){
    event.preventDefault();

    let quoteData = {
        quote: document.getElementById('new-quote').value,
        author: document.getElementById('author').value
    }

    API.postQuote(quoteData).then(renderQuote)
}

// Delete button deleted the respective quote and removes it from the page

function deleteQuote(event, quote){
    event.preventDefault();
    
    API.deleteQuote(quote)

    let quoteLi = event.target.parentElement.parentElement
    quoteLi.parentNode.removeChild(quoteLi)
}

// Clicking like with create a lit fot 

function likeQuote(event, quote){
    event.preventDefault();

    let likeData = {
        quoteID: quote.id,
        createdAt: Date(Date.now())
    }

    API.postLike(likeData)

    updateLikeButton(event)

}

function updateLikeButton(event){
    let likes = event.target.querySelector('span').innerText;
    event.target.querySelector('span').innerText = parseInt(likes) + 1;
}