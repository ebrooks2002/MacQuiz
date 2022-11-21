<!--Code inspired from https://github.com/TylerPottsDev/vue-popups-yt-->

<template>
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <h1>Congratulations</h1>
      <h2>Your score was {{score}} </h2>
      <table v-if="scoreSave" class="styled-table">
        <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user,index) in leaderboard" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{user[0]}}</td>
          <td>{{user[1]}}</td>
        </tr>
        </tbody>
      </table>
      <input
          v-if="!scoreSave"
          id="inputID"
          type="text"
          placeholder="Enter Name"
          ref="inputField"
          @keyup.enter = "writeUserScore"
      />
      <button id="enter" @click = "writeUserScore" v-if="!scoreSave" >Enter</button>
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

import { getDatabase, ref, set,push, query, orderByChild, onValue } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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
const db = getDatabase();

// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  props: {
    TogglePopup: null,
    score: null,
    scoreSaved: null,
    scoreSave: null,
  },


  data() {
    return {
      text: '',
      leaderboard: []
    }
  },

  created() {
    this.leaderboard = this.getLeaderboard()
  },
  mounted() {
  },
  methods: {
    writeUserScore: function() {
      console.log(this.leaderboard)
      push(ref(db, 'users/'),{
        username: this.$refs.inputField.value,
        score: this.score
      }).then(() => {
        this.scoreSaved()
      }).catch((error) => {
        console.log('error')
      })
      document.getElementById('inputID').value = ''
      this.leaderboard = this.getLeaderboard()
     },

    getLeaderboard: function () {
      let data = ref(db,'users')
      let leaderboard = []
      onValue(data, function (snapshot) {
        snapshot.forEach((
            function (ChildSnapShot){
              leaderboard.push([ChildSnapShot.val().username, ChildSnapShot.val().score])
            }
        ))
      })
      leaderboard = leaderboard.sort(function(a,b) { return a[1] - b[1]; });
      leaderboard = leaderboard.slice(-10)
      leaderboard.reverse()
      return leaderboard
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
  border: 3px solid #D44420;

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
  cursor: pointer;
}

/*Code From https://dev.to/dcodeyt/creating-beautiful-html-tables-with-css-428l*/
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  background-color:  #D44420;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 6px 15px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #D44420;
}
.styled-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}

button{
  background-color: #D44420;
  border-radius: 10px;
  box-sizing: border-box;
  -webkit-text-fill-color: white;
  width: 150px;
  height: 50px;
  margin: 7px;


}

</style>