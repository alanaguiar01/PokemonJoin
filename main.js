const divContainer = document.createElement("div");
divContainer.className = "container";
document.body.appendChild(divContainer);

const header = document.createElement("header");
divContainer.appendChild(header);

const logo = document.createElement("h1");
logo.innerHTML = "PokemonJoin";
logo.addEventListener("click", () => {
  let searchDiv = document.querySelector(".searchDiv");
  let pokemonProfile = document.querySelector(".pokemonProfile");
  let listPokemon = document.querySelector(".listPokemon");
  if (listPokemon.style.display == "block") {
    searchDiv.style.display = "none";
    pokemonProfile.style.display = "none";
  } else {
    listPokemon.style.display = "block";
    searchDiv.style.display = "none";
    pokemonProfile.style.display = "none";
  }
});
header.appendChild(logo);

const input = document.createElement("input");
input.type = "text";
input.className = "form-control";
input.required = true;
input.id = "search";
header.appendChild(input);

const buttonSearch = document.createElement("button");
buttonSearch.className = "buttonSearch";
buttonSearch.innerText = "buscar";
header.appendChild(buttonSearch);

const buttonTheme = document.createElement("button");
buttonTheme.className = "buttonTheme";
buttonTheme.innerText = "Dark Theme";
header.appendChild(buttonTheme);

const listPokemon = document.createElement("div");
listPokemon.className = "listPokemon";
divContainer.appendChild(listPokemon);

const pokemonProfile = document.createElement("div");
pokemonProfile.className = "pokemonProfile";
pokemonProfile.style.display = "none";
divContainer.appendChild(pokemonProfile);

const searchDiv = document.createElement("div");
searchDiv.className = "searchDiv";
searchDiv.style.display = "none";
searchDiv.style.backgroundColor = "grey";
divContainer.appendChild(searchDiv);

const topButton = document.createElement("button");
topButton.className = "topButton";
topButton.innerText = "Top";
topButton.onclick = scrollTop;
divContainer.appendChild(topButton);

const url = "https://pokeapi.co/api/v2/pokemon/";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.results.map((el) => {
      fetch(el.url)
        .then((response) => response.json())
        .then((data) => generateCardEachPokemon(data));
    });
  });

function scrollTop() {
  window.scrollTo(0, 0);
}

function generateCardEachPokemon(data) {
  const divCart = document.createElement("div");
  divCart.className = "divCart";
  divCart.addEventListener("click", () => {
    pokemonDetails(data);
  });
  listPokemon.appendChild(divCart);

  const divImg = document.createElement("img");
  divImg.className = "divImg";
  divImg.src = data.sprites.other.dream_world.front_default;
  divCart.appendChild(divImg);

  const divInfo = document.createElement("div");
  divInfo.className = "divInfo";
  divCart.appendChild(divInfo);

  const namePokedex = document.createElement("h3");
  namePokedex.innerText = `Pokemon: ${data.name}`;
  divInfo.appendChild(namePokedex);

  const hpStat = document.createElement("p");
  hpStat.innerText = `HpStat: ${data.stats[0].base_stat}`;
  divInfo.appendChild(hpStat);

  const attackStat = document.createElement("p");
  attackStat.innerText = `AttackStat: ${data.stats[1].base_stat}`;
  divInfo.appendChild(attackStat);

  const defenseStat = document.createElement("p");
  defenseStat.innerText = `DefenseStat: ${data.stats[2].base_stat}`;
  divInfo.appendChild(defenseStat);

  const speedStat = document.createElement("p");
  speedStat.innerText = `SpeedStat: ${data.stats[3].base_stat}`;
  divInfo.appendChild(speedStat);
}

function renderPokemonFound(data) {
  fetch(data.url)
    .then((response) => response.json())
    .then((data) => {
      const divFoundPokemon = document.createElement("div");
      divFoundPokemon.addEventListener("click", () => {
        searchDiv.style.display = "none";
        pokemonProfile.style.display = "block";
        pokemonDetails(data);
      });
      searchDiv.appendChild(divFoundPokemon);

      const pokemon = document.createElement("p");
      pokemon.innerText = `Pokemon: ${data.name}`;
      divFoundPokemon.appendChild(pokemon);

      const searchImage = document.createElement("img");
      searchImage.className = "imgSearch";
      searchImage.src = data.sprites.other.dream_world.front_default;
      divFoundPokemon.appendChild(searchImage);
    });
}

buttonSearch.addEventListener("click", () => {
  const listPokemon = document.querySelector(".listPokemon");
  const searchDiv = document.querySelector(".searchDiv");
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (search.value !== "") {
        listPokemon.style.display = "none";
        searchDiv.style.display = "block";
        searchDiv.innerHTML = "";
        if (data) {
          data.results
            .filter((pokemon) =>
              pokemon.name.startsWith(search.value.toLowerCase())
            )
            .forEach(renderPokemonFound);
        }
      } else {
        listPokemon.style.display = "block";
        searchDiv.style.display = "none";
      }
    });
});

function pokemonDetails(data) {
  const listPokemon = document.querySelector(".listPokemon");
  const profilePokemon = document.querySelector(".pokemonProfile");
  listPokemon.style.display = "none";
  profilePokemon.style.display = "block";
  pokemonProfile.innerHTML = "";

  const divImage = document.createElement("img");
  divImage.src = `${data.sprites.other.dream_world.front_default}`;
  pokemonProfile.appendChild(divImage);

  const divInfoDetail = document.createElement("div");
  divInfoDetail.className = "divInfoDetail";
  pokemonProfile.appendChild(divInfoDetail);

  const nameText = document.createElement("p");
  nameText.innerText = `Name: ${data.name}`;
  divInfoDetail.appendChild(nameText);

  const abilityOne = document.createElement("p");
  abilityOne.innerText = `Ability 1: ${data.abilities[0].ability.name}`;
  divInfoDetail.appendChild(abilityOne);

  const abilityTwo = document.createElement("p");
  abilityTwo.innerText = `Ability 2: ${data.abilities[1].ability.name}`;
  divInfoDetail.appendChild(abilityTwo);

  const weight = document.createElement("p");
  weight.innerText = `Weight: ${data.weight}`;
  divInfoDetail.appendChild(weight);

  const statHp = document.createElement("p");
  statHp.innerText = `Status HP: ${data.stats[0].base_stat}`;
  divInfoDetail.appendChild(statHp);

  const statAttack = document.createElement("p");
  statAttack.innerText = `Status Attack: ${data.stats[1].base_stat}`;
  divInfoDetail.appendChild(statAttack);

  const statDef = document.createElement("p");
  statDef.innerText = `Status Defense: ${data.stats[2].base_stat}`;
  divInfoDetail.appendChild(statDef);

  const statSpecialDefense = document.createElement("p");
  statSpecialDefense.innerText = `Status Attack Special: ${data.stats[3].base_stat}`;
  divInfoDetail.appendChild(statSpecialDefense);

  const statSpecialAttack = document.createElement("p");
  statSpecialAttack.innerText = `Status Defense Special: ${data.stats[4].base_stat}`;
  divInfoDetail.appendChild(statSpecialAttack);

  const statSpeed = document.createElement("p");
  statSpeed.innerText = `Status Speed: ${data.stats[5].base_stat}`;
  divInfoDetail.appendChild(statSpeed);
}
