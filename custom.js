// const URL = "https://kailas-news-backend.onrender.com/news";
// const URL = "https://localhost:4000/news";

const URL = "https://newsapi.org/v2/everything?q=";
API_key = "547ba88fe1e1459aa8883c355079675e";
// GET https://newsapi.org/v2/everything?q=bitcoin&apiKey=547ba88fe1e1459aa8883c355079675e

http: window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  try {
    const url = query ? `${URL}?q=${encodeURIComponent(query)}` : URL;
    // const url = `${URL}${query}&apiKey=${API_key}`;

    // const res = await fetch(url);
    const res = await fetch(`${URL}${query}&apiKey=${API_key}`);
    console.log("res", res);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    // console.log("data", data);
    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const cardsTemplate = document.getElementById("card-news-template");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = cardsTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });

  function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-content");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "__blank");
    });
  }
}

let currentNav = null;

function onNavClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  if (currentNav !== null) {
    currentNav.classList.remove("active");
  }
  currentNav = navItem;
  currentNav.classList.add("active");
}

const searchText = document.getElementById("search-text");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", () => {
  const query = searchText.value.trim();
  if (!query) return;
  fetchNews(query);
});
