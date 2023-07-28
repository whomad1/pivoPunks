const DATABEER = [];

const kitchenMenu = document.querySelector(".kitchen__menu");
const randomBeer = document.querySelector(".random__beer");
const beer = document.querySelector(".single__beer_details");
const beerName = document.querySelector(".beer__name");
let readMore;

async function getAllBeer() {
  try {
    const data = await fetch("https://api.punkapi.com/v2/beers");
    const databeers = await data.json();
    // console.log(databeers);
    setDataBeer(databeers);
    if (DATABEER.length) {
      renderMenu().then(
        () => {
          readMore = document.querySelectorAll(".read__more");
        }
      )
    }
  } catch (err) {
    console.error(err);
  }
}

function setDataBeer(data) {
  for (let beer in data) {
    const obj = {
      id: data[beer]['id'],
      name: data[beer]["name"],
      tagline: data[beer]["tagline"],
      description: data[beer]["description"],
      first_brewed: data[beer]["first_brewed"],
      image_url: data[beer]["image_url"],
    };
    DATABEER.push(obj);
  }
}


async function renderMenu() {
  for (let beer in DATABEER) {
    let beerElem = `
            <div class="col-md-6 col-sm-12 kitchen__menu_item" data-id="${DATABEER[beer]["id"]}">
                <img src="${DATABEER[beer]["image_url"]}" alt="menu_item">
                <div class="kitchen__menu_item__annotation">
                    <div class="kitchen__menu_item__header mb-2"> 
                        <h4 class="text-uppercase text-white">${DATABEER[beer][
                          "name"
                        ].substring(0, 10)}</h4>
                        <div class="read__more" data-id='${DATABEER[beer]["id"]}'><button>Читать больше</button></div>
                    </div>
                    <p>${DATABEER[beer]["tagline"]}</p>
                    <p class="kitchen__menu_item__about text-white">${DATABEER[
                      beer
                    ]["description"].substring(0, 30)}...</p>
                </div>
            </div>
        `;
    kitchenMenu.innerHTML += beerElem;
  }
}

getAllBeer().then(() => {
  // console.log(readMore)
  Array.from(readMore).forEach(link => {
    link.addEventListener('click', (event) => {
      window.location.href = `singleBeer.html?id=${link.dataset.id}`
    })
  })
});


randomBeer.onclick = () => {
  try {
    window.location.href = "singleBeer.html"
  } catch (err) {
    console.error(err);
  }
};





