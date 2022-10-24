<template>
  <div class="navBar">
    <router-link id="homeBtn" to="/">FunQuizGame</router-link>
  </div>
  <div class="container">
    <finished
      v-if="buttonTrigger"
      :score = "score"
      :TogglePopup = "resetGame"
    >
    </finished>
    <div class = "flexBox" id="image">
      <img :src="image">
    </div>
    <div class = "flexBox" id="options">
      <div id="info" >
        Score:{{ score }} Points: <span ref="points"> {{timerCount}}</span>
      </div>
      <v-button id="option1" :onclick ="optionBtn" :option= "options[0]" class="non" :disabled="display"></v-button>
      <v-button id="option2" :onclick="optionBtn"  :option= "options[1]" class="non" :disabled="display"></v-button>
      <v-button id="option3" :onclick="optionBtn"  :option= "options[2]" class="non" :disabled="display"></v-button>
      <v-button id="option4" :onclick="optionBtn"  :option= "options[3]" class="non" :disabled="display"></v-button>
      <div id = "lives"> lives: {{lives}}</div>
    </div>
    <button v-if="display" v-on:click="nextClick()" id="next"> Next</button>

  </div>
</template>
<script>
import  VButton from "./components/VButton.vue";
import Finished from "./components/Finished.vue"
import { ref } from 'vue';

const TOTAL_NUMBER_INDEXES = 8 // how many spots for images we have, max poosible index would be -1
const NUMBER_INDEXES_PER_PLACE = 10 // how many spots per image, first 5 used, second 5 buffer
export default {
  components: {
    "finished":Finished,
    "v-button":VButton
  },
  data() {
    return {
      score: 0,
      display: false,
      randomPlaces: null,
      places: [
        "Olin-Rice",
        "Campus Center",
        "Janet Wallace",
        "Leonard Center",
        "Old Main",
        "Carnegie",
        "Dupre",
        "Kagin",
        "Weyerhauser"
      ],
      image: null,
      correctAns: null,
      clickedBtn: null,
      timerCount: 1000,
      stopTimer: false,
      points: 0,
      timer: null,
      isRunning: false,
      lives: 3,
      buttonTrigger: false
    }
  },
  created: function() {
      this.isRunning = true
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.timerCount > 0) {
            this.timerCount--
          } else {
            this.stop()
            this.optionBtn()
          }
        }, 10)
      }
    },
  computed: {
    options() {
      let places = this.places
      let arr = []
      let i = 0
      while (arr.length < 4){
        let index = Math.floor(Math.random() * this.places.length)
        if (!arr.includes(places[index])  && places[index] !== this.correctAns){
          arr[i] = places[index]
          i++
        }
      }
      let correctIndex = Math.floor(Math.random() * arr.length)
      arr[correctIndex] = this.correctAns
      return arr
    }
  },
  mounted() {
    this.image = this.randomImg()
    this.options[0], this.options[1],this.options[2], this.options[3] = this.randomOption2()
    this.places =[
      "77 Mac",
      "Bell",
      "Campus Center",
      "Chapel",
      "DeWitt Wallace Library",
      "Humanities",
      "Janet Wallace",
      "Kagin",
      "Leonard Center",
      "Link",
      "Markim",
      "Old Main",
      "Olin Rice",
      "Weyerhaeuser",
      "30 Mac",
      "Bigelow",
      "Doty",
      "Dupre",
      "George Draper Dayton",
      "Kirk",
      "Turk",
      "Wallace"
    ]
    this.correctAns = this.correctAnswer()
    this.randomPlaces = this.randomOption2()
  },
  methods: {
    resetGame: function (){
          this.score = 0
          this.image = null
          this.correctAns = null
          this.clickedBtn = null
          this.timerCount = 1000
          this.stopTimer = false
          this.points = 0
          this.timer = null
          this.isRunning = false
          this.lives = 3
          this.buttonTrigger = false
      this.nextClick()

    },
    optionBtn: function(event) {
      console.log(this.correctAns)
      this.showCorrectAnswer()
      this.display = !this.display
      this.clickedBtn = (event !== undefined) ? event.target.id:undefined
      this.stopTimer = true
      this.stop()
      this.checkIfCorrect()
      if (this.lives <= 0)
        this.TogglePopup()
    },
    toggleDisplay: function (){
      this.display = !this.display
    },
    TogglePopup: function (){
      this.buttonTrigger = !this.buttonTrigger
    },
    randomOption2: function() {
      let places = this.places
      let arr = []
      let i = 0
      while (arr.length < 4){
        let index = Math.floor(Math.random() * this.places.length)
        if (!arr.includes(places[index]) && places[index] !== this.correctAns){
          arr[i] = places[index]
          i++
        }
      }
      let correctIndex = Math.floor(Math.random() * arr.length)
      arr[correctIndex] = this.correctAns
      return arr
    },
    randomImg: function() {
      let index = Math.floor(Math.random() * TOTAL_NUMBER_INDEXES)
      let path = "src/assets/images/"
      let img = path + index + ".jpg"
      return img
    },
    checkValidIndex: function (index){

    },
    nextClick: function() {
      this.toggleDisplay()
      this.resetClasses()
      console.log(this.places)
      this.image = this.randomImg()
      this.correctAns = this.correctAnswer()
      this.start()
      let options = this.randomOption2()
      this.options[0] = options[0]
      this.options[1] = options[1]
      this.options[2] = options[2]
      this.options[3] = options[3]
      this.timerCount = 1000
      this.stopTimer = false
    },
    correctAnswer: function() {
      
      if (this.image.slice(18, this.image.length-4) === '0'){
        return "Carnegie"
      }
      if (this.image.slice(18, this.image.length-4) === '1'){
        return "Dupre"
      }
      if (this.image.slice(18, this.image.length-4) === '2'){
        return "Janet Wallace"
      }
      if (this.image.slice(18, this.image.length-4) === '3'){
        return "Kagin"
      }
      if (this.image.slice(18, this.image.length-4) === '4'){
        return "Leonard Center"
      }
      if (this.image.slice(18, this.image.length-4) === '5'){
        return "Old Main"
      }
      if (this.image.slice(18, this.image.length-4) === '6'){
        return "Olin-Rice"
      }
      if (this.image.slice(18, this.image.length-4) === '7'){
        return "Weyerhauser"
      }
    },
    showCorrectAnswer: function (){
      if (this.options[0] === this.correctAns){
        document.getElementById("option1").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      }
      else if (this.options[1] === this.correctAns){
        document.getElementById("option2").className = "correct"
        document.getElementById("option1").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      }
      else if (this.options[2] === this.correctAns){
        document.getElementById("option3").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option1").className = "incorrect"
        document.getElementById("option4").className = "incorrect"
      }
      else if (this.options[3] === this.correctAns){
        document.getElementById("option4").className = "correct"
        document.getElementById("option2").className = "incorrect"
        document.getElementById("option3").className = "incorrect"
        document.getElementById("option1").className = "incorrect"
      }
    },
    resetClasses: function() {
      document.getElementById("option4").className = "non"
      document.getElementById("option2").className = "non"
      document.getElementById("option3").className = "non"
      document.getElementById("option1").className = "non"
    },
    checkIfCorrect: function () {
      if (this.clickedBtn !== undefined) {

        let btn = document.getElementById(this.clickedBtn)
        if (btn.className === 'correct') {
          this.score += this.timerCount
          return
        }
      }
      this.lives--
    },

    start() {
      this.timerCount = 1000
      this.isRunning = true
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.timerCount > 0) {
            this.timerCount--
          } else {
            this.stop()
            this.optionBtn()
          }
        }, 10)
      }
    },
    stop () {
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
    },
  }
}
</script>

