const URL = "https://kailas-news-backend.onrender.com/news";

window.addEventListener("load", () => fetchNews("food"));

async function fetchNews(query) {
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const cardsTemplete = document.getElementById("card-news-template");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const cardClone = cardsTemplete.content.cloneNode(true);
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
  currentNav?.classList.remove("active");
  currentNav = navItem;
  currentNav.classList.add("active");
}

const searchText = document.getElementById("search-text");
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
});
