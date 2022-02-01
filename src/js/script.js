//waiting for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  //fethcing the data to get categories for generating the nav bar
  fetch("https://classes.codingbootcamp.cz/assets/classes/602/guardian.php")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      //for each generates an <a> tag
      responseData.data.forEach((element) => {
        const container = document.createElement("a");
        container.className = "link";
        container.innerHTML = element;
        //adding a listener to generate correct articles
        container.addEventListener("click", () => {
          loadingArticles(element);
        });
        //putting the element on a page
        document.querySelector("nav").appendChild(container);
      });
    });
});

//defining a function that fetches data and creates articles
const loadingArticles = async (category) => {
  console.log(category);
  try {
    //deleting the old articles
    document.querySelector(".articles").innerHTML = "";
    //fetching the correct articles by using the category
    const response = await fetch(
      `https://classes.codingbootcamp.cz/assets/classes/602/guardian.php?cat=${category}`
    );
    const responseData = await response.json();

    console.log(responseData);

    //looping through all the articles and creating an element for them to be displayed on a page
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