<style scoped>
.navBar{
  text-align: left;
  font-size: 3vh;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-color: #01426a;
  top: 100%;
  color: rgb(184, 184, 184);
  padding: 10px;
  border-radius: 5px;
  min-height: 5vh;

}
#homeBtn{
  text-decoration:none;
  color: hwb(190 75% 1%);
  vertical-align: middle;
  padding: 0;
}
.container{
  justify-content: center;
  margin-top: 50px;
  display: flex;
  margin-left: 50px;
  margin-right: 50px;
}
.flexBox{
  height: 600px;
  width: 500px;
  margin-top: 20px;
  text-align: center;
  padding: 5px
}
#info{
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  font-size: 45px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  margin: auto;
}
#image{
  clear: both;
  margin-right: 2px;
  margin-top: 0px;
  background-color: #c28475;
  text-align: center;
  font-size: 20px;
  height: 600px;
  overflow: hidden;
  border-radius: 7%;
  padding: 0px;
  border-style: dashed;
  border-width: 3px;
  border-color: rgb(0, 0, 0);
}
img{
  width: auto;
  height: 100%;
}
#options{
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
}
button{
  width: 21vmax;
  background-color: #01426a;
  height: 21vmax;
  max-width: 220px;
  max-height: 220px;
  margin-left: 20px;
  box-sizing: border-box;
  font-size: 3vmin;
  font-family: 'Trebuchet MS','Gill Sans', 'Gill Sans MT', Calibri,  sans-serif;
  border-radius: 15px;
  border-style: double;
  border-width: 5px;
  border-color: rgba(191, 155, 239, 0.554);
  transition-property: width,height,background-color;
}
.non:hover{
 background-color: orange;
 transition: 0.2s;
}

#next{
  width: 170px;
  height: 170px;
  border-style: groove;
  font-size: 3vw;
  background-color: #fc6e4aa4;
  position: absolute;
  bottom: 0;
  right: 0;
  animation: forwards;
  animation-duration: 2s;
}
#next:hover{
  background-color:orangered;
  transition: 0.5s;
}

#lives{
  margin: auto;
  font-size: 30px;
}
@media screen and (max-width: 1000px){
  .flexBox{
    /*width: 400px;*/
    background-color: red;
  }

  button{
    width: 176px;
  }
  
}

</style>