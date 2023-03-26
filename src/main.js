import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"
import { 
  auth, 
  db,
  saveTask,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask 
} from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";
import { setupPosts } from "./app/postList.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/googleLogin.js'
import './app/facebookLogin.js'
import './app/githubLogin.js'
import './app/logout.js'
import './app/postList.js'
import './app/script.js'


const taskForm = document.getElementById("task-form");
/* const tasksContainer = document.getElementById('tasks-container'); */

let editStatus = false;
let id = '';

// list for auth state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      setupPosts(querySnapshot.docs);
      /* onGetTasks((querySnapshot) => {
        tasksContainer.innerHTML = "";
    
        querySnapshot.forEach((doc) => {
          const task = doc.data();
    
          tasksContainer.innerHTML += `
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
        });
    
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
    
          }) 
        })
    
      }) */
    } catch (error) {
      console.log(error)
    }
  } else {
    setupPosts([]);
    loginCheck(user);
  }
});


/* window.addEventListener("DOMContentLoaded", async (e) => {

  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `
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
    });

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

      }) 
    })

  })
    
      }); */

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = taskForm["task-title"];
  const idPokemon = taskForm["pokemon-id"];
  const weightPokemon = taskForm["pokemon-weight"];
  const heightPokemon = taskForm["pokemon-height"];
  const typePokemon = taskForm["pokemon-type"];
  const hpPokemon = taskForm['pokemon-hp']
  const attackPokemon = taskForm['pokemon-attack']
  const defensePokemon = taskForm['pokemon-defense']
  const specialAttackPokemon = taskForm['pokemon-special-attack']
  const specialDefensePokemon = taskForm['pokemon-special-defense']
  const speedPokemon = taskForm['pokemon-speed']

  if (!editStatus){
    saveTask(
      title.value, 
      idPokemon.value, 
      weightPokemon.value, 
      heightPokemon.value, 
      typePokemon.value, 
      hpPokemon.value, 
      attackPokemon.value, 
      defensePokemon.value, 
      specialAttackPokemon.value, 
      specialDefensePokemon.value, 
      speedPokemon.value 
      )
  } else{
    updateTask(id, {
      title: title.value, 
      idPokemon: idPokemon.value, 
      weightPokemon: weightPokemon.value, 
      heightPokemon: heightPokemon.value, 
      typePokemon: typePokemon.value, 
      hpPokemon: hpPokemon.value, 
      attackPokemon: attackPokemon.value, 
      defensePokemon: defensePokemon.value, 
      specialAttackPokemon: specialAttackPokemon.value, 
      specialDefensePokemon: specialDefensePokemon.value, 
      speedPokemon: speedPokemon.value 
    })
    
    editStatus = false;
  }

  taskForm.reset();
  taskForm['btn-task-save'].innerText = 'Save'
  taskForm['btn-task-save'].classList.remove('btn-secondary');
  taskForm['btn-task-save'].classList.add('btn-primary');

});