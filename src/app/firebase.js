import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js"
import { 
  getFirestore,
  collection, 
  addDoc,
  onSnapshot,
  deleteDoc, 
  doc,
  getDoc,
  updateDoc 
 } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyB0xGEUEBjz59zc93BA-XSwNyVxSIKrSFI",
  authDomain: "pokeapi-cc087.firebaseapp.com",
  projectId: "pokeapi-cc087",
  storageBucket: "pokeapi-cc087.appspot.com",
  messagingSenderId: "407202090729",
  appId: "1:407202090729:web:0d79ca1de1449af4052a78"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

export const saveTask = (
  title, 
  idPokemon, 
  weightPokemon, 
  heightPokemon, 
  typePokemon,
  hpPokemon,
  attackPokemon,
  defensePokemon,
  specialAttackPokemon,
  specialDefensePokemon,
  speedPokemon
  ) => {

  addDoc(collection(db, 'tasks'), {
    title: title,
    idPokemon: idPokemon , 
    weightPokemon: weightPokemon , 
    heightPokemon: heightPokemon , 
    typePokemon: typePokemon , 
    hpPokemon: hpPokemon,
    attackPokemon: attackPokemon,
    defensePokemon: defensePokemon,
    specialAttackPokemon: specialAttackPokemon,
    specialDefensePokemon: specialDefensePokemon,
    speedPokemon: speedPokemon
  })
};

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);
  