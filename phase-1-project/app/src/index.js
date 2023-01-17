let pokemonList = [
  "ditto",
  "charizard",
  "dragonite",
  "togekiss",
  "pikachu",
  "farfechd",
  "snafu",
];

document.addEventListener("DOMContentLoaded", async () => {
  pokemonList.forEach(async (pokemon) => {
    createCard(await get(pokemon));
  });
});

const get = async (pokemon) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  return data;
};

function createCard(pokemonObj) {
  let card = document.createElement("div");
  card.className = "card-dark";

  let name = document.createElement("h2");
  name.textContent = pokemonObj.name;
  card.appendChild(name);

  let img = document.createElement("img");
  img.src = pokemonObj.sprites.front_default;
  img.alt = pokemonObj.name;
  img.className = "pokemon-avatar";
  card.appendChild(img);
  img.addEventListener("mouseover", () => {
    img.src = pokemonObj.sprites.front_shiny;
  });
  img.addEventListener("mouseout", () => {
    img.src = pokemonObj.sprites.front_default;
  });

  let hideButton = document.createElement("button");
  hideButton.textContent = "Show/hide details";
  hideButton.className = "hideButton";
  card.appendChild(hideButton);
  hideButton.addEventListener("click", () => {
    statContainer.hidden = !statContainer.hidden;
    measurementContainer.hidden = !measurementContainer.hidden;
  });

  let statContainer = document.createElement("div");
  statContainer.id = "statContainer";
  statContainer.hidden = true;

  let measurementContainer = document.createElement("div");
  measurementContainer.id = "measurementContainer";
  measurementContainer.hidden = true;

  let height = document.createElement("p");
  height.textContent = `height: ${pokemonObj.height * 10}cm`;
  measurementContainer.appendChild(height);

  let weight = document.createElement("p");
  weight.textContent = `weight: ${pokemonObj.weight}lbs`;
  measurementContainer.appendChild(weight);

  let baseHp = document.createElement("p");
  baseHp.textContent = `base HP: ${pokemonObj.stats[0].base_stat}`;
  statContainer.appendChild(baseHp);

  let baseAttack = document.createElement("p");
  baseAttack.textContent = `base ATK: ${pokemonObj.stats[1].base_stat}`;
  statContainer.appendChild(baseAttack);

  let baseDefense = document.createElement("p");
  baseDefense.textContent = `base DEF: ${pokemonObj.stats[2].base_stat}`;
  statContainer.appendChild(baseDefense);

  card.appendChild(measurementContainer);
  card.appendChild(statContainer);
  document.querySelector("#pokemon-collection-dark").appendChild(card);
}

document.addEventListener("dblclick", () => {
  console.log("i have been dblclicked");

  let header = document.getElementById("header");
  let cards = document.getElementById("pokemon-collection-dark");

  if (!cards) {
    cards = document.getElementById("pokemon-collection-light");
  }

  if (header.className === "pokemon-header-dark") {
    header.className = "pokemon-header-light";
    cards.id = "pokemon-collection-light";
  } else {
    header.className = "pokemon-header-dark";
    cards.id = "pokemon-collection-dark";
  }
});
