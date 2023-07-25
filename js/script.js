const DATABEER = [];
const kitchenMenu = document.querySelector(".kitchen__menu");
const randomBeer = document.querySelector(".random__beer");
async function getAllBeer() {
  try {
    const data = await fetch("https://api.punkapi.com/v2/beers");
    const databeers = await data.json();
    console.log(data);
    setDataBeer(databeers);
    if (DATABEER.length) render();
  } catch (err) {
    console.error(err);
  }
}

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

function render() {
  for (let beer in DATABEER) {
    let beerElem = `
            <div class="col-md-6 col-sm-12 kitchen__menu_item">
                <img src="${DATABEER[beer]["image_url"]}" alt="menu_item">
                <div class="kitchen__menu_item__annotation">
                    <div class="kitchen__menu_item__header mb-2">
                        <h4 class="text-uppercase text-white">${DATABEER[beer][
                          "name"
                        ].substring(0, 10)}</h3>
                        <span><a href="" class="btn-hover">Читать больше</a></span>
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

getAllBeer();
randomBeer.onclick = async () => {
  try {
    const data = await fetch("https://api.punkapi.com/v2/beers/random");
    const databeers = await data.json();
    console.log(data);
    setDataBeer(databeers);
    if (DATABEER.length) render();
  } catch (err) {
    console.error(err);
  }
};
