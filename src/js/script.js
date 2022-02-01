//waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://classes.codingbootcamp.cz/assets/classes/602/guardian.php")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      responseData.data.forEach((element) => {
        const container = document.createElement("a");
        container.className = "link";
        container.innerHTML = element;

        container.addEventListener("click", () => {
          loadingArticles(element);
        });

        document.querySelector("nav").appendChild(container);
      });
    });
});

const loadingArticles = async (category) => {
  console.log(category);
  try {
    document.querySelector(".articles").innerHTML = "";
    const response = await fetch(
      `https://classes.codingbootcamp.cz/assets/classes/602/guardian.php?cat=${category}`
    );
    const responseData = await response.json();

    console.log(responseData);

    responseData.data.channel.item.forEach((element) => {
      const containerArticle = document.createElement("div");
      containerArticle.className = "article";
      containerArticle.innerHTML = `<h3 class="heading">${element.title}</h3><p class="date">${element.pubDate}</p><a href="${element.link}">Read the full article - ${element.title}</a><div>${element.description}</div>`;
      document.querySelector(".articles").appendChild(containerArticle);
    });
  } catch (e) {
    console.log(e);
  }
};
