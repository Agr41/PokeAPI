const tasksContainer = document.querySelector(".posts");

export const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const task = doc.data();
      const li = ` 
      <div class="pokemon">
      <h2 >${task.title}</h2>
      <p>ID: ${task.idPokemon}</p>
      <p>Peso: ${task.weightPokemon} Kg</p>
      <p>Altura: ${task.heightPokemon} M</p>
      <p>Stats:</p>
      <ul>
      <li>Hp: ${task.hpPokemon}</li>
      <li>Attack: ${task.attackPokemon}</li>
      <li>Defense: ${task.defensePokemon}</li>
      <li>Special-Attack: ${task.specialAttackPokemon}</li>
      <li>Special-Defense: ${task.specialDefensePokemon}</li>
      <li>Speed: ${task.speedPokemon}</li>
      </ul>
      <p>Tipo: ${task.typePokemon}</p>
      <button class='btn-delete' data-id='${doc.id}'>Eliminar</button>
      <button class='btn-edit' data-id='${doc.id}' onclick="document.getElementById('task-title').focus()">Editar</button>
    </div>`;
      html += li;
    });
    tasksContainer.innerHTML = html;
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete');
    
        btnsDelete.forEach(btn => {
          btn.addEventListener('click', ({target: {dataset}}) => {
            deleteTask(dataset.id)
          })
        })
        const btnsEdit = tasksContainer.querySelectorAll('.btn-edit');
    
        btnsEdit.forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const doc = await getTask(e.target.dataset.id)
            const task = doc.data()
    
            taskForm['task-title'].value = task.title
            taskForm["pokemon-id"].value = task.idPokemon
            taskForm["pokemon-weight"].value = task.weightPokemon
            taskForm["pokemon-height"].value = task.heightPokemon
            taskForm["pokemon-type"].value = task.typePokemon
            taskForm['pokemon-hp'].value = task.hpPokemon
            taskForm['pokemon-attack'].value = task.attackPokemon
            taskForm['pokemon-defense'].value = task.defensePokemon
            taskForm['pokemon-special-attack'].value = task.specialAttackPokemon
            taskForm['pokemon-special-defense'].value = task.specialDefensePokemon
            taskForm['pokemon-speed'].value = task.speedPokemon
    
            editStatus = true;
            id = doc.id
    
            taskForm['btn-task-save'].innerText = 'Update'
            taskForm['btn-task-save'].classList.remove('btn-primary');
            taskForm['btn-task-save'].classList.add('btn-secondary');
    
          }) })
  } else {
    tasksContainer.innerHTML = `
                            <h4 class="text-white">Login to See the Pokemons</h4>
                            <img src="./app/Snorlax.webp" alt="Snorlax" class="logged-out">
                          `;
  }
};