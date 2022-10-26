<!--Code inspired from https://github.com/TylerPottsDev/vue-popups-yt-->

<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <h1>Congratulations</h1>
      <h2>Your score was {{score}} </h2>
      <input
          :disabled="scoreSave"
          id="inputID"
          type="text"
          placeholder="Text"
          ref="inputField"
      />
      <button id="enter" @click = "writeUserScore" >Enter</button>
      <div v-if="scoreSave">Your score was added!!</div>
      <div id="flex-button">
      <button class="popup-close" @click="TogglePopup()">
        Play Again
        </button>
        <router-link
            to="/"
            custom
            v-slot="{ navigate }">
          <button
              @click="navigate"
              role="link">
            Home</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { getDatabase, ref, set,push, query, orderByChild, } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCORPg0naNdGeNKhWqx3uf1t23_tc4HfT8",
  authDomain: "funquizgame-7e388.firebaseapp.com",
  projectId: "funquizgame-7e388",
  storageBucket: "funquizgame-7e388.appspot.com",
  messagingSenderId: "52555073590",
  appId: "1:52555073590:web:acf09083912079995db097",
  measurementId: "G-8RBXHLCSXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

export default {
  props: {
    TogglePopup: null,
    score: null,
    scoreSaved: null,
    scoreSave: null,
  },
  beforeCreate() {

  },

  data() {
    return {
      text: '',
      leaderboard: []
    }
  },
  mounted() {
    this.leaderboard = []
    db.ref('users').once('value', function (snapshot) {
      snapshot.forEach((
          function (ChildSnapShot){
              this.leaderboard.push([ChildSnapShot.val().username, ChildSnapShot.val().score])
          }
      ))
    })
    console.log(this.leaderboard)
  },
  methods: {
    writeUserScore: function() {
      push(ref(db, 'users/'),{
        username: this.$refs.inputField.value,
        score: this.score
      }).then(() => {
        this.scoreSaved()
      }).catch((error) => {
        console.log('error')
      })
      document.getElementById('inputID').value = ''
     }
  },


}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

}

.popup-inner {
  background: #FFF;
  padding: 32px;
  text-align: center;
}
#enter{
  box-sizing: border-box;
  font-family: 'Trebuchet MS','Gill Sans', 'Gill Sans MT', Calibri,  sans-serif;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.16, rgb(207, 207, 207)), color-stop(0.79, rgb(252, 252, 252)));
  background-image: -moz-linear-gradient(center bottom, rgb(207, 207, 207) 16%, rgb(252, 252, 252) 79%);
  background-image: linear-gradient(to top, rgb(207, 207, 207) 16%, rgb(252, 252, 252) 79%);
  padding: 3px;
  border: 1px solid #000;
  color: black;
  text-decoration: none;
  height: 24px;
  width: 80px;
}

</style>