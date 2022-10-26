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
        Score:{{ score }} 
      </div>
      <div id="timerInfo"> Points: <span ref="points"> {{timerCount}}</span>
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

const TOTAL_NUMBER = 0 //delete
const ALL_PLACES = ["77 Mac",
        "Bell",
        "Campus Center",
        "Carnegie",
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
        "Wallace"]
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
      places: ALL_PLACES,
      imageMap: new Map([
        ["30 Mac", [0]],
        ["77 Mac", [0]],
        //["Bell", []],
        ["Bigelow", [0]],
        ["Campus Center", [0, 1]],
        ["Carnegie", [0, 1]],
        //["Chapel", []],
        ["DeWitt Wallace Library", [0,1,2,3,4,5,6,7,8,9,10]],
        ["Doty", [0]],
        ["Dupre", [0,1,2,3]],
        ["George Draper Dayton", [0]],
        ["Humanities", [0,1,2]],
        ["Janet Wallace", [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]],
        ["Kagin", [0,1]],
        ["Kirk", [0,1]],
        ["Leonard Center", [0,1,2,3,4,5,6,7,8]],
        ["Link", [0]],
        ["Markim", [0,1]],
        ["Old Main", [0,1,2,3,4,5,]],
        ["Olin Rice", [0,1,2,3,4,5,6,7,8,9,10,11,12]],
        ["Turk", [0]],
        ["Wallace", [0,1]],
        ["Weyerhaeuser", [0,1,2,3,4]]
      ]),
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
    this.places = ALL_PLACES
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
      let imageMap = this.imageMap
      const keys = Array.from(imageMap.keys())
      const buildingName = keys.random()
      const randomImageIndex = imageMap.get(buildingName).random()
      let path = "src/assets/images/"
      let img = path + buildingName + "/" + randomImageIndex + ".jpg"
      return img
    },
    nextClick: function() {
      this.toggleDisplay()
      this.resetClasses()
      //console.log(this.places)
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
      return this.image.slice(18, this.image.length-6)
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
Array.prototype.random = function () { // returns radom item in an array
  return this[Math.floor((Math.random()*this.length))];
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
  margin-top: 50px;
  display: flex;
  margin-left: 50px;
  margin-right: 50px;
  position: center;
  justify-content: center;
  flex-shrink: unset;
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
  flex-shrink:calc(0)
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
  flex-shrink: calc(0);
  max-height: 500px;
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

#timerInfo{
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
  margin-left: 10px;
  margin-top: 10px;
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