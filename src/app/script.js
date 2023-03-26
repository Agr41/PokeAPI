fetch("https://pokeapi.co/api/v2/pokemon?limit=99&offset=0")
.then((response) => response.json())
.then((data) => {
  const pokemonList = document.getElementById("pokemon-list");
  const pokemonResults = data.results;
  for (let i = 0; i < pokemonResults.length; i++) {
    const pokemon = pokemonResults[i];
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");
    pokemonList.appendChild(pokemonElement);

    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        const nameElement = document.createElement("h2");
        nameElement.textContent = data.name;
        pokemonElement.appendChild(nameElement);

        const idElement = document.createElement("p");
        idElement.textContent = `ID: ${data.id}`;
        pokemonElement.appendChild(idElement);

        const weightElement = document.createElement("p");
        weightElement.textContent = `Peso: ${data.weight} kg`;
        pokemonElement.appendChild(weightElement);

        const heightElement = document.createElement("p");
        heightElement.textContent = `Altura: ${data.height} m`;
        pokemonElement.appendChild(heightElement);

        const statsTitle = document.createElement("p");
        statsTitle.textContent = `Stats: `;
        pokemonElement.appendChild(statsTitle);

        const statsElement = document.createElement("ul");
        for (let j = 0; j < data.stats.length; j++) {
          const stat = data.stats[j];
          const statElement = document.createElement("li");
          statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
          statsElement.appendChild(statElement);
        }
        pokemonElement.appendChild(statsElement);

        const typeElement = document.createElement("p");
        typeElement.textContent = `Tipo: ${data.types[0].type.name}`;
        pokemonElement.appendChild(typeElement);

        const frontImageElement = document.createElement("img");
        frontImageElement.src = data.sprites.front_default;
        frontImageElement.alt = data.name;
        pokemonElement.appendChild(frontImageElement);

        const backImageElement = document.createElement("img");
        backImageElement.src = data.sprites.back_default;
        backImageElement.alt = `${data.name} (vista trasera)`;
        pokemonElement.appendChild(backImageElement);

        const shinyFrontImageElement = document.createElement("img");
        shinyFrontImageElement.src = data.sprites.front_shiny;
        shinyFrontImageElement.alt = `${data.name} (versión shiny)`;
        pokemonElement.appendChild(shinyFrontImageElement);

        const shinyBackImageElement = document.createElement("img");
        shinyBackImageElement.src = data.sprites.back_shiny;
        shinyBackImageElement.alt = `${data.name} (vista trasera - versión shiny)`;
        pokemonElement.appendChild(shinyBackImageElement);
      });
  }
});
