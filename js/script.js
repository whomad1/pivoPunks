const DATABEER = [];

const kitchenMenu = document.querySelector(".kitchen__menu");
const randomBeer = document.querySelector(".random__beer");
const beer = document.querySelector(".single__beer_details");
const beerName = document.querySelector(".beer__name");
const prevBtn = document.querySelector(".btn-prev");
const nextBtn = document.querySelector(".btn-next");
const pageNumber = document.querySelector(".pagination__numbers");
const per_page_el = document.querySelector("#per_page");
let per_page = 5;
let readMore;
// const per_page = 5;
let page = 1;

prevBtn.onclick = async () => {
  try {
    page -= 1;
    getAllBeer(page, per_page);
  } catch (err) {
    console.error(err);
  }
}

nextBtn.onclick = async () => {
  try {
    page +=1;
    getAllBeer(page, per_page);
  } catch (err) {
    console.error(err);
  }
}

randomBeer.onclick = () => {
  try {
    window.location.href = "singleBeer.html"
  } catch (err) {
    console.error(err);
  }
};

per_page_el.addEventListener('change', () => {
  per_page = per_page_el.value;
  getAllBeer(page, per_page)
})

async function getAllBeer(page = 1, per_page = 5) {
  try {
    const data = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${per_page}`);
    if (page <= 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
    pageNumber.innerHTML = `Страница: ${page}`;
    kitchenMenu.innerHTML = "";
    const databeers = await data.json();
    setDataBeer(null);
    setDataBeer(databeers);
    if (DATABEER.length) {
      renderMenu().then(
        () => {
          readMore = document.querySelectorAll(".read__more");
          Array.from(readMore).forEach(link => {
            link.addEventListener('click', (event) => {
              window.location.href = `singleBeer.html?id=${link.dataset.id}`
            })
          })
        }
      )
    }
  } catch (err) {
    console.error(err);
  }
}

function setDataBeer(data) {
  while (DATABEER.length) {
    DATABEER.pop();
  }
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

getAllBeer(page, per_page);
