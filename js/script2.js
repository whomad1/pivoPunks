const DATABEER = [];


const randomBeer = document.querySelector(".random__beer");
const beerDetailsClass = document.querySelector(".beer__details");
const beerNameClass = document.querySelector(".beer__name");
const mainPageRedirectButton = document.querySelector(".main_page_redirect_btn")

function setDataBeer(data) {
  for (let beer in data) {
    const obj = {
      name: data[beer]["name"],
      tagline: data[beer]["tagline"],
      description: data[beer]["description"],
      first_brewed: data[beer]["first_brewed"],
      image_url: data[beer]["image_url"],
    };
    DATABEER.push(obj);
  }
}


function renderSingleBeer() {
  let beerName = `<h4 class="text-uppercase text-white ">${DATABEER[0][
    "name"]}</h4>`;
  let beerElem = `
          <div class="col-md-6 col-sm-12 random__beer_item">
              <img src="${DATABEER[0]["image_url"]}" alt="menu_item">
              <div class="random__beer_item__annotation">
                  <p>${DATABEER[0]["tagline"]}</p>
                  <p class="random__beer_item__about text-white">${DATABEER[0]["description"]}</p>
              </div>
          </div>
      `;
  beerNameClass.innerHTML = beerName;
  beerDetailsClass.innerHTML = beerElem;
}

(async () => {
    try {
      let urlString = window.location.href;
      let url = new URL(urlString);
      let id = url.searchParams.get("id");
      let data;
      if (!id) {
        data = await fetch("https://api.punkapi.com/v2/beers/random");
      }
      else {
        data = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
      }
      const databeers = await data.json();
      setDataBeer(databeers);
      if (DATABEER.length)  {
        renderSingleBeer();
      }
    } catch (err) {
      console.error(err);
    }
  }) (); 

  mainPageRedirectButton.onclick = () => {
    window.location.href = 'index.html';
  }