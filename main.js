const divContainer = document.createElement("div");
divContainer.className = "container";
document.body.appendChild(divContainer);

const header = document.createElement("header");
divContainer.appendChild(header);

const logo = document.createElement("img");
logo.src = "./logo.png";
logo.className = "logo";
logo.addEventListener("click", () => {
  let searchDiv = document.querySelector(".searchDiv");
  let pokemonProfile = document.querySelector(".pokemonProfile");
  let listPokemon = document.querySelector(".listPokemon");
  if (listPokemon.style.display == "grid") {
    searchDiv.style.display = "none";
    pokemonProfile.style.display = "none";
  } else {
    listPokemon.style.display = "grid";
    searchDiv.style.display = "none";
    pokemonProfile.style.display = "none";
  }
});
header.appendChild(logo);

const divInputData = document.createElement("div");
divInputData.className = "inputData";
header.appendChild(divInputData);

const input = document.createElement("input");
input.type = "text";
// input.className = "input-search";
input.required = true;
input.id = "search";
divInputData.appendChild(input);

const buttonSearch = document.createElement("button");
buttonSearch.className = "buttonSearch";
buttonSearch.innerHTML = "Buscar";
divInputData.appendChild(buttonSearch);

const labelTheme = document.createElement("label");
labelTheme.className = "switch";
labelTheme.for = "checkbox";
header.appendChild(labelTheme);

const inputCheckBox = document.createElement("input");
inputCheckBox.type = "checkbox";
inputCheckBox.id = "checkbox";
labelTheme.appendChild(inputCheckBox);

const divSlider = document.createElement("div");
divSlider.className = "slider round";
labelTheme.appendChild(divSlider);

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
  const divEvent = document.createElement("div");
  divEvent.className = "card-content";
  listPokemon.appendChild(divEvent);

  const divCart = document.createElement("div");
  divCart.className = "divCart";
  divCart.addEventListener("click", () => {
    const pokebollImg = document.createElement("img");
    pokebollImg.src = "./PokemonOpen-Pokeball-Transparent.png";
    pokebollImg.classList.add("pokeball");
    listPokemon.appendChild(pokebollImg);
    setTimeout(() => {
      pokebollImg.remove();
      pokemonDetails(data);
    }, 2000);
  });
  divEvent.addEventListener("mousemove", function (e) {
    const bounds = divEvent.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 4 + center.y ** 4);
    divCart.style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance) * 2}deg
    )
  `;
  });
  divEvent.addEventListener("mouseout", function (e) {
    divCart.style.transform = `rotateX(0deg) rotateY(0deg)`;
    divCart.style.transition = "0.5s linear";
  });
  divEvent.appendChild(divCart);

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
  hpStat.innerHTML = `HpStat: <progress max="100" value=${data.stats[0].base_stat}>`;
  divInfo.appendChild(hpStat);

  const attackStat = document.createElement("p");
  attackStat.innerHTML = `AttackStat: <progress max="100" value=${data.stats[1].base_stat}>`;
  divInfo.appendChild(attackStat);

  const defenseStat = document.createElement("p");
  defenseStat.innerHTML = `DefenseStat: <progress max="100" value=${data.stats[2].base_stat}>`;
  divInfo.appendChild(defenseStat);

  const speedStat = document.createElement("p");
  speedStat.innerHTML = `SpeedStat: <progress max="100" value=${data.stats[3].base_stat}>`;
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
        listPokemon.style.display = "grid";
        searchDiv.style.display = "none";
      }
    });
});

function pokemonDetails(data) {
  const listPokemon = document.querySelector(".listPokemon");
  const profilePokemon = document.querySelector(".pokemonProfile");
  listPokemon.style.display = "none";
  profilePokemon.style.display = "flex";
  pokemonProfile.innerHTML = "";

  const divProfile = document.createElement("div");
  divProfile.className = "divProfilePokemon";
  profilePokemon.appendChild(divProfile);

  const imageProfilePokemon = document.createElement("img");
  imageProfilePokemon.className = "imageProfilePokemon";
  imageProfilePokemon.src = `${data.sprites.other.dream_world.front_default}`;
  divProfile.appendChild(imageProfilePokemon);

  const divInfoDetail = document.createElement("div");
  divInfoDetail.className = "divInfoDetail";
  divProfile.appendChild(divInfoDetail);

  const nameText = document.createElement("p");
  nameText.className = "infoText";
  nameText.innerHTML = `Name: <p class="titleProfile">${data.name}</p>`;
  divInfoDetail.appendChild(nameText);

  const abilityOne = document.createElement("p");
  abilityOne.className = "infoText";
  abilityOne.innerHTML = `Ability 1: <p class="titleProfile">${data.abilities[0].ability.name}</p>`;
  divInfoDetail.appendChild(abilityOne);

  const abilityTwo = document.createElement("p");
  abilityTwo.className = "infoText";
  abilityTwo.innerHTML = `Ability 2: <p class="titleProfile">${data.abilities[1].ability.name}</p>`;
  divInfoDetail.appendChild(abilityTwo);

  const weight = document.createElement("p");
  weight.className = "infoText";
  weight.innerHTML = `Weight: <p class="titleProfile">${data.weight}</p>`;
  divInfoDetail.appendChild(weight);

  const statHp = document.createElement("p");
  statHp.className = "infoText";
  statHp.innerHTML = `Status HP: <p class="titleProfile">${data.stats[0].base_stat}</p>`;
  divInfoDetail.appendChild(statHp);

  const statAttack = document.createElement("p");
  statAttack.className = "infoText";
  statAttack.innerHTML = `Status Attack: <p class="titleProfile">${data.stats[1].base_stat}</p>`;
  divInfoDetail.appendChild(statAttack);

  const statDef = document.createElement("p");
  statDef.className = "infoText";
  statDef.innerHTML = `Status Defense: <p class="titleProfile">${data.stats[2].base_stat}</p>`;
  divInfoDetail.appendChild(statDef);

  const statSpecialDefense = document.createElement("p");
  statSpecialDefense.className = "infoText";
  statSpecialDefense.innerHTML = `Status Attack Special: <p class="titleProfile">${data.stats[3].base_stat}</p>`;
  divInfoDetail.appendChild(statSpecialDefense);

  const statSpecialAttack = document.createElement("p");
  statSpecialAttack.className = "infoText";
  statSpecialAttack.innerHTML = `Status Defense Special: <p class="titleProfile">${data.stats[4].base_stat}</p>`;
  divInfoDetail.appendChild(statSpecialAttack);

  const statSpeed = document.createElement("p");
  statSpeed.className = "infoText";
  statSpeed.innerHTML = `Status Speed: <p class="titleProfile">${data.stats[5].base_stat}</p>`;
  divInfoDetail.appendChild(statSpeed);
}

// function pokeboll() {
//   const canvas = document.createElement("canvas");
//   const profilePokemon = document.querySelector(".pokemonProfile");

//   canvas.className = "view";
//   canvas.width = 800;
//   canvas.height = 600;
//   pokemonProfile.appendChild(canvas);

//   const ctx = canvas.getContext("2d");
//   let counter = 0;
//   function onDraw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.beginPath();
//     ctx.rect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = "red";
//     ctx.fill();
//     ctx.beginPath();
//     ctx.arc(50, 50, 100, 0, 2 * Math.PI);
//     ctx.fillStyle = "blue";
//     ctx.fill();
//     console.log("onDraw", counter);
//     if (counter < 100) window.requestAnimationFrame(onDraw);
//     counter++;
//   }
//   onDraw();
// }
