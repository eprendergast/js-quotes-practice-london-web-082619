const API_ENDPOINT = "http://localhost:3000";
const QUOTES_URL = `${API_ENDPOINT}/quotes`;
const LIKES_URL = `${API_ENDPOINT}/likes`;
const GET_QUOTES_URL = `${API_ENDPOINT}/quotes?_embed=likes`;

const API = {
    getQuotes, 
    postQuote,
    deleteQuote,
    postLike
}

function getQuotes(){
    return fetch(GET_QUOTES_URL).then(response => response.json());
}

function postQuote(quoteData){
    let configObject = generateConfigObject("POST", quoteData);
    return fetch(QUOTES_URL, configObject).then(response => response.json())
}

function deleteQuote(quote){
    let url = `${QUOTES_URL}/${quote.id}`
    let configObject = generateConfigObject("DELETE", {});
    return fetch(url, configObject)
}

function postLike(likeData){
    let configObject = generateConfigObject("POST", likeData);
    return fetch(LIKES_URL, configObject).then(response => response.json())
}

function generateConfigObject(httpMethod, data){
    let configObject = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };
    return configObject;
}